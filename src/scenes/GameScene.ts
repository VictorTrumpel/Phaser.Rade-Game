import { soldierConfig } from './../characterConfigs/soldierConfig';
import { Scene } from 'phaser'
import { Hero } from '../prefabs/Hero'
import { monsterConfig } from '../characterConfigs/monsterConfig'
import { magicianConfig } from '../characterConfigs/magicianConfig'
import { rogueConfig } from '../characterConfigs/rogueConfig'
import gameSettings from '../gameSettings'

export class GameScene extends Scene {
  private heroes: Hero[]  = []
  private enemyHeroes: Hero[] = []
  private teamHeroes: Hero[] = []
  private activeHeroIndex = 0

  constructor() {
    super('GameScene')
  }

  create() {
    this.createBg()

    const magician = new Hero(this, magicianConfig)
    
    this.teamHeroes.push(magician)
    
    const monster = new Hero(this, monsterConfig)
    monster.flipX = true

    const soldier = new Hero(this, soldierConfig)
    soldier.flipX = true

    const rogue = new Hero(this, rogueConfig)

    this.teamHeroes.push(rogue)

    this.enemyHeroes.push(monster)
    this.enemyHeroes.push(soldier)

    this.heroes.push(magician)
    this.heroes.push(rogue)
    this.heroes.push(monster)
    this.heroes.push(soldier)
    
    this.initEvents()
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
    this.activeHeroIndex < this.heroes.length - 1
      ? this.activeHeroIndex += 1
      : this.activeHeroIndex = 0

    const nextHero = this.heroes[this.activeHeroIndex]
    
    if (!nextHero?.isAlive()) {
      this.turnHero()
      return
    }
 
    if (!nextHero.autoPlay) return

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

    attackedSprite.hurt(attackValue)

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