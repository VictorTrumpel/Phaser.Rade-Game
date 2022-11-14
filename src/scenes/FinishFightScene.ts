import { Scene } from 'phaser'
import { FinishFightMenu } from '../interface/FinishFightMenu'

export class FinishFightScene extends Scene {
  constructor() {
    super('FinishFightScene')
  }

  preload() {
    console.log('FinishFightScene :>> ')
  }

  async create() {
    const finishFightScene = new FinishFightMenu(this)
    await finishFightScene.create()
    finishFightScene.render()
  }
}