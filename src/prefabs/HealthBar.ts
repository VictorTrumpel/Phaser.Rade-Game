import { GameObjects, Scene } from 'phaser'
import { HeroCasts } from '../characterConfigs/IHeroConfig'
import hitAreas from '../constants/hitAreas'
import barPositions from '../constants/barPositions'

type HealthBarOptions = {
  name: HeroCasts
  x: number
  y: number
  color: number
}

export class HealthBar {

  private x = 0
  private y = 0

  private style = {
    boxColor: 0xeb4034,
    barColor: 0xFFF8DC,
    width: 120,
    height: 15
  }

  private progressBox: GameObjects.Rectangle

  constructor(scene: Scene, options: HealthBarOptions) {
    this.x = options.x - this.style.width / 2
    this.y = options.y

    this.style.boxColor = options.color

    this.progressBox = scene.add.rectangle(
      this.x + this.style.width / 2,
      this.y,
      this.style.width,
      this.style.height,
      this.style.boxColor
    )
  }

  moveTo(x: number, y: number) {
    this.progressBox.x = x
    this.progressBox.y = y
  }

  change(k: number) {
    this.progressBox.width = this.style.width * (k < 0 ? 0 : k)
  }
}