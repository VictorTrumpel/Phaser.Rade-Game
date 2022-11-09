import { Halo } from './Halo'
import { HealthBar } from './HealthBar'
import { GameObjects, Scene, Textures } from 'phaser'

export type SpriteConfig = {
  name: string
  x: number
  y: number
  texture: string | Textures.Texture
  frame: string
  attackValue: number
  healthValue: number
  autoPlay?: boolean
  healthBarColor?: number
}

export class Hero extends GameObjects.Sprite {
  public attackValue = 0
  public healthValue = 0
  public autoPlay = false
  private maxHealth = 0

  healthBar: HealthBar
  halo: Halo

  constructor(scene: Scene, props: SpriteConfig) {
    const { 
      x, 
      y, 
      texture, 
      frame, 
      name, 
      attackValue, 
      healthValue, 
      autoPlay = false,
      healthBarColor = 0xeb4034
    } = props

    super(scene, x, y, texture, frame)

    this.name = name
    this.attackValue = attackValue
    this.healthValue = healthValue
    this.maxHealth = healthValue
    this.autoPlay = autoPlay

    this.halo = new Halo(this.scene, {
      x: this.x,
      y: this.y + this.height / 2 - 15,
      color: healthBarColor
    })

    this.healthBar = new HealthBar(this.scene, { 
      x: this.x, 
      y: this.y - this.height / 2,
      color: healthBarColor
    })
  
    this.init()
  }

  init() {
    this.setInteractive()
    this.scene.add.existing(this)    
  }

  async attack() {
    if (!this.isAlive()) return

    this.setFrame('attack')

    setTimeout(() => {
      this.setFrame('healthy')
    }, 500)
  }

  async playInjured() {
    return new Promise((res) => {
      this.setFrame('injured')

      setTimeout(() => {
        if (!this.isAlive()) {
          this.setFrame('dead')
          return res(null)
        }
        this.setFrame('healthy')
        res(null)
      }, 500)
    })
  }

  async hurt(damage: number) {
    if (!this.isAlive()) return
    
    this.healthValue -= damage

    const kProgressBar = this.healthValue / this.maxHealth

    if (this.healthBar) this.healthBar.change(kProgressBar)

    await this.playInjured()  
    
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