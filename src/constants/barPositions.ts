import { HeroCasts } from '../characterConfigs/IHeroConfig'
import knightBarPosition from '../assets/knight/bar_position'
import roninBarPosition from '../assets/ronin/bar_position'
import rickBarPosition from '../assets/rick/bar_position'
import svenBarPosition from '../assets/sven/bar_position'

const barPositions: Record<HeroCasts, { x: number, y: number }> = {
  ronin: roninBarPosition,
  knight: knightBarPosition,
  rick: rickBarPosition,
  sven: svenBarPosition
}

export default barPositions