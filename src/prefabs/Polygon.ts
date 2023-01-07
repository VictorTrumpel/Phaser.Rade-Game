import { GameObjects, Scene } from 'phaser'
import { IInteractiveObject } from '../model/IInteractiveObject'
import { POLYGON_WIDTH, POLYGON_HEIGHT } from '../constants/polygon'

export class Polygon extends GameObjects.Ellipse implements IInteractiveObject {

  depthForHero = 1

  onClick = () => null

  constructor(scene: Scene, x: number, y: number, depth: number) {
    super(scene, x, y, POLYGON_WIDTH, POLYGON_HEIGHT)

    this.setSmoothness(4)

    this.setStrokeStyle(2, 0x1a65ac)

    this.setInteractive()

    this.depthForHero = depth

    this.scene.add.existing(this)
  }
}
