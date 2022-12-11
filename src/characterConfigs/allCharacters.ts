import { magicianConfig } from './magicianConfig'
import { monsterConfig } from './monsterConfig'
import { rogueConfig } from './rogueConfig'
import { soldierConfig } from './soldierConfig'
import { IHeroConfig } from './IHeroConfig'

import magicianimgPath from '../assets/magician/magician-card-image.png'
import monsterimgPath from '../assets/monster/monster-card-image.png'
import rogueimgPath from '../assets/rogue/rogue-card-image.png'
import soldierimgPath from '../assets/soldier/soldier-card-image.png'


export type CharacterItem = {
  caste: IHeroConfig['name']
  config: IHeroConfig
  cost: number
  readonly imgPath: string
}

export const allCharacters: readonly CharacterItem[] = [
  {
    caste: 'magician',
    config: magicianConfig,
    imgPath: magicianimgPath,
    cost: 45
  },
  {
    caste: 'monster',
    config: monsterConfig,
    imgPath: monsterimgPath,
    cost: 30
  },
  {
    caste: 'rogue',
    config: rogueConfig,
    imgPath: rogueimgPath,
    cost: 50
  },
  {
    caste: 'soldier',
    config: soldierConfig,
    imgPath: soldierimgPath,
    cost: 25
  }
] as const