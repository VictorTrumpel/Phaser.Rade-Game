import { POLYGON_WIDTH, POLYGON_HEIGHT } from '../constants/polygon'
import { Scene } from 'phaser'
import { HeroTeams } from './HeroTeams'
import { HeroFightToggler } from './HeroFightToggler'
import { Polygon } from '../prefabs/Polygon'

export type ButtleMap = (0 | 1 | null)[][]
export type PolyCords = ({ x: number, y: number } | null)[][]
export type PolyMatrix = (Polygon | null)[][]
export type HeroScene = Scene & {
  heroTeams: HeroTeams
  heroFightToggler: HeroFightToggler
}

export class HeroButtleGround {
  readonly x: number
  readonly y: number

  private _scene: HeroScene
  private _map: ButtleMap
  private _polyCords: PolyCords = []
  private _polyMatrix: PolyMatrix = []

  private _onPolygonClick = (polygon: Polygon) => {
    if (!polygon.isLight)
      return
    const allHeroes = this._scene.heroTeams.heroes
    const activeHeroIdx = this._scene.heroFightToggler.activeHeroIndex
    const heroNeedToMove = allHeroes[activeHeroIdx]
    heroNeedToMove.move(polygon.x, polygon.y, polygon.depthForHero)
  }
  
  constructor(scene: HeroScene, x: number, y: number, map: ButtleMap) {
    this._scene = scene
    this._map = map

    this.x = x
    this.y = y

    this.init()
  }

  init() {
    this.createButtleGround()
  }

  highlightPolygons(polyX: number, polyY: number) {
    let row = 0
    let col = 0
    // обесцвечиваем все полигоны c прошлого хода и находим в матрице полигон, по координатам
    this._polyMatrix.forEach((polyRow, rowIdx) => {
      polyRow.forEach((poly, colIdx) => {
        poly?.lightOff()
        if (poly?.x === polyX && poly?.y === polyY) {
          row = rowIdx
          col = colIdx
        }
      })
    })

    // подсвечиваем квадрат вокруг найденного полигона
    this._polyMatrix[row]?.[col]?.lightOn()

    this._polyMatrix[row - 1]?.[col]?.lightOn()
    this._polyMatrix[row - 1]?.[col + 1]?.lightOn()
    this._polyMatrix[row - 1]?.[col + 2]?.lightOn()

    this._polyMatrix[row + 1]?.[col]?.lightOn()
    this._polyMatrix[row + 1]?.[col - 1]?.lightOn()
    this._polyMatrix[row + 1]?.[col - 2]?.lightOn()

    this._polyMatrix[row]?.[col - 1]?.lightOn()
    this._polyMatrix[row]?.[col + 1]?.lightOn()    
  }

  createButtleGround() {
    let polyX = this.x
    let polyY = this.y 

    this._map.forEach((polygonRow, rowIdx) => {
      this._polyCords[rowIdx] = []
      this._polyMatrix[rowIdx] = []

      polygonRow.forEach((polygonCell, polyIdx) => {
        this._polyCords[rowIdx][polyIdx] = null
        this._polyMatrix[rowIdx][polyIdx] = null

        if (polygonCell !== null) {
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