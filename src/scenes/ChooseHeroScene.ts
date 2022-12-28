import { ChooseHeroMenu } from './../interface/ChooseHeroMenu'
import { Hero } from '../prefabs/Hero'
import { HeroCasts } from '../characterConfigs/IHeroConfig'
import { Scene } from 'phaser'
import { allCharacters } from '../characterConfigs/allCharacters'

export type ChooseHeroScenePayload = {
  checkedHeroes: HeroCasts[]
}

const heroSlots: { 
  [caste in HeroCasts]: { x: number, y: number }
} = {
  knight: { x: 465, y: 550 },
  ronin: { x: 160, y: 520 },
  sven: { x: 1020, y: 570 },
  rick: { x: 690, y: 650 }
}
export class ChooseHeroScene extends Scene {

  chooseHeroMenu: ChooseHeroMenu

  constructor() {
    super('ChooseHeroScene')
  }

  async create() {
    this.createBg()

    allCharacters.forEach(({ caste, config }) => {
      new Hero(this, {
        ...config,
        x: heroSlots[caste].x,
        y: heroSlots[caste].y,
        frame: 'idle_1.png',
        scale: 4.3
      })
    })
  
    this.chooseHeroMenu = new ChooseHeroMenu()
    await this.chooseHeroMenu.create()
    this.chooseHeroMenu.render()
    this.chooseHeroMenu.onSubmit = this.handleSubmitChoise.bind(this)
  }

  createBg() {
    const bg = this.add.sprite(0, 0, 'taverna-bg').setOrigin(0)
    bg.scale = 1.2
  }

  handleSubmitChoise() {
    const payload: ChooseHeroScenePayload = {
      checkedHeroes: this.chooseHeroMenu.checkedHeroes
    }
    this.scene.start('BattleScene', payload)
    // this.scene.start('GameScene', payload)
    this.chooseHeroMenu.destroy()
  }
}