import { HeroCasts } from './../characterConfigs/IHeroConfig'
import { Halo } from './Halo'
import { HealthBar } from './HealthBar'
import { GameObjects, Scene, Textures, Geom } from 'phaser'
import { HeroAnimationManager } from '../manage/HeroAnimationManager'
import { HitArea } from './HitArea'

export type SpriteConfig = {
  name: HeroCasts
  x: number
  y: number
  texture: string | Textures.Texture
  frame: string
  attackValue: number
  healthValue: number
  autoPlay?: boolean
  healthBarColor?: number
  invert?: boolean
}

export class Hero extends GameObjects.Sprite {
  public attackValue = 0
  public healthValue = 0
  public autoPlay = false
  private invert = false
  readonly name: HeroCasts
  
  private maxHealth = 0

  anims: HeroAnimationManager

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
      healthBarColor = 0xeb4034,
      invert = false
    } = props

    super(scene, x, y, texture, frame)

    this.name = name
    this.attackValue = attackValue
    this.healthValue = healthValue
    this.maxHealth = healthValue
    this.autoPlay = autoPlay
    this.invert = invert

    this.halo = new Halo(this.scene, {
      x: this.x,
      y: this.y + this.height / 2 - 15,
      color: healthBarColor
    })

    this.healthBar = new HealthBar(this.scene, { 
      x: this.x, 
      y: this.y - this.height * 3 / 2,
      color: healthBarColor
    })

    this.init()
  }

  init() {
    this.setInteractive()

    if (this.invert) 
      this.flipX = true

    this.input.hitArea = new HitArea(this.name, this.invert)

    this.input.cursor = 'pointer'

    this.scene.add.existing(this)    

    this.anims = new HeroAnimationManager(this)
    this.anims.playIdle()
  }

  async attack() {
    await this.playAttack()
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

  async playInjured() {
    await this.anims.playInjured()
  }

  async playAttack() {
    await this.anims.playAttack()
    this.anims.playIdle()
  }

  async playDie() {
    await this.anims.playDie()
  }

  isAlive() {
    return this.healthValue > 0
  }
}