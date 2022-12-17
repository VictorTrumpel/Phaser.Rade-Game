import { BaseFrameBuilder } from './BaseFrameBuilder'
import { Animations } from 'phaser'
import * as Phaser from 'phaser'


export class KnightFrameBuilder extends BaseFrameBuilder {
  attackAnimation: Phaser.Types.Animations.Animation
  idleAnimation: Phaser.Types.Animations.Animation
  dieAnimation: Phaser.Types.Animations.Animation

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
      key: 'knight_attack',
      frames: framesAttack,
      frameRate: 12,
      repeatDelay: 1000,
    }

    this.idleAnimation = {
      key: 'knight_idle',
      frames: framesIdle,
      frameRate: 12,
      repeatDelay: 1000,
      repeat: -1,
    }

    this.dieAnimation = {
      key: 'knight_die',
      frames: framesDie,
      frameRate: 12,
      repeatDelay: 1000,
    }
  }
}