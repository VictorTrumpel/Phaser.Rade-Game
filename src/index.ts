import * as Phaser from 'phaser'
import { CANVAS } from 'phaser'
import { GameScene } from './scenes/GameScene'
import { PreloadScene } from './scenes/PreloadScene'
import { ChooseHeroScene } from './scenes/ChooseHeroScene'
import { GoodsManager } from './manage/GoodsManager'
import { TestScene } from './scenes/TestScene'
import gameSettings from './gameSettings'

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  ...gameSettings,
  roundPixels: false,
  pixelArt: true,
  scene: [
    PreloadScene,
    // TestScene,
    ChooseHeroScene,
    GameScene,
  ],
}

new GoodsManager()
new Phaser.Game(config)