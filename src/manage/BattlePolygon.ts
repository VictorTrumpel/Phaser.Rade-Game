import { POLYGON_WIDTH, POLYGON_HEIGHT } from './../constants/polygon'
import { Scene } from 'phaser'
import { Polygon } from '../prefabs/Polygon'

export type ButtleMap = (0 | 1 | null)[][]
export type PolyCords = ({ x: number, y: number } | null)[][]

export class ButtlePolygon {
  readonly x: number
  readonly y: number

  private _scene: Scene
  private _map: ButtleMap
  private _polyCords: PolyCords = []
  
  constructor(scene: Scene, x: number, y: number, map: ButtleMap) {
    this._scene = scene
    this._map = map

    this.x = x
    this.y = y

    this.init()
  }

  init() {
    this.createButtleGround()
  }

  createButtleGround() {
    let polyX = this.x
    let polyY = this.y  

    this._map.forEach((polygonRow, rowIdx) => {
      this._polyCords[rowIdx] = []

      polygonRow.forEach((polygonCell, polyIdx) => {
        this._polyCords[rowIdx][polyIdx] = null

        if (polygonCell !== null) {
          new Polygon(this._scene, polyX, polyY)
          this._polyCords[rowIdx][polyIdx] = { x: polyX, y: polyY }
        }

        polyX += POLYGON_WIDTH / 2
        polyY += POLYGON_HEIGHT / 2        
      })

      polyX = this.x + POLYGON_WIDTH * (rowIdx + 1)
      polyY = this.y
    })
  }

  getPolyCord(rowIdx: number, cellIdx: number): { x: number, y: number } | null {
    return this._polyCords[rowIdx][cellIdx]
  }
}