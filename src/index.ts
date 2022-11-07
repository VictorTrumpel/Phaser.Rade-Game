import * as Phaser from 'phaser'
import { GameScene } from './scenes/GameScene'
import { PreloadScene } from './scenes/PreloadScene'
import gameSettings from './gameSettings'

const config = {
  type: Phaser.AUTO,
  ...gameSettings,
  scene: [
    PreloadScene,
    GameScene,
  ],
}

new Phaser.Game(config)