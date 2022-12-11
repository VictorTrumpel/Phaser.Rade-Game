
type GoodsManagerInitProps = {
  gold: number
  experience: number
}

export class GoodsManager {
  private _gold: number
  private _experience: number
  static _instance: GoodsManager | undefined
  private _onUpdateGoods: () => any = () => null
  
  constructor(props?: GoodsManagerInitProps) {
    if (GoodsManager._instance) {
      return GoodsManager._instance
    }

    const { gold, experience } = props || {}

    const localGold = parseInt(`${localStorage.getItem('gold')}`)
    const localExperience = parseInt(`${localStorage.getItem('experience')}`)

    this._gold = localGold || gold || 0
    this._experience = localExperience || experience || 0

    localStorage.setItem('gold', `${this._gold}`)
    localStorage.setItem('experience', `${this._experience}`)

    GoodsManager._instance = this
  }

  set gold(gold: number) {
    if (gold == this._gold) return
    this._gold = gold
    localStorage.setItem('gold', `${gold}`)
    this._onUpdateGoods()
  }

  get gold() {
    return this._gold
  }

  set experience(exp: number) {
    if (exp == this._experience) return
    this._experience = exp
    localStorage.setItem('experience', `${exp}`)
    this._onUpdateGoods()
  }

  get experience() {
    return this._experience
  }

  set onUpdateGoods(callback: () => any ) {
    this._onUpdateGoods = callback
  }
}