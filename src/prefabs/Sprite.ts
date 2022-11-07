import { HealthBar } from './HealthBar';
import { GameObjects, Scene, Textures } from 'phaser'

export type SpriteConfig = {
  name: string
  x: number
  y: number
  texture: string | Textures.Texture
  frame: string
  attackValue: number
  healthValue: number
}

export class Sprite extends GameObjects.Sprite {
  public attackValue = 0
  public healthValue = 0
  private maxHealth = 0

  healthBar: null | HealthBar = null

  constructor(scene: Scene, props: SpriteConfig) {
    const { x, y, texture, frame, name, attackValue, healthValue } = props
    super(scene, x, y, texture, frame)

    this.name = name
    this.attackValue = attackValue
    this.healthValue = healthValue
    this.maxHealth = healthValue

    this.init()
  }

  init() {
    this.setInteractive()
    this.scene.add.existing(this)

    this.healthBar = new HealthBar(this.scene, { 
      x: this.x, 
      y: this.y - this.height / 2
    })
  }

  attack() {
    this.setFrame('attack')

    setTimeout(() => {
      this.setFrame('healthy')
    }, 500)
  }

  hurt(damage: number) {
    this.healthValue -= damage

    this.setFrame('injured')

    setTimeout(() => {
      if (this.healthValue <= 0) return
      this.setFrame('healthy')
    }, 500)

    const kProgressBar = this.healthValue / this.maxHealth

    if (this.healthBar) this.healthBar.change(kProgressBar)

    if (this.healthValue <= 0) this.kill()
  }

  kill() {
    this.setFrame('dead')
    this.disableInteractive()
  } 

  isAlive() {
    if (this.healthValue > 0) return true
    return false
  }
}