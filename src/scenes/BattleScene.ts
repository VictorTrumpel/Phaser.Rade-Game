import { Scene, GameObjects, Geom } from 'phaser'
import { Hero } from '../prefabs/Hero'
import { roninConfig } from '../characterConfigs/roninConfig'
import { svenConfig } from '../characterConfigs/svenConfig'
import { knightConfig } from '../characterConfigs/knightConfig'
import { Polygon } from '../prefabs/Polygon'
import { rickConfig } from '../characterConfigs/rickConfig'
import { POLYGON_HEIGHT, POLYGON_WIDTH } from '../constants/polygon'
import gameSettings from '../gameSettings'
import * as Phaser from 'phaser'

const startSceneX = 340
const startSceneY = 550

const ButtlePolygon = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, null],
  [0, 0, null, null, null],
  [0, 0, 0, 0, null],
]

export class BattleScene extends Scene {

  constructor() {
    super('BattleScene')
  }

  create() {
    this.createBg()

    let x = startSceneX
    let y = startSceneY  

    ButtlePolygon.forEach((polygonRow, rowIdx) => {
      polygonRow.forEach(polygonCell => {
        if (polygonCell !== null) {
          new Polygon(this, x, y)
        }
        x += POLYGON_WIDTH / 2
        y += POLYGON_HEIGHT / 2
      })
      x = startSceneX + POLYGON_WIDTH * (rowIdx + 1)
      y = startSceneY
    })
    
    const hero = new Hero(this, {
      ...rickConfig,
      x: 340,
      y: 550,
      frame: 'idle_1.png',
      scale: 3
    })

    

  }

  createBg() {
    this.add.tileSprite(
      0, 
      0, 
      gameSettings.width, 
      gameSettings.height,
      'bg'
    ).setOrigin(0)
  }
}