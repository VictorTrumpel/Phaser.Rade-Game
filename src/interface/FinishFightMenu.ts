import { HeroManager } from '../manage/HeroManager';
import { Scene } from 'phaser'
import { BaseMenu } from './BaseMenu'
import { GoodsManager } from '../manage/GoodsManager';
import goldIcon from '../assets/icons/gold-bars-icon.png'
import expIcon from '../assets/icons/exp-icon.png'

type Loot = {
  gold: number
  exp: number
}

export class FinishFightMenu extends BaseMenu {

  private scene: Scene
  private heroManager: HeroManager
  private isWin: boolean = false
  private canvas: HTMLCanvasElement | null
  private goodsManager = new GoodsManager()
  private lootForButtle: Loot = {
    gold: 0,
    exp: 0
  }


  onBtnClick = () => {
    this.scene.scene.start('ChooseHeroScene')
    this.destroy()
  }

  constructor(scene: Scene & { heroManager: HeroManager }) {
    super()
    this.scene = scene
    this.heroManager = scene.heroManager
    this.isWin = this.heroManager.getHeroesState().myHeroesIsAlive
    this.lootForButtle = this.isWin 
      ? { gold: 200, exp: 200 }
      : { gold: 0, exp: 0 }

    this.saveLoot()
  }

  async create(): Promise<void> {
    super.create()

    this.memoDOM.memoizeDocument(this.elemHTML)
    this.initEvents()

    this.addCanvasBlur()
    this.printStats()
  }

  addCanvasBlur() {
    this.canvas = document.querySelector('canvas')
    this.canvas?.classList.add('blur-filter')
  }

  printStats() {
    this.fightHeader.innerText = this.isWin 
      ? 'victory!' 
      : 'loose!'

    const { gold, exp } = this.lootForButtle

    this.goldField.innerText = gold
      ? '+' + gold
      : '' + gold

    this.expField.innerText = exp
      ? '+' + exp
      : '' + exp
  }

  saveLoot() { 
    const gold = this.goodsManager.gold
    const exp = this.goodsManager.experience

    this.goodsManager.gold = gold + this.lootForButtle.gold
    this.goodsManager.experience = exp + this.lootForButtle.exp
  }

  destroy(): void {
    this.removeEvents()
    this.canvas?.classList.remove('blur-filter')
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
      <div class='finish-fight-window'>
        <h1>the battle is over!</h1>
        <h3 data-memo='fight-header' class='fight-conclusion'>
          victory
        </h3>

        <table class='loot-table'>
          <caption>loot:</caption>
          <tr>
            <td>gold</td>
            <td class='loot-value-cell'>
              <span data-memo='gold-field'>0</span>
              <img src='${goldIcon}' alt='pt' class='stat-icon' />
            </td> 
          </tr>
          <tr>
            <td>experience</td>
            <td class='loot-value-cell'>
              <span data-memo='exp-field'>0</span>
              <img src='${expIcon}' alt='pt' class='stat-icon' />
            </td>
          </tr>
        </table>

        <button 
          data-memo='return-button'
          class='return-button'
        >
          return
        </button>
      </div>
    </section>
  `

  protected get returnButton(): HTMLButtonElement {
    return this.memoDOM.cache['return-button'] as HTMLButtonElement
  }

  protected get goldField(): HTMLSpanElement {
    return this.memoDOM.cache['gold-field'] as HTMLSpanElement
  }

  protected get expField(): HTMLSpanElement {
    return this.memoDOM.cache['exp-field'] as HTMLSpanElement
  }

  protected get fightHeader(): HTMLElement {
    return this.memoDOM.cache['fight-header'] as HTMLElement
  }
}