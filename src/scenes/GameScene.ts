import { allCharacters, CharacterItem } from './../characterConfigs/allCharacters'
import { Scene } from 'phaser'
import { Hero } from '../prefabs/Hero'
import { ChooseHeroScenePayload } from './ChooseHeroScene'
import { Utils } from 'phaser'
import { HeroManager } from '../HeroManager'
import { FinishFightMenu } from '../interface/FinishFightMenu'
import gameSettings from '../gameSettings'

const teamPositions: { x: number, y: number }[] = [
  { x: 400, y: 510 },
  { x: 500, y: 610 },
  { x: 600, y: 500 },
  { x: 700, y: 600 }
]

export class GameScene extends Scene {
  public heroManager: HeroManager

  constructor() {
    super('GameScene')
  }

  initScene() {
    this.heroManager = new HeroManager(this)
  }

  create(data: ChooseHeroScenePayload) {
    this.initScene()

    this.createBg()

    this.createHeroes(data.checkedHeroes)

    this.initEvents()
  }

  createBg() {
    this.add.tileSprite(
      0, 
      0, 
      gameSettings.width, 
      gameSettings.height,
      'bg'
    ).setOrigin(0)
  }

  createHeroes(checkedHeroes: ChooseHeroScenePayload['checkedHeroes']) {
    const enemyHeroCasts = Array.from({ length: 2 }, () => 
      getArrayRandom<CharacterItem>(allCharacters).caste
    )
    
    const teamHeroCasts = checkedHeroes.splice(0, 2)

    const heroesCreds = [...teamHeroCasts, ...enemyHeroCasts].map((caste, idx) => ({
      caste,
      positionX: teamPositions[idx].x,
      positionY: teamPositions[idx].y,
      isAutoplay: idx < 2 ? false : true
    }))

    this.heroManager.createHeroes(heroesCreds)
  }

  onClickHero(_: unknown, attackedSprite: Hero) {
    this.heroManager.startRound(attackedSprite)
  }
  
  async onFightOver() {
    const finishFightScene = new FinishFightMenu(this)
    await finishFightScene.create()
    finishFightScene.render() 
  }

  initEvents() {
    this.input.on('gameobjectdown', this.onClickHero, this)
    this.events.on('fightOver', this.onFightOver, this)
  }
}

const getArrayRandom = <T extends unknown>(array: readonly T[], startIndex?: number, endIndex?: number) =>
  Utils.Array.GetRandom(array as any[], startIndex, endIndex) as T