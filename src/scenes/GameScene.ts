import { HeroFightToggler } from './../manage/HeroFightToggler'
import { Scene } from 'phaser'
import { ChooseHeroScenePayload } from './ChooseHeroScene'
import { FinishFightMenu } from '../interface/FinishFightMenu'
import { HeroButtleGround } from '../manage/HeroButtleGround'
import { IInteractiveObject } from '../model/IInteractiveObject'
import { HeroTeams } from '../manage/HeroTeams'
import { IHeroScene } from './IHeroScene'
import safariMap from '../maps/safariMap'
import gameSettings from '../gameSettings'

export class GameScene extends Scene implements IHeroScene {
  public buttleField: HeroButtleGround
  public heroTeams: HeroTeams
  public heroFightToggler: HeroFightToggler

  onInteractiveClick = (_: unknown, interactiveObject: IInteractiveObject) => {
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
    this.createBg()

    this.buttleField = new HeroButtleGround(this, 340, 550, safariMap)

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
    this.input.on('gameobjectdown', this.onInteractiveClick)
    this.heroFightToggler.onFightOver = this.onFightOver
  }
}