import * as Phaser from 'phaser'
import { GameScene } from './scenes/GameScene'
import { PreloadScene } from './scenes/PreloadScene'
import { ChooseHeroScene } from './scenes/ChooseHeroScene'
import { FinishFightScene } from './scenes/FinishFightScene'
import gameSettings from './gameSettings'

const config = {
  type: Phaser.AUTO,
  ...gameSettings,
  scene: [
    PreloadScene,
    ChooseHeroScene,
    GameScene,
    FinishFightScene
  ],
}

new Phaser.Game(config)