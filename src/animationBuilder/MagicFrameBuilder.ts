import { BaseFrameBuilder } from './BaseFrameBuilder'
import { Animations } from 'phaser'
import * as Phaser from 'phaser'

export class MagicFrameBuilder extends BaseFrameBuilder {
  attackAnimation: Phaser.Types.Animations.Animation
  idleAnimation: Phaser.Types.Animations.Animation
  dieAnimation: Phaser.Types.Animations.Animation

  attackAnimationKey = 'magician_attack'
  idleAnimationKey = 'magician_idle'
  dieAnimationKey = 'magician_die'

  constructor(animationState: Animations.AnimationState) {
    super(animationState)

    const framesIdle = animationState.generateFrameNames('magician', {
      prefix: 'healthy_',
      suffix: '.png',
      start: 1,
      end: 1
    })

    const framesAttack = animationState.generateFrameNames('magician', {
      prefix: 'attack_',
      suffix: '.png',
      start: 1,
      end: 1
    })

    const framesDie = animationState.generateFrameNames('magician', {
      prefix: 'dead_',
      suffix: '.png',
      start: 1,
      end: 1
    })

    this.attackAnimation = {
      key: 'magician_attack',
      frames: framesAttack,
      delay: 200
    }

    this.idleAnimation = {
      key: 'magician_idle',
      frames: framesIdle,
    }

    this.dieAnimation = {
      key: 'magician_die',
      frames: framesDie
    }
  }
}