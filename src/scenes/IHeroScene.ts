import { Scene } from 'phaser'
import { HeroFightToggler } from '../manage/HeroFightToggler'
import { HeroTeams } from '../manage/HeroTeams'

export interface IHeroScene extends Scene {
  heroFightToggler: HeroFightToggler
  heroTeams: HeroTeams
}