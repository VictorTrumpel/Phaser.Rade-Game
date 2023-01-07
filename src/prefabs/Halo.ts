import { Scene, GameObjects, Geom } from 'phaser';

type HaloOptions = {
  x: number
  y: number
  color: number
}

export class Halo {

  private _x = 0
  private _y = 0
  private _color = 0xeb4034

  private _ellipse: GameObjects.Ellipse

  constructor(scene: Scene, options: HaloOptions) {
    this._x = options.x
    this._y = options.y
    this._color = options.color

    this._ellipse = scene.add.ellipse(this._x, this._y, 100, 30, this._color)

    this.hide()
  }

  hide() {
    this._ellipse.visible = false
  }

  show() {
    this._ellipse.visible = true

  }

  moveTo(x: number, y: number) {
    this._ellipse.setPosition(x, y)
  }
}