import { soldierConfig } from './../characterConfigs/soldierConfig';
import { Scene } from 'phaser'
import { Hero } from '../prefabs/Hero'
import { monsterConfig } from '../characterConfigs/monsterConfig'
import { magicianConfig } from '../characterConfigs/magicianConfig'
import gameSettings from '../gameSettings'

export class GameScene extends Scene {
  private heroes: Hero[]  = []
  private activeHeroIndex = 0

  constructor() {
    super('GameScene')
  }

  create() {
    this.createBg()

    const magician = new Hero(this, magicianConfig)
    const monster = new Hero(this, monsterConfig)
    monster.flipX = true

    const soldier = new Hero(this, soldierConfig)
    soldier.flipX = true

    this.heroes.push(magician)
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

  turnHero() {
    const alifeHeroes = this.heroes.filter(hero => hero.isAlive())

    const nextHero = this.activeHeroIndex < alifeHeroes.length - 1
      ? this.heroes.find((hero, heroIndex) => {
        if (heroIndex <= this.activeHeroIndex || !hero.isAlive()) return false
        return true
      })
      : this.heroes[0]
    
    if (!nextHero) return

    this.activeHeroIndex = this.heroes.findIndex((hero) => hero === nextHero)
 
    if (!nextHero.autoPlay) return

    setTimeout(() => {
      // пока задаю индекс 0, потом автоматический игрок будет выбирать цель "по-умному"
      this.attackSprite(this.heroes[0])
    }, 1000)
  }

  async attackSprite(attackedSprite: Hero) {
    const attackingSprite = this.heroes[this.activeHeroIndex]

    if (!attackingSprite.isAlive()) return
    if (attackedSprite === attackingSprite) return
    if (!attackingSprite) return
    
    const attackValue = attackingSprite.attackValue

    attackingSprite.attack()

    attackedSprite.hurt(attackValue)

    this.turnHero()
  }

  onClickSprite(_: unknown, attackedSprite: Hero) {
    const isCurrentHeroAutoPlay = this.heroes[this.activeHeroIndex].autoPlay

    if (!attackedSprite.isAlive()) return
    if (isCurrentHeroAutoPlay) return
    this.attackSprite(attackedSprite)
  }

  initEvents() {
    this.input.on('gameobjectdown', this.onClickSprite, this)
  }
}