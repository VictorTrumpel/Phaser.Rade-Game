import { SpriteConfig } from './../prefabs/Hero';
import { magicianConfig } from './magicianConfig'
import { monsterConfig } from './monsterConfig'
import { rogueConfig } from './rogueConfig'
import { soldierConfig } from './soldierConfig'

import magicianimgPath from '../assets/magician/magician-card-image.png'
import monsterimgPath from '../assets/monster/monster-card-image.png'
import rogueimgPath from '../assets/rogue/rogue-card-image.png'
import soldierimgPath from '../assets/soldier/soldier-card-image.png'

export type CharacterItem = {
  caste: string
  config: SpriteConfig
  readonly imgPath: string
}

export const allCharacters: readonly CharacterItem[] = [
  {
    caste: 'magician',
    config: magicianConfig,
    imgPath: magicianimgPath
  },
  {
    caste: 'monster',
    config: monsterConfig,
    imgPath: monsterimgPath
  },
  {
    caste: 'rogue',
    config: rogueConfig,
    imgPath: rogueimgPath
  },
  {
    caste: 'soldier',
    config: soldierConfig,
    imgPath: soldierimgPath
  }
] as const