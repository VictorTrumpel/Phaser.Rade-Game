import { Scene } from 'phaser'
import bgImage from '../assets/background/desert.jpg'
import tavernBGImage from '../assets/background/tavern-bg.png'

import goldBarsIcon from '../assets/icons/gold-bars-icon.png'
import expIcon from '../assets/icons/exp-icon.png'

import knightTexture from '../assets/knight/knightTexture.png'
import * as knightMap from '../assets/knight/knightMap.json'

import roninTexture from '../assets/ronin/Ronin_Atlas.png'
import * as roninMap from '../assets/ronin/Ronin_Atlas.json'

import svenTexture from '../assets/sven/Sven_Atlas.png'
import * as svenMap from '../assets/sven/Sven_Atlas.json'

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

    this.load.image('taverna-bg', tavernBGImage)

    this.load.image('gold-bars-icon', goldBarsIcon)
    this.load.image('exp-icon', expIcon)

    this.load.atlas('knight', knightTexture, knightMap)

    this.load.atlas('sven', svenTexture, svenMap)

    this.load.atlas('ronin', roninTexture, roninMap)

    this.load.atlas('magician', magicianTexture, magicianMap)

    this.load.atlas('monster', monsterTexture, monsterMap)

    this.load.atlas('soldier', soldierTexture, soldierMap)

    this.load.atlas('rogue', rogueTexture, rogueMap)

    this.load.atlas('priest', priestTexture, priestMap)
  }
  
  create() {
    // this.scene.start('ChooseHeroScene')
    this.scene.start('TestScene')
  }
}