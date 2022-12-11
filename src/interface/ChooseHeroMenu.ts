import { allCharacters } from '../characterConfigs/allCharacters'
import { BaseMenu } from './BaseMenu'
import { IHeroConfig } from '../characterConfigs/IHeroConfig'
import { GoodsManager } from '../manage/GoodsManager'
import goldIcon from '../assets/icons/gold-bars-icon.png'
import expIcon from '../assets/icons/exp-icon.png'

export class ChooseHeroMenu extends BaseMenu {
  private _checkedHeroes: (IHeroConfig['name'])[] = []
  private goods = new GoodsManager()

  constructor() {
    super()
  }

  get checkedHeroes() {
    return this._checkedHeroes
  }

  onListClick = (e: MouseEvent) => {
    // @ts-ignore
    const tagName = e.target?.tagName
    const inputHero = tagName === 'INPUT' 
      ? e.target as HTMLInputElement & { value: IHeroConfig['name'] }
      : null

    if (!inputHero) 
      return

    const heroCast = inputHero.value
    const heroConfig = allCharacters.find((hero) => heroCast === hero.caste)!

    if (this._checkedHeroes.includes(heroCast)) {
      this._checkedHeroes = this._checkedHeroes.filter((cast) => cast !== heroCast)
      this.goods.gold = this.goods.gold + heroConfig.cost
      return
    }

    if (heroConfig.cost > this.goods.gold)
      return

    this._checkedHeroes.push(heroCast)

    this.goods.gold = this.goods.gold - heroConfig.cost 
  }

  onSubmit = () => {}

  onStartBtnClick = () => {
    if (this._checkedHeroes.length < 2) return
    this.onSubmit()
  }

  onUpdateGoods = () => {
    if (this.goldStat)
      this.goldStat.innerText = this.goods.gold + ''
    if (this.expStat)
      this.expStat.innerText = this.goods.experience + ''
    if (this.characterList) {
      const heroesList = this.characterList.querySelectorAll('li')

      heroesList.forEach((heroLiItem) => {
        const input = heroLiItem.querySelector('input')!
        const caste = heroLiItem.dataset.cast as IHeroConfig['name']
        const heroConfig = allCharacters.find(hero => hero.caste === caste)!
        const isHeroChecked = Boolean(this._checkedHeroes.find(checkedCaste => 
          caste === checkedCaste
        ))
        const isDisabledHero = heroConfig.cost > this.goods.gold

        if (isDisabledHero && !isHeroChecked) {
          heroLiItem.classList.add('disabled')
          input.disabled = true
          return
        }

        heroLiItem.classList.remove('disabled')
        input.disabled = false
      })
    }
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

  protected initEvents() {
    this.characterList?.addEventListener('click', this.onListClick)
    this.startButton?.addEventListener('click', this.onStartBtnClick)
    this.goods.onUpdateGoods = this.onUpdateGoods
  }

  protected removeEvents() {
    this.characterList?.removeEventListener('click', this.onListClick)
    this.startButton?.addEventListener('click', this.onStartBtnClick)
  }

  readonly templateHeroes = () => 
    allCharacters.map(({ caste, imgPath, cost }) => /*html*/`
      <li 
        data-cast='${caste}' 
        class='hero-list-item ${caste} ${cost > this.goods.gold ? 'disabled' : ''}'
      > 
        <label>
          <div class='hero-image-container'>
            <img src='${imgPath}' alt='${caste}' class='hero-img' />
          </div>
          <h5 class='hero-item-title'>
            ${caste} 
            <input 
              type='checkbox' 
              value='${caste}' 
              ${cost > this.goods.gold ? 'disabled' : ''}
            />
          </h5>
          <span class='hero-cost'>
            <img src='${goldIcon}' alt='gold' class='stat-icon icon-img' />
            ${cost}
          </span>
        </label>
      </li>
    `).join('')

  readonly template = /*html*/`
    <section class='choose-hero-menu menu-window'>
      <div class='choose-hero-window'>
        <div class='stats-line'>
          <span class='stat gold-stat'>
            <img src='${goldIcon}' alt='gold' class='stat-icon icon-img' />
            <i data-memo='gold-stat'>${this.goods.gold}</i>
          </span>

          <span class='stat exp-stat'>
            <img src='${expIcon}' alt='exp' class='stat-icon icon-img' />
            <i data-memo='exp-stat'>${this.goods.experience}</i>
          </span>
        </div>
        <ul data-memo='heroes-list' class='heroes-list'>
          ${this.templateHeroes()}
        </ul> 
        <button data-memo='start-button' class='start-button-game'>
          Fight!
        </button>
      </div>
    </section>
  `

  protected get characterList(): HTMLUListElement | undefined {
    return this.memoDOM.cache['heroes-list'] as HTMLUListElement | undefined
  }

  protected get startButton(): HTMLButtonElement | undefined {
    return this.memoDOM.cache['start-button'] as HTMLButtonElement | undefined
  }

  protected get goldStat(): HTMLElement | undefined {
    return this.memoDOM.cache['gold-stat'] as HTMLElement | undefined
  }

  protected get expStat(): HTMLElement | undefined {
    return this.memoDOM.cache['exp-stat'] as HTMLElement | undefined
  }
}

