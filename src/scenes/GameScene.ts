import { allCharacters } from './../characterConfigs/allCharacters'
import { soldierConfig } from './../characterConfigs/soldierConfig'
import { Scene } from 'phaser'
import { Hero } from '../prefabs/Hero'
import { monsterConfig } from '../characterConfigs/monsterConfig'
import { ChooseHeroScenePayload } from './ChooseHeroScene'
import gameSettings from '../gameSettings'

const teamPositions: { x: number, y: number }[] = [
  { x: 400, y: 510 },
  { x: 500, y: 610 }
]

export class GameScene extends Scene {
  private heroes: Hero[]  = []
  private enemyHeroes: Hero[] = []
  private teamHeroes: Hero[] = []
  private activeHeroIndex = 0

  constructor() {
    super('GameScene')
  }

  create(data: ChooseHeroScenePayload) {
    const checkedHeroes = data.checkedHeroes.splice(0, 2)

    this.createBg()

    const monster = new Hero(this, monsterConfig)
    monster.flipX = true

    const soldier = new Hero(this, soldierConfig)
    soldier.flipX = true

    checkedHeroes.forEach((caste, idx) => {
      const heroPayload = allCharacters.find((hero) => hero.caste === caste)
      if (!heroPayload) return
      const { config } = heroPayload
      const position = teamPositions[idx]
      const newHero = new Hero(this, {
        ...config,
        ...position,
        healthBarColor: 0x3d6e16,
        autoPlay: false
      })
      this.teamHeroes.push(newHero)
      this.heroes.push(newHero)
    })

    // enemies
    this.enemyHeroes.push(monster)
    this.enemyHeroes.push(soldier)
    this.heroes.push(monster)
    this.heroes.push(soldier)

    this.heroes[0].halo.show()
    
    this.initEvents()
  }

  isGameOver() {
    const allTeamDie = this.teamHeroes.every(hero => !hero.isAlive())
    const allEnemyDie = this.enemyHeroes.every(hero => !hero.isAlive())

    return allTeamDie || allEnemyDie
  }

  createBg() {
    this.add.tileSprite(
      0, 
      0, 
      gameSettings.width, 
      gameSettings.height,
      'bg'
    ).setOrigin(0)
  }

  getFirstAlifeHero(): Hero | undefined {
    return this.heroes.find(hero => hero.isAlive())
  }

  getFirstAlifeHeroFromTeam(): Hero | undefined {
    return this.teamHeroes.find(hero => hero.isAlive())
  }

  turnHero() {
    this.heroes[this.activeHeroIndex].halo.hide()

    this.activeHeroIndex < this.heroes.length - 1
      ? this.activeHeroIndex += 1
      : this.activeHeroIndex = 0

    const nextHero = this.heroes[this.activeHeroIndex]
    
    if (!nextHero?.isAlive()) {
      this.turnHero()
      return
    }
 
    if (!nextHero.autoPlay) {
      nextHero.halo.show()
      return
    }

    setTimeout(() => {
      const attackedHero = this.getFirstAlifeHeroFromTeam()
      attackedHero && this.attackSprite(attackedHero)
    }, 1000)
  }

  async attackSprite(attackedSprite: Hero) {
    const attackingSprite = this.heroes[this.activeHeroIndex]

    if (
      !attackingSprite?.isAlive() ||
      attackedSprite === attackingSprite
    ) {
      this.turnHero()
      return
    }
    
    const attackValue = attackingSprite.attackValue

    attackingSprite.attack()

    await attackedSprite.hurt(attackValue)

    if (this.isGameOver()) {
      this.scene.start('FinishFightScene')
      return
    }

    this.turnHero()
  }

  onClickSprite(_: unknown, attackedSprite: Hero) {
    const isCurrentHeroAutoPlay = this.heroes[this.activeHeroIndex].autoPlay
    const isTeamMate = this.teamHeroes.find(hero => hero === attackedSprite)

    if (isTeamMate) return
    if (!attackedSprite.isAlive()) return
    if (isCurrentHeroAutoPlay) return
    this.attackSprite(attackedSprite)
  }

  initEvents() {
    this.input.on('gameobjectdown', this.onClickSprite, this)
  }
}