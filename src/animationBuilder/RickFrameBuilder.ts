import { BaseFrameBuilder } from './BaseFrameBuilder'
import { Animations } from 'phaser'

export class RickFrameBuilder extends BaseFrameBuilder {
  attackAnimationKey = 'rick_attack'
  idleAnimationKey = 'rick_idle'
  dieAnimationKey = 'rick_die'

  constructor(animationState: Animations.AnimationState) {
    super(animationState)

    const framesIdle = animationState.generateFrameNames('rick', {
      prefix: 'idle_',
      suffix: '.png',
      start: 1,
      end: 16,
    })

    const framesAttack = animationState.generateFrameNames('rick', {
      prefix: 'attack_',
      suffix: '.png',
      start: 1,
      end: 30
    })

    const framesDie = animationState.generateFrameNames('rick', {
      prefix: 'die_',
      suffix: '.png',
      start: 1,
      end: 36
    })

    this.attackAnimation = {
      key: 'rick_attack',
      frames: framesAttack,
      delay: 200,
      frameRate: 12,
      repeatDelay: 1000
    }

    this.idleAnimation = {
      key: 'rick_idle',
      frames: framesIdle,
      frameRate: 12,
      repeatDelay: 1000,
      repeat: -1
    }

    this.dieAnimation = {
      key: 'rick_die',
      frames: framesDie,
      frameRate: 12,
      repeatDelay: 1000
    }
  }
}