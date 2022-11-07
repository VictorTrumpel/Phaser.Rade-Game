import { HealthBar } from './HealthBar';
import { GameObjects, Scene, Textures } from 'phaser'
import gameSettings from '../gameSettings'

type SpriteProps = {
  scene: Scene
  name: string
  x: number
  y: number
  texture: string | Textures.Texture
  frame: string
}

export class Sprite extends GameObjects.Sprite {
  private maxHealth = 200
  private health = 200

  healthBar: null | HealthBar = null

  constructor(props: SpriteProps) {
    const { scene, x, y, texture, frame, name } = props
    super(scene, x, y, texture, frame)

    this.name = name

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
    this.health -= damage

    const kProgressBar = this.health / this.maxHealth

    if (this.healthBar) this.healthBar.change(kProgressBar)

    if (this.health <= 0) this.kill()
  }

  kill() {
    this.setFrame('dead')
    this.disableInteractive()
  } 
}