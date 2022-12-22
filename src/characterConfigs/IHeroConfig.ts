export type HeroCasts = 'magician' | 'monster' | 'rogue' | 'soldier' | 'knight' | 'ronin' | 'sven'

export interface IHeroConfig {
  name: HeroCasts
  texture: string
  attackValue: number
  healthValue: number
}