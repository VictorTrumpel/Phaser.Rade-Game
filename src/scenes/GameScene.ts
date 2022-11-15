import { allCharacters } from './../characterConfigs/allCharacters'
import { soldierConfig } from './../characterConfigs/soldierConfig'
import { Scene } from 'phaser'
import { Hero } from '../prefabs/Hero'
import { monsterConfig } from '../characterConfigs/monsterConfig'
import { ChooseHeroScenePayload } from './ChooseHeroScene'
import gameSettings from '../gameSettings'

const teamPositions: { x: number, y: number }[] = [
  { x: 400, y: 510 },
  { x: 500, y: 610 },
]

const enemiesPositions: { x: number, y: number }[] = [
  { x: 600, y: 500 },
  { x: 700, y: 600 }
]

export class GameScene extends Scene {
  private heroes: Hero[]  = []
  private enemyHeroes: Hero[] = []
  private teamHeroes: Hero[] = []
  private activeHeroIndex = 0

  constructor() {
    super('GameScene')
  }

  initScene() {
    this.heroes = []
    this.enemyHeroes = []
    this.teamHeroes = []
    this.activeHeroIndex = 0
  }

  create(data: ChooseHeroScenePayload) {
    this.initScene()

    this.createBg()

    const checkedHeroesConfigs = data.checkedHeroes.splice(0, 2)

    const enemiesHerosConfigs = [
      allCharacters[randomInteger(0, allCharacters.length - 1)].caste,
      allCharacters[randomInteger(0, allCharacters.length - 1)].caste
    ]

    checkedHeroesConfigs.forEach((caste, idx) => {
      const heroConfig = allCharacters.find((hero) => hero.caste === caste)?.config
      if (!heroConfig) return
      const position = teamPositions[idx]
      const newHero = new Hero(this, {
        ...heroConfig,
        ...position,
        healthBarColor: 0x3d6e16,
        autoPlay: false
      })
      this.teamHeroes.push(newHero)
      this.heroes.push(newHero)
    })

    enemiesHerosConfigs.forEach((caste, idx) => {
      const heroConfig = allCharacters.find((hero) => hero.caste === caste)?.config
      if (!heroConfig) return
      const position = enemiesPositions[idx]
      const newHero = new Hero(this, {
        ...heroConfig,
        ...position,
        healthBarColor: 0xeb4034,
        autoPlay: true
      })
      newHero.flipX = true
      this.enemyHeroes.push(newHero)
      this.heroes.push(newHero)
    })

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
      const aliveTeamHeroes = this.teamHeroes.filter(hero => hero.isAlive())
      const attackedHero = aliveTeamHeroes[randomInteger(0, aliveTeamHeroes.length - 1)]
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

function randomInteger(min: number, max: number) {
  // получить случайное число от (min-0.5) до (max+0.5)
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}