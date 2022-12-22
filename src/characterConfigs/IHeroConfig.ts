export type HeroCasts = 'magician' | 'monster' | 'rogue' | 'soldier' | 'knight' | 'ronin' | 'sven' | 'rick'

export interface IHeroConfig {
  name: HeroCasts
  texture: string
  attackValue: number
  healthValue: number
}