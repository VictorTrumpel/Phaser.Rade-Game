import { HeroCasts } from './../characterConfigs/IHeroConfig'
import { Halo } from './Halo'
import { HealthBar } from './HealthBar'
import { GameObjects, Scene, Textures } from 'phaser'
import { HeroAnimationPlayer } from '../manage/HeroAnimationPlayer'
import { HitArea } from './HitArea'
import { IInteractiveObject } from '../model/IInteractiveObject'
import hitAreas from '../constants/hitAreas'

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
  scale?: number
}

export class Hero extends GameObjects.Sprite implements IInteractiveObject {
  public attackValue = 0
  public healthValue = 0
  public autoPlay = false

  private invert = false
  private healthBarColor = 0xeb4034
  private maxHealth = 0

  readonly name: HeroCasts

  anims: HeroAnimationPlayer

  healthBar: HealthBar
  halo: Halo

  onClick = () => null

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
      invert = false,
      scale = 1
    } = props

    super(scene, x, y, texture, frame)

    this.name = name
    this.attackValue = attackValue
    this.healthValue = healthValue
    this.maxHealth = healthValue
    this.autoPlay = autoPlay
    this.invert = invert
    this.healthBarColor = healthBarColor
    this.scale = scale

    this.init()
  }

  init() {
    this.setInteractive()

    const xInvertOrigin = (this.width - hitAreas[this.name].x - hitAreas[this.name].width / 2) / this.width
    const xOrigin = (hitAreas[this.name].x + hitAreas[this.name].width / 2) / this.width
    const yOrigin = 1

    this.setOrigin(
      this.invert ? xInvertOrigin : xOrigin, 
      yOrigin
    )

    if (this.invert) 
      this.flipX = true

    this.halo = new Halo(this.scene, {
      x: this.x,
      y: this.y,
      color: this.healthBarColor
    })

    this.healthBar = new HealthBar(this.scene, { 
      x: this.x, 
      y: this.heroTopY,
      color: this.healthBarColor
    })

    this.input.hitArea = new HitArea(this.name, this.invert)

    this.input.cursor = 'pointer'

    this.scene.add.existing(this)    

    this.anims = new HeroAnimationPlayer(this)
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
    this.playDie()
    this.disableInteractive()
  } 

  move(x: number, y: number, depth: number = 1) {
    this.x = x
    this.y = y
    this.depth = depth
    this.halo.moveTo(x, y)
    this.healthBar.moveTo(x, this.heroTopY)
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

  get heroTopY() {
    return this.y - this.height * this.scale + hitAreas[this.name].y * this.scale
  }
}