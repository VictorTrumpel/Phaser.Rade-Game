import { ChooseHeroMenu } from './../interface/ChooseHeroMenu'
import { Scene } from 'phaser'
import { IHeroConfig } from '../characterConfigs/IHeroConfig'

export type ChooseHeroScenePayload = {
  checkedHeroes: (IHeroConfig['name'])[]
}

export class ChooseHeroScene extends Scene {

  chooseHeroMenu: ChooseHeroMenu

  constructor() {
    super('ChooseHeroScene')
  }

  async create() {
    this.chooseHeroMenu = new ChooseHeroMenu()
    await this.chooseHeroMenu.create()
    this.chooseHeroMenu.render()
    this.chooseHeroMenu.onSubmit = this.handleSubmitChoise.bind(this)
  }

  handleSubmitChoise() {
    const payload: ChooseHeroScenePayload = {
      checkedHeroes: this.chooseHeroMenu.checkedHeroes
    }
    this.scene.start('GameScene', payload)
    this.chooseHeroMenu.destroy()
  }
}