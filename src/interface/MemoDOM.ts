export class MemoDOM {
  private _cache: Record<string, HTMLElement | undefined> = {}

  get cache() {
    return this._cache
  }

  clear() {
    this._cache = {}
  }

  memoizeDocument(elementDOM: HTMLElement) {
    if (!elementDOM) return
    const elementsToNeedCache = elementDOM.querySelectorAll('[data-memo]')

    for (const element of elementsToNeedCache as unknown as HTMLElement[]) {
      const key = element.dataset.memo
      if (!key) return
      this._cache[key] = element
    }
  }
}