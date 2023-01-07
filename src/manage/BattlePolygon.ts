import { POLYGON_WIDTH, POLYGON_HEIGHT } from './../constants/polygon'
import { Scene } from 'phaser'
import { HeroManager } from './HeroManager'
import { Polygon } from '../prefabs/Polygon'

export type ButtleMap = (0 | 1 | null)[][]
export type PolyCords = ({ x: number, y: number } | null)[][]
export type PolyMatrix = (Polygon | null)[][]

export class ButtlePolygon {
  readonly x: number
  readonly y: number

  private _heroManager: HeroManager
  private _scene: Scene
  private _map: ButtleMap
  private _polyCords: PolyCords = []
  private _polyMatrix: PolyMatrix = []

  private _onPolygonClick = (polygon: Polygon) => {
    this._heroManager.moveHero(polygon.x, polygon.y, polygon.depthForHero)
  }
  
  constructor(scene: Scene & { heroManager: HeroManager }, x: number, y: number, map: ButtleMap) {
    this._scene = scene
    this._map = map

    this._heroManager = scene.heroManager

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
    let depth = 1 

    this._map.forEach((polygonRow, rowIdx) => {
      this._polyCords[rowIdx] = []
      this._polyMatrix[rowIdx] = []

      polygonRow.forEach((polygonCell, polyIdx) => {
        this._polyCords[rowIdx][polyIdx] = null
        this._polyMatrix[rowIdx][polyIdx] = null

        if (polygonCell !== null) {
          console.log('depth :>> ', polyIdx + 1);
          const polygon = new Polygon(
            this._scene, 
            polyX, 
            polyY, 
            polyIdx + 1
          )

          polygon.onClick = this._onPolygonClick.bind(this, polygon)

          this._polyMatrix[rowIdx][polyIdx] = polygon
          this._polyCords[rowIdx][polyIdx] = { x: polyX, y: polyY }
        }

        polyX += POLYGON_WIDTH / 2
        polyY += POLYGON_HEIGHT / 2        
      })

      polyX = this.x + POLYGON_WIDTH * (rowIdx + 1)
      polyY = this.y
    })
  }

  getPolygon(rowIdx: number, cellIdx: number): Polygon | null {
    return this._polyMatrix[rowIdx][cellIdx]
  }

  getPolyCord(rowIdx: number, cellIdx: number): { x: number, y: number } | null {
    return this._polyCords[rowIdx][cellIdx]
  }
}