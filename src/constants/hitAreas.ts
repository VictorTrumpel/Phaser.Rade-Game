import { HeroCasts } from '../characterConfigs/IHeroConfig'
import knightHitArea from '../assets/knight/hit_area'
import roninHitArea from '../assets/ronin/hit_area'
import svenHitArea from '../assets/sven/hit_area'
import rickHitArea from '../assets/rick/hit_area'

const hitAreas: Record<HeroCasts, { x: number, invertX: number, y: number, width: number, height: number }> = {
  knight: knightHitArea,
  ronin: roninHitArea,
  sven: svenHitArea,
  rick: rickHitArea
}

export default hitAreas