import { Scene } from 'phaser'
import { Sprite } from '../prefabs/Sprite'
import gameSettings from '../gameSettings'

export class GameScene extends Scene {
  private magician: null | Sprite = null

  constructor() {
    super('GameScene')
  }

  create() {
    this.createBg()
    this.magician = new Sprite({
      scene: this,
      name: 'magician',
      x: 300,
      y: 550,
      texture: 'magician',
      frame: 'healthy'
    })

    new Sprite({
      scene: this,
      name: 'monster',
      x: 550,
      y: 540,
      texture: 'monster',
      frame: 'healthy'
    }).flipX = true

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

  onClicked(_: unknown, attackedSprite: Sprite) {
    if (attackedSprite.name === 'magician') return
    if (!this.magician) return

    this.magician.attack()

    attackedSprite.hurt(20)
  }

  initEvents() {
    this.input.on('gameobjectdown', this.onClicked, this)
  }
}