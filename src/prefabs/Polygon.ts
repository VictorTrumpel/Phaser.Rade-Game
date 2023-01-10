import { HitArea } from './HitArea';
import { GameObjects, Scene, Geom } from 'phaser'
import { IInteractiveObject } from '../model/IInteractiveObject'
import { POLYGON_WIDTH, POLYGON_HEIGHT } from '../constants/polygon'

export class Polygon extends GameObjects.Ellipse implements IInteractiveObject {

  depthForHero = 1

  onClick = () => null

  constructor(scene: Scene, x: number, y: number, depth: number) {
    super(scene, x, y, POLYGON_WIDTH, POLYGON_HEIGHT)

    this.setSmoothness(4)

    this.setStrokeStyle(2, 0x1a65ac)

    const hitArea = new Phaser.Geom.Polygon([
      0, POLYGON_HEIGHT / 2,
      POLYGON_WIDTH / 2, 0,
      POLYGON_WIDTH, POLYGON_HEIGHT / 2,
      POLYGON_WIDTH / 2, POLYGON_HEIGHT
    ]);

    this.setInteractive(hitArea, Geom.Polygon.Contains)

    this.depthForHero = depth

    this.scene.add.existing(this)
  }
}
