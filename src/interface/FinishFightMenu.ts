import { Scene } from 'phaser'
import { BaseMenu } from './BaseMenu'

export class FinishFightMenu extends BaseMenu {

  private scene: Scene

  onBtnClick = () => {
    this.scene.scene.start('ChooseHeroScene')
    this.destroy()
  }

  constructor(scene: Scene) {
    super()
    this.scene = scene
  }

  async create(): Promise<void> {
    super.create()
    this.memoDOM.memoizeDocument(this.elemHTML)
    this.initEvents()
  }

  destroy(): void {
    this.removeEvents()
    super.destroy()
  }

  initEvents() {
    this.returnButton?.addEventListener('click', this.onBtnClick)
  }

  removeEvents() {
    this.returnButton?.removeEventListener('click', this.onBtnClick)
  }

  readonly template = /*html*/`
    <section class='finish-fight-menu menu-window'>
      <h1>Сражение закончено</h1>
      <br />
      <button data-memo='return-button'>Перейти к выбору героев</button>
    </section>
  `

  protected get returnButton(): HTMLButtonElement | undefined {
    return this.memoDOM.cache['return-button'] as HTMLButtonElement | undefined
  }
}