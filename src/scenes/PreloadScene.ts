import { Scene } from 'phaser'
import bgImage from '../assets/background/desert.jpg'

import magicianTexture from '../assets/magician/magic1.png'
import * as magicianMap from '../assets/magician/magic1.json'

import monsterTexture from '../assets/monster/monster.png'
import * as monsterMap from '../assets/monster/monster.json'

export class PreloadScene extends Scene {
  constructor() {
    super('PreloadScene')
  }

  preload() {
    this.load.image('bg', bgImage)

    this.load.atlas('magician', magicianTexture, magicianMap)

    this.load.atlas('monster', monsterTexture, monsterMap)
  }
  
  create() {
    this.scene.start('GameScene')
  }
}