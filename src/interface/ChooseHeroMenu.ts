import { allCharacters } from '../characterConfigs/allCharacters'
import { BaseMenu } from './BaseMenu'

export class ChooseHeroMenu extends BaseMenu {
  private _checkedHeroes: string[] = []

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
      ? e.target as HTMLInputElement 
      : null

    if (!inputHero) return

    const value = inputHero.value

    if (this._checkedHeroes.includes(value)) {
      this._checkedHeroes = this._checkedHeroes.filter((cast) => cast !== value)
      return
    }

    this._checkedHeroes.push(value)
  }

  onSubmit = () => {}

  onStartBtnClick = () => {
    if (this._checkedHeroes.length < 2) return
    this.onSubmit()
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
  }

  protected removeEvents() {
    this.characterList?.removeEventListener('click', this.onListClick)
    this.startButton?.addEventListener('click', this.onStartBtnClick)
  }

  readonly template = /*html*/`
    <section class='choose-hero-menu'>
      <div class='choose-hero-window'>
        <ul data-memo='heroes-list' class='heroes-list'>
          ${allCharacters.map(({ caste, imgPath }) => /*html*/`
            <li data-memo='${caste}' class='hero-list-item'> 
              <label>
                <img src='${imgPath}' alt='${caste}' />
                <h5 class='hero-item-title'>
                  ${caste} 
                  <input type='checkbox' value='${caste}' />
                </h5>
              </label>
            </li>
          `).join('')}
        </ul> 
        <button data-memo='start-button' class='start-button-game'>
          Start the game
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
}

