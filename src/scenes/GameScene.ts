import { HeroCasts } from './../characterConfigs/IHeroConfig';
import { allCharacters, CharacterItem } from './../characterConfigs/allCharacters'
import { Scene } from 'phaser'
import { Hero } from '../prefabs/Hero'
import { ChooseHeroScenePayload } from './ChooseHeroScene'
import { Utils } from 'phaser'
import { HeroManager } from '../manage/HeroManager'
import { FinishFightMenu } from '../interface/FinishFightMenu'
import { ButtlePolygon } from '../manage/BattlePolygon'
import safariMap from '../maps/safariMap'
import gameSettings from '../gameSettings'

const teamPositions: { x: number, y: number }[] = [
  { x: 500, y: 580 },
  { x: 600, y: 690 },
  { x: 370, y: 690 },
  { x: 300, y: 600 },
]

const enemyPositions: { x: number, y: number }[] = [
  { x: 750, y: 580 },
  { x: 900, y: 650 }
]

export class GameScene extends Scene {
  public heroManager: HeroManager
  public buttleField: ButtlePolygon

  onClickHero = (_: unknown, attackedSprite: Hero) => {
    this.heroManager.startRound(attackedSprite)
  }

  onFightOver = async () => {
    const finishFightScene = new FinishFightMenu(this)
    await finishFightScene.create()
    finishFightScene.render() 
  }

  constructor() {
    super('GameScene')
  }

  initScene() {
    this.heroManager = new HeroManager(this)

    this.createBg()

    this.buttleField = new ButtlePolygon(this, 340, 550, safariMap)
  }

  create(data: ChooseHeroScenePayload) {
    this.initScene()    

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
    const temporary__Payload: HeroCasts[] = ['rick', 'sven']

    const enemyHeroCasts = Array.from({ length: 2 }, () => 
      getArrayRandom<CharacterItem>(allCharacters).caste
    )
    
    const teamHeroCreds = temporary__Payload.map((caste, idx) => {
      const polyCords = this.buttleField.getPolyCord(0, idx * 2) || { x: 0, y: 0 }

      return {
        caste,
        positionX: polyCords.x,
        positionY: polyCords.y,
        isAutoplay: false
      }
    })

    const enemyHeroCreds = enemyHeroCasts.map((caste, idx) => {
      const polyCords = this.buttleField.getPolyCord(2, idx * 2) || { x: 0, y: 0 }

      return {
        caste,
        positionX: polyCords.x,
        positionY: polyCords.y,
        isAutoplay: true
      }
    })

    this.heroManager.createHeroes([...teamHeroCreds, ...enemyHeroCreds])
  }

  initEvents() {
    this.input.on('gameobjectdown', this.onClickHero)
    this.heroManager.onFightOver = this.onFightOver
  }
}

const getArrayRandom = <T extends unknown>(array: readonly T[], startIndex?: number, endIndex?: number) =>
  Utils.Array.GetRandom(array as any[], startIndex, endIndex) as T