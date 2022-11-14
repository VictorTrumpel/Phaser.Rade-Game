import { ChooseHeroMenu } from './../interface/ChooseHeroMenu'
import { Scene } from 'phaser'

export type ChooseHeroScenePayload = {
  checkedHeroes: string[]
}

export class ChooseHeroScene extends Scene {

  chooseHeroMenu = new ChooseHeroMenu()

  constructor() {
    super('ChooseHeroScene')
  }

  async create() {
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