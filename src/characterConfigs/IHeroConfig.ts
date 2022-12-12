export type HeroCasts = 'magician' | 'monster' | 'rogue' | 'soldier' | 'knight'

export interface IHeroConfig {
  name: HeroCasts
  texture: string
  attackValue: number
  healthValue: number
}