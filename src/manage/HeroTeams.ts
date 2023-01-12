import { Utils, Scene } from 'phaser'
import { Hero } from '../prefabs/Hero'
import { HeroButtleGround } from './HeroButtleGround'
import { CharacterItem } from '../characterConfigs/allCharacters'
import { HeroCasts } from '../characterConfigs/IHeroConfig'
import { ChooseHeroScenePayload } from '../scenes/ChooseHeroScene'
import { allCharacters } from '../characterConfigs/allCharacters'

export class HeroTeams {
  private _heroes: Hero[]  = []
  private _enemyHeroes: Hero[] = []
  private _teamHeroes: Hero[] = []

  constructor(
    private scene: Scene, 
    private buttleField: HeroButtleGround
  ) {
    this.scene = scene
    this.buttleField = buttleField
  }

  get heroes() {
    return this._heroes
  }

  get enemyHeroes() {
    return this._enemyHeroes
  }

  get teamHeroes() {
    return this._teamHeroes
  }

  createTeams(checkedHeroes: ChooseHeroScenePayload['checkedHeroes']) {
    // получаем 2 рандомные рассы 
    const enemyHeroCasts = Array.from({ length: 2 }, () => 
      getArrayRandom<CharacterItem>(allCharacters).caste
    )
    
    const teamHeroCreds = checkedHeroes.map((caste, idx) => {
      const polyCords = this.buttleField.getPolyCord(0, idx * 2) || { x: 0, y: 0 }
      const depth = this.buttleField.getPolygon(0, idx * 2)?.depthForHero || 0

      return {
        caste,
        positionX: polyCords.x,
        positionY: polyCords.y,
        depth,
        isAutoplay: false
      }
    })

    const enemyHeroCreds = enemyHeroCasts.map((caste, idx) => {
      const polyCords = this.buttleField.getPolyCord(2, idx * 2) || { x: 0, y: 0 }
      const depth = this.buttleField.getPolygon(0, idx * 2)?.depthForHero || 0

      return {
        caste,
        positionX: polyCords.x,
        positionY: polyCords.y,
        depth,
        isAutoplay: true
      }
    })

    const heroesCreds = [...teamHeroCreds, ...enemyHeroCreds].map(c => ({ ...c }))

    heroesCreds.sort(({ positionX: x1 }, { positionX: x2}) => x1 - x2)
    heroesCreds.sort(({ positionY: y1 }, { positionY: y2 }) => y1 - y2)

    heroesCreds.forEach((cred) => {
      const { caste, positionX, positionY, isAutoplay, depth } = cred
      const heroConfig = allCharacters.find((hero) => hero.caste === caste)?.config
      if (!heroConfig) return

      const newHero = new Hero(this.scene, {
        ...heroConfig,
        x: positionX,
        y: positionY,
        frame: 'healthy',
        autoPlay: isAutoplay,
        healthBarColor: isAutoplay ? 0xeb4034 : 0x3d6e16,
        invert: isAutoplay,
        scale: 3
      })

      newHero.depth = depth

      // newHero.onClick = this._onHeroClick.bind(this, newHero)
      
      isAutoplay 
        ? this._enemyHeroes.push(newHero)
        : this._teamHeroes.push(newHero)
        
      this._heroes.push(newHero)
    })

    // this.heroManager.createHeroes([...teamHeroCreds, ...enemyHeroCreds])
  }
}

const getArrayRandom = <T extends unknown>(array: readonly T[], startIndex?: number, endIndex?: number) =>
  Utils.Array.GetRandom(array as any[], startIndex, endIndex) as T