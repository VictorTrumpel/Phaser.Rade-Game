import { Utils } from 'phaser'
import { HeroCasts } from './../characterConfigs/IHeroConfig';
import { allCharacters, CharacterItem } from './../characterConfigs/allCharacters'
import { Scene } from 'phaser'
import { Hero } from '../prefabs/Hero'
import { ChooseHeroScenePayload } from './ChooseHeroScene'
import { HeroManager } from '../manage/HeroManager'
import { FinishFightMenu } from '../interface/FinishFightMenu'
import { ButtlePolygon } from '../manage/BattlePolygon'
import { IInteractiveObject } from '../model/IInteractiveObject'
import safariMap from '../maps/safariMap'
import gameSettings from '../gameSettings'

export class GameScene extends Scene {
  public heroManager: HeroManager
  public buttleField: ButtlePolygon

  onClickHero = (_: unknown, interactiveObject: IInteractiveObject) => {
    interactiveObject.onClick()
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

    this.heroManager.createHeroes([...teamHeroCreds, ...enemyHeroCreds])
  }

  initEvents() {
    this.input.on('gameobjectdown', this.onClickHero)
    this.heroManager.onFightOver = this.onFightOver
  }
}

const getArrayRandom = <T extends unknown>(array: readonly T[], startIndex?: number, endIndex?: number) =>
  Utils.Array.GetRandom(array as any[], startIndex, endIndex) as T