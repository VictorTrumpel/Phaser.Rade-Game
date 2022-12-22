import { BaseFrameBuilder } from './BaseFrameBuilder'
import { HeroCasts } from '../characterConfigs/IHeroConfig'
import { KnightFrameBuilder } from './KnightFrameBuilder'
import { MagicFrameBuilder } from './MagicFrameBuilder'
import { RoninFrameBuilder } from './RoninFrameBuilder'
import { SvenFrameBuilder } from './SvenFrameBuilder'
import { RickFrameBuilder } from './RickFrameBuilder'

const builders: Record<HeroCasts, typeof BaseFrameBuilder> = {
  knight: KnightFrameBuilder,
  magician: MagicFrameBuilder,
  soldier: BaseFrameBuilder,
  monster: BaseFrameBuilder,
  rogue: BaseFrameBuilder,
  ronin: RoninFrameBuilder,
  sven: SvenFrameBuilder,
  rick: RickFrameBuilder
}

export default builders