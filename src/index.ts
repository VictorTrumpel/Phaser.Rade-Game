import * as Phaser from 'phaser'
import { GameScene } from './scenes/GameScene'
import { PreloadScene } from './scenes/PreloadScene'
import { ChooseHeroScene } from './scenes/ChooseHeroScene'
import { GoodsManager } from './manage/GoodsManager'
import gameSettings from './gameSettings'

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  ...gameSettings,
  roundPixels: false,
  pixelArt: true,
  scene: [
    PreloadScene,
    ChooseHeroScene,
    GameScene,
    // BattleScene
  ],
}

new GoodsManager()
const game = new Phaser.Game(config)
