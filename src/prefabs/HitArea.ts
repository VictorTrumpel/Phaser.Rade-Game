import { Geom } from 'phaser'
import { HeroCasts } from '../characterConfigs/IHeroConfig'
import knightHitArea from '../assets/knight/hit_area'
import roninHitArea from '../assets/ronin/hit_area'
import svenHitArea from '../assets/sven/hit_area'
import rickHitArea from '../assets/rick/hit_area'

const hitAreas: Record<HeroCasts, { x: number, y: number, width: number, height: number }> = {
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
  
  constructor(hero: HeroCasts) {
    const { x, y, width, height } = hitAreas[hero]
    super(x, y, width, height)
  }
}