import { Animations } from 'phaser'
import { Hero } from '../prefabs/Hero'
import AnimationBuiler from '../animationBuilder'

type AnimationKeys = {
  attack: string
  die: string
  idle: string
}

export class HeroAnimationPlayer extends Animations.AnimationState {
  private _animationResolver: () => void | null
  private hero: Hero

  private animationKeys: AnimationKeys
  
  onAttackComplete = () => {
    this._animationResolver?.()
  }

  constructor(hero: Hero) {
    super(hero)

    this.hero = hero

    const heroAnimsConfig = new AnimationBuiler[hero.name](this)

    this.animationKeys = {
      attack: heroAnimsConfig.attackAnimationKey,
      idle: heroAnimsConfig.idleAnimationKey,
      die: heroAnimsConfig.dieAnimationKey
    }

    this.create(heroAnimsConfig.idleAnimation)
    this.create(heroAnimsConfig.attackAnimation)
    this.create(heroAnimsConfig.dieAnimation)

    this.initEvents()
  } 

  async playAttack() {
    return new Promise((res) => {
      this.hero.play(this.animationKeys.attack, true)
      this._animationResolver = res.bind(null);
    })
  }

  async playDie() {
    return new Promise((res) => {
      this.hero.play(this.animationKeys.die, true)
      this._animationResolver = res.bind(null);
    })
  }

  async playInjured() {
    console.log('injured')
  }

  async playIdle() {
    this.hero.play(this.animationKeys.idle)
  }

  private initEvents() {
    this.hero.on(
      `animationcomplete-${this.animationKeys.attack}`, 
      this.onAttackComplete
    )
    this.hero.on(
      `animationcomplete-${this.animationKeys.die}`,
      this.onAttackComplete
    )
  }
}