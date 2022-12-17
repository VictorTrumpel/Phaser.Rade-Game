import { Animations } from 'phaser'
import { Hero } from '../prefabs/Hero'

export class HeroAnimationManager extends Animations.AnimationState {
  private _animationResolver: () => void | null
  private hero: Hero

  onAttackComplete = () => {
    this._animationResolver?.()
    this.play('knight_idle')
  }

  constructor(hero: Hero) {
    super(hero)

    this.hero = hero

    const framesIdle = this.generateFrameNames('knight', {
      prefix: 'idle_',
      suffix: '.png',
      start: 1,
      end: 15,
    })

    const framesAttack = this.generateFrameNames('knight', {
      prefix: 'attack_',
      suffix: '.png',
      start: 1,
      end: 23,
    })

    this.create({
      key: 'knight_idle',
      frames: framesIdle,
      frameRate: 12,
      repeatDelay: 1000,
      repeat: -1,
    })

    this.create({
      key: 'knight_attack',
      frames: framesAttack,
      frameRate: 12,
      repeatDelay: 1000,
    })

    this.initEvents()
  } 

  async playAttack() {
    return new Promise((res) => {
      this.hero.play('knight_attack', true)
      this._animationResolver = res.bind(null);
    })
  }

  async playIdle() {
    this.hero.play('knight_idle')
  }

  async playDie() {
    // Запустить промисификацию анимации смерти
    // return new Promise((res) => {
    //   this.play('knight_attack', true)
    //   this._animationResolver = res.bind(null);
    // })
  }

  private initEvents() {
    this.parent.on('animationcomplete-knight_attack', this.onAttackComplete)
  }
}