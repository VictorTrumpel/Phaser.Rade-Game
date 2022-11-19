import { Hero } from './prefabs/Hero';
import { IHeroConfig } from './characterConfigs/IHeroConfig'
import { Scene, Utils } from 'phaser'
import { allCharacters } from './characterConfigs/allCharacters'

type CreateHeroCreds = {
  caste: IHeroConfig['name']
  positionX: number
  positionY: number
  isAutoplay: boolean
}

export class HeroManager {
  private heroes: Hero[]  = []
  private enemyHeroes: Hero[] = []
  private teamHeroes: Hero[] = []
  private activeHeroIndex = 0

  private isProcessing = false
  
  constructor(
    public scene: Scene
  ) {
    this.scene = scene
  }

  createHeroes(creds: CreateHeroCreds[]) {
    const heroesCreds = creds.map(c => ({ ...c }))
    heroesCreds.sort(({ positionX: x1 }, { positionX: x2}) => x1 - x2)
    heroesCreds.sort(({ positionY: y1 }, { positionY: y2 }) => y1 - y2)

    heroesCreds.forEach((cred) => {
      const { caste, positionX, positionY, isAutoplay } = cred
      const heroConfig = allCharacters.find((hero) => hero.caste === caste)?.config
      if (!heroConfig) return
      const newHero = new Hero(this.scene, {
        ...heroConfig,
        x: positionX,
        y: positionY,
        frame: 'healthy',
        autoPlay: isAutoplay,
        healthBarColor: isAutoplay ? 0xeb4034 : 0x3d6e16
      })
      isAutoplay && (newHero.flipX = true)
      isAutoplay 
        ? this.enemyHeroes.push(newHero)
        : this.teamHeroes.push(newHero)
      this.heroes.push(newHero)
    })

    const firstTeamHeroIdx = this.heroes.findIndex(hero => !hero.autoPlay)
    this.activeHeroIndex = firstTeamHeroIdx
    this.heroes[this.activeHeroIndex].halo.show()
  }

  async startRound(targetHero: Hero) {
    const isCurrentHeroAutoPlay = this.heroes[this.activeHeroIndex].autoPlay
    const isTeamMate = !!this.teamHeroes.find(hero => hero === targetHero)

    if (
      isTeamMate || 
      !targetHero.isAlive() || 
      isCurrentHeroAutoPlay ||
      this.isProcessing
    ) return

    this.isProcessing = true

    await this.attackHero(targetHero)
    await this.turnHero()

    this.isProcessing = false
  }

  private checkWhoWin() {
    const allTeamDie = this.teamHeroes.every(hero => !hero.isAlive())
    const allEnemyDie = this.enemyHeroes.every(hero => !hero.isAlive())

    if (allTeamDie || allEnemyDie) {
      this.scene.events.emit('fightOver')
    }
  }

  private async attackHero(targetHero: Hero) {
    const activeHero = this.heroes[this.activeHeroIndex]
    const attackValue = activeHero.attackValue
    await Promise.all([activeHero.attack(), targetHero.hurt(attackValue)])
    this.checkWhoWin()
  }

  private async turnHero() {
    const currentHero = this.heroes[this.activeHeroIndex]

    currentHero.halo.hide()

    this.activeHeroIndex < this.heroes.length - 1
      ? this.activeHeroIndex += 1
      : this.activeHeroIndex = 0

    const activeHero = this.heroes[this.activeHeroIndex]
    
    if (!activeHero?.isAlive()) {
      this.turnHero()
      return
    }
 
    if (!activeHero.autoPlay) {
      activeHero.halo.show()
      return
    }

    const liveTeamPlayers = this.teamHeroes.filter(hero => hero.isAlive())
    const targetHero = getArrayRandom<Hero>(liveTeamPlayers)

    if (!targetHero) {
      throw new Error('tagetHero not defined')
    }

    await this.artificalPause(500)

    await this.attackHero(targetHero)

    this.turnHero()
  }

  private artificalPause(ms: number) {
    return new Promise((res) => {
      setTimeout(() => {
        res(null)
      }, ms)
    })
  }  
}

const getArrayRandom = <T extends unknown>(array: readonly T[], startIndex?: number, endIndex?: number) =>
  Utils.Array.GetRandom(array as any[], startIndex, endIndex) as T