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

  private progressBox: GameObjects.Graphics

  constructor(scene: Scene, options: HealthBarOptions) {
    this.progressBox = scene.add.graphics()
  
    this.x = options.x - this.style.width / 2
    this.y = options.y - 25

    this.style.boxColor = options.color

    this.init()
  }

  init() {
    this.progressBox
      .fillStyle(this.style.boxColor)
      .fillRect(
        this.x, 
        this.y, 
        this.style.width, 
        this.style.height
      )
  }

  change(k: number) {
    this.progressBox.clear()
    this.progressBox.fillStyle(this.style.boxColor)
    this.progressBox.fillRect(
      this.x, 
      this.y, 
      this.style.width * (k < 0 ? 0 : k), 
      this.style.height
    )
  }
}