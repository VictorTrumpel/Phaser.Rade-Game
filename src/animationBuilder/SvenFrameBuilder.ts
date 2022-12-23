import { BaseFrameBuilder } from './BaseFrameBuilder'
import { Animations } from 'phaser'

export class SvenFrameBuilder extends BaseFrameBuilder {
  attackAnimationKey = 'sven_attack'
  idleAnimationKey = 'sven_idle'
  dieAnimationKey = 'sven_die'

  constructor(animationState: Animations.AnimationState) {
    super(animationState)

    const framesIdle = animationState.generateFrameNames('sven', {
      prefix: 'idle_',
      suffix: '.png',
      start: 1,
      end: 9,
    })

    const framesAttack = animationState.generateFrameNames('sven', {
      prefix: 'attack_',
      suffix: '.png',
      start: 1,
      end: 21,
    })

    const framesDie = animationState.generateFrameNames('sven', {
      prefix: 'die_',
      suffix: '.png',
      start: 1,
      end: 4,
    })

    this.attackAnimation = {
      key: this.attackAnimationKey,
      frames: framesAttack,
      frameRate: 12,
      repeatDelay: 1000,
    }

    this.idleAnimation = {
      key: this.idleAnimationKey,
      frames: framesIdle,
      frameRate: 9,
      repeatDelay: 1000,
      repeat: -1,
    }

    this.dieAnimation = {
      key: this.dieAnimationKey,
      frames: framesDie,
      frameRate: 12,
      repeatDelay: 1000,
    }
  }
}