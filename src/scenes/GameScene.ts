import { allCharacters, CharacterItem } from './../characterConfigs/allCharacters'
import { Scene } from 'phaser'
import { Hero } from '../prefabs/Hero'
import { ChooseHeroScenePayload } from './ChooseHeroScene'
import { Utils } from 'phaser'
import { HeroManager } from '../manage/HeroManager'
import { FinishFightMenu } from '../interface/FinishFightMenu'
import gameSettings from '../gameSettings'

const teamPositions: { x: number, y: number }[] = [
  { x: 500, y: 480 },
  { x: 600, y: 590 },
  { x: 370, y: 620 },
  { x: 300, y: 500 },
]

const enemyPositions: { x: number, y: number }[] = [
  { x: 750, y: 450 },
  { x: 900, y: 550 }
]

export class GameScene extends Scene {
  public heroManager: HeroManager

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
    
    const teamHeroCreds = checkedHeroes.map((caste, idx) => ({
      caste,
      positionX: teamPositions[idx].x,
      positionY: teamPositions[idx].y,
      isAutoplay: false
    }))

    const enemyHeroCreds = enemyHeroCasts.map((caste, idx) => ({
      caste,
      positionX: enemyPositions[idx].x,
      positionY: enemyPositions[idx].y,
      isAutoplay: true
    }))

    this.heroManager.createHeroes([...teamHeroCreds, ...enemyHeroCreds])
  }

  initEvents() {
    this.input.on('gameobjectdown', this.onClickHero)
    this.heroManager.onFightOver = this.onFightOver
  }
}

const getArrayRandom = <T extends unknown>(array: readonly T[], startIndex?: number, endIndex?: number) =>
  Utils.Array.GetRandom(array as any[], startIndex, endIndex) as T