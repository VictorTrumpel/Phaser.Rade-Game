import { HeroFightToggler } from './../manage/HeroFightToggler'
import { Utils } from 'phaser'
import { allCharacters, CharacterItem } from './../characterConfigs/allCharacters'
import { Scene } from 'phaser'
import { Hero } from '../prefabs/Hero'
import { ChooseHeroScenePayload } from './ChooseHeroScene'
import { HeroManager } from '../manage/HeroManager'
import { FinishFightMenu } from '../interface/FinishFightMenu'
import { ButtlePolygon } from '../manage/BattlePolygon'
import { IInteractiveObject } from '../model/IInteractiveObject'
import { HeroTeams } from '../manage/HeroTeams'
import safariMap from '../maps/safariMap'
import gameSettings from '../gameSettings'

export class GameScene extends Scene {
  public heroManager: HeroManager
  public buttleField: ButtlePolygon
  public heroTeams: HeroTeams
  public heroFightToggler: HeroFightToggler

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

    this.heroTeams = new HeroTeams(this, this.buttleField)
  }

  create(data: ChooseHeroScenePayload) {
    this.initScene()
    
    this.heroTeams.createTeams(data.checkedHeroes)

    this.heroFightToggler = new HeroFightToggler(this.heroTeams)

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

  initEvents() {
    this.input.on('gameobjectdown', this.onClickHero)
    this.heroFightToggler.onFightOver = this.onFightOver
  }
}

const getArrayRandom = <T extends unknown>(array: readonly T[], startIndex?: number, endIndex?: number) =>
  Utils.Array.GetRandom(array as any[], startIndex, endIndex) as T