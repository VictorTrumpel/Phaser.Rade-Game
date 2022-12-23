import { BaseFrameBuilder } from './BaseFrameBuilder'
import { Animations } from 'phaser'

export class RoninFrameBuilder extends BaseFrameBuilder {
  attackAnimationKey = 'ronin_attack'
  idleAnimationKey = 'ronin_idle'
  dieAnimationKey = 'ronin_die'

  constructor(animationState: Animations.AnimationState) {
    super(animationState)

    const framesIdle = animationState.generateFrameNames('ronin', {
      prefix: 'idle_',
      suffix: '.png',
      start: 1,
      end: 8,
    })

    const framesAttack = animationState.generateFrameNames('ronin', {
      prefix: 'attack_',
      suffix: '.png',
      start: 1,
      end: 25,
    })

    const framesDie = animationState.generateFrameNames('ronin', {
      prefix: 'die_',
      suffix: '.png',
      start: 1,
      end: 16,
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
      frameRate: 12,
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