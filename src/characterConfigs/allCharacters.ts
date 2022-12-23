import { IHeroConfig } from './IHeroConfig'
import { roninConfig } from './roninConfig'
import { knightConfig } from './knightConfig'
import { rickConfig } from './rickConfig'
import { svenConfig } from './svenConfig'

export type CharacterItem = {
  caste: IHeroConfig['name']
  config: IHeroConfig
  cost: number
}

export const allCharacters: readonly CharacterItem[] = [
  {
    caste: 'ronin',
    config: roninConfig,
    cost: 45
  },
  {
    caste: 'knight',
    config: knightConfig,
    cost: 30
  },
  {
    caste: 'rick',
    config: rickConfig,
    cost: 50
  },
  {
    caste: 'sven',
    config: svenConfig,
    cost: 25
  }
] as const