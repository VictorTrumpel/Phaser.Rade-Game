import { Scene, GameObjects, Geom } from 'phaser';

type HaloOptions = {
  x: number
  y: number
  color: number
}

export class Halo {

  private x = 0
  private y = 0
  private color = 0xeb4034

  private halo: GameObjects.Graphics

  constructor(scene: Scene, options: HaloOptions) {
    this.halo = scene.add.graphics()
  
    this.x = options.x
    this.y = options.y
    this.color = options.color
  }

  hide() {
    this.halo.clear()
  }

  show() {
    if (!this.halo) return

    const ellipse = new Geom.Ellipse(
      this.x, 
      this.y, 
      130, 
      30
    )

    this.halo.lineStyle(4, this.color, 1)

    this.halo.strokeEllipseShape(ellipse, 15) 
  }
}