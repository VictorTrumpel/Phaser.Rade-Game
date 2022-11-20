
type GoodsManagerInitProps = {
  gold: number
  experience: number
}

export class GoodsManager {
  private _gold: number
  private _experience: number
  static _instance: GoodsManager | undefined

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
    this._gold = gold
    localStorage.setItem('gold', `${gold}`)
  }

  get gold() {
    return this._gold
  }

  set experience(exp: number) {
    this._experience = exp
    localStorage.setItem('experience', `${exp}`)
  }

  get experience() {
    return this._experience
  }
}