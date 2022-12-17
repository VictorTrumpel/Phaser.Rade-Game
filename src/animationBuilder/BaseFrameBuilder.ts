import { Animations } from 'phaser'
import * as Phaser from 'phaser'

export class BaseFrameBuilder {
  attackAnimation: Phaser.Types.Animations.Animation
  idleAnimation: Phaser.Types.Animations.Animation
  dieAnimation: Phaser.Types.Animations.Animation

  constructor(_: Animations.AnimationState) {}
}