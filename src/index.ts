import * as Phaser from 'phaser'
import { CANVAS } from 'phaser'
import { GameScene } from './scenes/GameScene'
import { PreloadScene } from './scenes/PreloadScene'
import { ChooseHeroScene } from './scenes/ChooseHeroScene'
import { GoodsManager } from './manage/GoodsManager'
import gameSettings from './gameSettings'

const config = {
  type: Phaser.AUTO,
  ...gameSettings,
  scene: [
    PreloadScene,
    ChooseHeroScene,
    GameScene,
  ],
}

new GoodsManager()
const game = new Phaser.Game(config)

//@ts-ignore
CANVAS.setSmoothingEnabled(game.context, false);