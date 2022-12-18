export type HeroCasts = 'magician' | 'monster' | 'rogue' | 'soldier' | 'knight' | 'ronin'

export interface IHeroConfig {
  name: HeroCasts
  texture: string
  attackValue: number
  healthValue: number
}