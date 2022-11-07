import { Scene } from 'phaser'
import { Sprite } from '../prefabs/Sprite'
import { monsterConfig } from '../characterConfigs/monsterConfig'
import { magicianConfig } from '../characterConfigs/magicianConfig'
import gameSettings from '../gameSettings'

export class GameScene extends Scene {
  private heroes: Sprite[]  = []
  private activeHeroIndex = 0

  constructor() {
    super('GameScene')
  }

  create() {
    this.createBg()

    const magician = new Sprite(this, magicianConfig)
    const monster = new Sprite(this, monsterConfig)
    monster.flipX = true

    this.heroes.push(magician)
    this.heroes.push(monster)

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
    const hasNextHero = !!this.heroes[this.activeHeroIndex + 1]
    if (!hasNextHero) {
      this.activeHeroIndex = 0
      return
    }
    this.activeHeroIndex += 1
  }

  onAttackSprite(_: unknown, attackedSprite: Sprite) {
    const attackingSprite = this.heroes[this.activeHeroIndex]

    if (!attackingSprite.isAlive()) return
    if (attackedSprite === attackingSprite) return
    if (!attackingSprite) return
    
    const attackValue = attackingSprite.attackValue

    attackingSprite.attack()

    attackedSprite.hurt(attackValue)

    this.turnHero()
  }

  initEvents() {
    this.input.on('gameobjectdown', this.onAttackSprite, this)
  }
}