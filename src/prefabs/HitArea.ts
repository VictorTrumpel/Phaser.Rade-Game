import { Geom } from 'phaser'
import { HeroCasts } from '../characterConfigs/IHeroConfig'
import hitAreas from '../constants/hitAreas'

export class HitArea extends Geom.Rectangle {
  
  constructor(hero: HeroCasts, invert?: boolean) {
    const { x, y, width, height, invertX } = hitAreas[hero]

    const xPath = invert ? invertX : x

    super(xPath, y, width, height)
  }
}