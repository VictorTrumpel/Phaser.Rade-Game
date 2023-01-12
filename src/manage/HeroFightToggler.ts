import { Utils } from 'phaser'
import { HeroTeams } from './HeroTeams'
import { Hero } from '../prefabs/Hero'

export class HeroFightToggler {

  private _activeHeroIndex = 0
  private isProcessing = false

  private _onFightOver = () => null

  private _onHeroClick = (hero: Hero) => {
    this.startRound(hero)
  }

  constructor(private heroTeams: HeroTeams) {
    this.heroTeams = heroTeams

    this.heroes.forEach(hero => {
      hero.onClick = this._onHeroClick.bind(this, hero)
    })

    const firstTeamHeroIdx = this.heroes.findIndex(hero => !hero.autoPlay)
    this._activeHeroIndex = firstTeamHeroIdx
    this.heroes[this._activeHeroIndex].halo.show()
  }

  set onFightOver(callback: () => any) {
    this._onFightOver = callback
  }

  get teamHeroes() {
    return this.heroTeams.teamHeroes
  }

  get enemyHeroes() {
    return this.heroTeams.enemyHeroes
  }

  get heroes() {
    return this.heroTeams.heroes
  }

  get activeHeroIndex() {
    return this._activeHeroIndex
  }

  async startRound(targetHero: Hero) {
    const isCurrentHeroAutoPlay = this.heroes[this._activeHeroIndex].autoPlay
    const isTeamMate = !!this.teamHeroes.find(hero => hero === targetHero)

    if (
      isTeamMate || 
      !targetHero.isAlive() || 
      isCurrentHeroAutoPlay ||
      this.isProcessing
    ) return

    this.isProcessing = true

    await this.attackHero(targetHero)
    await this.turnHero()

    this.isProcessing = false
  }

  getHeroesState() {
    const myHeroesIsAlive = this.teamHeroes.some(hero => hero.isAlive())
    const enemyHeroesIsAlive = this.enemyHeroes.some(hero => hero.isAlive())
    return { myHeroesIsAlive, enemyHeroesIsAlive } 
  }

  private checkWhoWin() {
    const allTeamDie = this.teamHeroes.every(hero => !hero.isAlive())
    const allEnemyDie = this.enemyHeroes.every(hero => !hero.isAlive())

    if (allTeamDie || allEnemyDie) 
      this._onFightOver()
  }

  private async attackHero(targetHero: Hero) {
    const activeHero = this.heroes[this._activeHeroIndex]
    const attackValue = activeHero.attackValue
    await Promise.all([activeHero.attack(), targetHero.hurt(attackValue)])
    this.checkWhoWin()
  }

  private async turnHero() {
    const currentHero = this.heroes[this._activeHeroIndex]

    currentHero.halo.hide()

    this._activeHeroIndex < this.heroes.length - 1
      ? this._activeHeroIndex += 1
      : this._activeHeroIndex = 0

    const activeHero = this.heroes[this._activeHeroIndex]
    
    if (!activeHero?.isAlive()) {
      this.turnHero()
      return
    }
 
    if (!activeHero.autoPlay) {
      activeHero.halo.show()
      return
    }

    const liveTeamPlayers = this.teamHeroes.filter(hero => hero.isAlive())
    const targetHero = getArrayRandom<Hero>(liveTeamPlayers)

    if (!targetHero) {
      throw new Error('tagetHero not defined')
    }

    await this.artificalPause(500)

    await this.attackHero(targetHero)

    this.turnHero()
  }

  private artificalPause(ms: number) {
    return new Promise((res) => {
      setTimeout(() => {
        res(null)
      }, ms)
    })
  }  
}

const getArrayRandom = <T extends unknown>(array: readonly T[], startIndex?: number, endIndex?: number) =>
  Utils.Array.GetRandom(array as any[], startIndex, endIndex) as T