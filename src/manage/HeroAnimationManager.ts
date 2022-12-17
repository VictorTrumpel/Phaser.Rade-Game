import { Animations } from 'phaser'
import { Hero } from '../prefabs/Hero'
import { KnightFrameBuilder } from '../animationBuilder/KnightFrameBuilder'

export class HeroAnimationManager extends Animations.AnimationState {
  private _animationResolver: () => void | null
  private hero: Hero

  onAttackComplete = () => {
    this._animationResolver?.()
  }

  constructor(hero: Hero) {
    super(hero)

    this.hero = hero

    const knightAnimsConfig = new KnightFrameBuilder(this)

    this.create(knightAnimsConfig.idleAnimation)
    this.create(knightAnimsConfig.attackAnimation)
    this.create(knightAnimsConfig.dieAnimation)

    this.initEvents()
  } 

  async playAttack() {
    return new Promise((res) => {
      this.hero.play('knight_attack', true)
      this._animationResolver = res.bind(null);
    })
  }

  async playDie() {
    return new Promise((res) => {
      this.hero.play('knight_die', true)
      this._animationResolver = res.bind(null);
    })
  }

  async playInjured() {
    console.log('injured')
  }

  async playIdle() {
    this.hero.play('knight_idle')
  }

  private initEvents() {
    this.hero.on('animationcomplete-knight_attack', this.onAttackComplete)
    this.hero.on('animationcomplete-knight_die', this.onAttackComplete)
  }
}