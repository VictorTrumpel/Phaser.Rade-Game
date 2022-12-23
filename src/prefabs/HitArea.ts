import { Geom } from 'phaser'
import { HeroCasts } from '../characterConfigs/IHeroConfig'
import knightHitArea from '../assets/knight/hit_area'
import roninHitArea from '../assets/ronin/hit_area'
import svenHitArea from '../assets/sven/hit_area'
import rickHitArea from '../assets/rick/hit_area'

const hitAreas: Record<HeroCasts, { x: number, invertX: number, y: number, width: number, height: number }> = {
  knight: knightHitArea,
  ronin: roninHitArea,
  magician: roninHitArea,
  rogue: roninHitArea,
  soldier: roninHitArea,
  monster: roninHitArea,
  sven: svenHitArea,
  rick: rickHitArea
}

export class HitArea extends Geom.Rectangle {
  
  constructor(hero: HeroCasts, invert?: boolean) {
    const { x, y, width, height, invertX } = hitAreas[hero]

    const xPath = invert ? invertX : x

    super(xPath, y, width, height)
  }
}