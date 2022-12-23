import { BaseFrameBuilder } from './BaseFrameBuilder'
import { Animations } from 'phaser'

export class KnightFrameBuilder extends BaseFrameBuilder {
  attackAnimationKey = 'knight_attack'
  idleAnimationKey = 'knight_idle'
  dieAnimationKey = 'knight_die'

  constructor(animationState: Animations.AnimationState) {
    super(animationState)

    const framesIdle = animationState.generateFrameNames('knight', {
      prefix: 'idle_',
      suffix: '.png',
      start: 1,
      end: 15,
    })

    const framesAttack = animationState.generateFrameNames('knight', {
      prefix: 'attack_',
      suffix: '.png',
      start: 1,
      end: 23,
    })

    const framesDie = animationState.generateFrameNames('knight', {
      prefix: 'die_',
      suffix: '.png',
      start: 1,
      end: 15,
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