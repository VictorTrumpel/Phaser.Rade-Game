import { Scene } from 'phaser'
import bgImage from '../assets/background/desert.jpg'

import magicianTexture from '../assets/magician/magic1.png'
import * as magicianMap from '../assets/magician/magic1.json'

import monsterTexture from '../assets/monster/monster.png'
import * as monsterMap from '../assets/monster/monster.json'

import soldierTexture from '../assets/soldier/soldier.png'
import * as soldierMap from '../assets/soldier/soldier.json'

import rogueTexture from '../assets/rogue/rogue.png'
import * as rogueMap from '../assets/rogue/rogue.json'

import priestTexture from '../assets/priest/priest.png'
import * as priestMap from '../assets/priest/priest.json'

export class PreloadScene extends Scene {
  constructor() {
    super('PreloadScene')
  }

  preload() {
    this.load.image('bg', bgImage)

    this.load.atlas('magician', magicianTexture, magicianMap)

    this.load.atlas('monster', monsterTexture, monsterMap)

    this.load.atlas('soldier', soldierTexture, soldierMap)

    this.load.atlas('rogue', rogueTexture, rogueMap)

    this.load.atlas('priest', priestTexture, priestMap)
  }
  
  create() {
    this.scene.start('GameScene')
  }
}