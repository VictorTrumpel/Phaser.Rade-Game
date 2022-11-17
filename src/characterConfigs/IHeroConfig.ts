export type HeroCasts = 'magician' | 'monster' | 'rogue' | 'soldier'

export interface IHeroConfig {
  name: HeroCasts
  texture: string
  attackValue: number
  healthValue: number
}