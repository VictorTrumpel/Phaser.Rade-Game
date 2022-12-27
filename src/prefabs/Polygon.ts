import { GameObjects, Scene } from 'phaser'
import { POLYGON_WIDTH, POLYGON_HEIGHT } from '../constants/polygon'


export class Polygon extends GameObjects.Ellipse {

  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, POLYGON_WIDTH, POLYGON_HEIGHT)

    this.setSmoothness(4)

    this.setStrokeStyle(2, 0x1a65ac)

    this.scene.add.existing(this)
  }
}
