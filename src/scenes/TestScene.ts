import { Scene } from 'phaser'
import { Hero } from '../prefabs/Hero'
import { knightConfig } from '../characterConfigs/knightConfig'
import { magicianConfig } from '../characterConfigs/magicianConfig'
import { roninConfig } from '../characterConfigs/roninConfig'
import gameSettings from '../gameSettings'

export class TestScene extends Scene {

  knight: Hero

  onClickHero = async (_: unknown, attackedSprite: Hero) => {
    await attackedSprite.playAttack()
  }

  constructor() {
    super('TestScene')
  }

  onAttackButtonClick = async () => {
    await this.knight.playAttack()
    console.log('attack :>> ')
  }

  onDieButtonClick = async () => {
    await this.knight.playDie()
  }

  init() {
    const buttonAttack = document.createElement('button')
    buttonAttack.onclick = this.onAttackButtonClick
    buttonAttack.innerText = 'Атаковать'

    const buttonDie = document.createElement('button')
    buttonDie.onclick = this.onDieButtonClick
    buttonDie.innerText = 'Убить'

    document.body.append(buttonAttack)
    document.body.append(buttonDie)
  }

  create() {
    this.createBg()

    this.knight = new Hero(this, {
      ...knightConfig,
      x: 500,
      y: 480,
      frame: 'idle_1.png'
    })

    this.knight.scale = 3.5

    // this.knight = new Hero(this, {
    //   ...magicianConfig,
    //   x: 500,
    //   y: 480,
    //   frame: 'health_1.png'
    // })

    // this.knight = new Hero(this, {
    //   ...roninConfig,
    //   x: 500,
    //   y: 480,
    //   frame: 'idle_1.png'
    // })

    // this.knight.scale = 3.5

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