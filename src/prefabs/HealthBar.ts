import { GameObjects, Scene, Types } from 'phaser'

type HealthBarOptions = {
  x: number
  y: number
}

export class HealthBar {

  private x = 0
  private y = 0

  private style = {
    boxColor: 0xeb4034,
    barColor: 0xFFF8DC,
    width: 150,
    height: 15
  }

  private progressBox: null | GameObjects.Graphics = null

  constructor(scene: Scene, options: HealthBarOptions) {
    this.progressBox = scene.add.graphics()
  
    this.x = options.x - this.style.width / 2
    this.y = options.y

    this.init()
  }

  init() {
    if (!this.progressBox) return

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
    if (!this.progressBox) return
    this.progressBox.clear()
    .fillRect(
      this.x, 
      this.y, 
      this.style.width * k, 
      this.style.height
    )
  }
}