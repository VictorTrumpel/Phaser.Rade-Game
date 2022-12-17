import { Scene } from 'phaser'
import { Hero } from '../prefabs/Hero'
import { knightConfig } from '../characterConfigs/knightConfig'
import gameSettings from '../gameSettings'

export class TestScene extends Scene {

  onClickHero = async (_: unknown, attackedSprite: Hero) => {
    await attackedSprite.playAttack()
    console.log('click :>> ')
  }

  constructor() {
    super('TestScene')
  }

  create() {
    this.createBg()

    const knight = new Hero(this, {
      ...knightConfig,
      x: 500,
      y: 480,
      frame: 'idle_1.png'
    })

    knight.scale = 3.5



    // this.anims.create({
    //   key: 'fight',
    //   frames,
    //   frameRate: 13,
    //   repeat: -1
    // })

    // this.anims.play('fight', knight)

    // knight.play('fight', true)

    this.initEvents()
  }

  createBg() {
    this.add.tileSprite(
      0, 
      0, 
      gameSettings.width, 
      gameSettings.height,
      'bg'
    ).setOrigin(0)
  }

  initEvents() {
    this.input.on('gameobjectdown', this.onClickHero)
  }
}