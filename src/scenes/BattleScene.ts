import { Scene, GameObjects, Geom } from 'phaser'
import { Hero } from '../prefabs/Hero'
import { roninConfig } from '../characterConfigs/roninConfig'
import { svenConfig } from '../characterConfigs/svenConfig'
import { knightConfig } from '../characterConfigs/knightConfig'
import { Polygon } from '../prefabs/Polygon'
import { rickConfig } from '../characterConfigs/rickConfig'
import { ButtlePolygon } from '../manage/BattlePolygon'
import safariMap from '../maps/safariMap'
import gameSettings from '../gameSettings'
import * as Phaser from 'phaser'

export class BattleScene extends Scene {

  buttlePolygon: ButtlePolygon

  constructor() {
    super('BattleScene')
  }

  create() {
    this.createBg()

    this.buttlePolygon = new ButtlePolygon(this, 340, 550, safariMap)

    const polyCord = this.buttlePolygon.getPolyCord(0, 2) || { x: 0, y: 0 }
    
    const hero = new Hero(this, {
      ...rickConfig,
      x: polyCord.x,
      y: polyCord.y,
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