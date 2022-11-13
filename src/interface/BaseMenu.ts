import { MemoDOM } from './MemoDom'
import { IMenu } from './IMenu'

export class BaseMenu implements IMenu {
  readonly memoDOM = new MemoDOM()

  private _elemHTML: HTMLDivElement | null
  private _DOMChildren: Record<string, BaseMenu | null> = {}

  readonly template: string = '';

  get DOMChildren() {
    return this._DOMChildren
  }

  get elemHTML() {
    if (!this._elemHTML) {
      return this.createDOMElement('<div></div>') as HTMLDivElement
    }
    return this._elemHTML
  }

  protected set elemHTML(element: HTMLDivElement) {
    this._elemHTML = element
  }

  async create() {
    this.elemHTML = this.createDOMElement(this.template)
  }

  render(parent: HTMLElement = document.body) {
    parent.append(this.elemHTML)
  }

  remove() {
    this._elemHTML?.remove()
  }

  destroy() {
    this.remove()
    this.memoDOM.clear()
    this._elemHTML = null
  }

  protected createDOMElement<T extends HTMLElement>(strHTML = ""): T {
    const wrapper = document.createElement("div")
    wrapper.innerHTML = strHTML
    return wrapper.firstElementChild as T
  }

  protected addChildrenComponent(componentMarker: string, component: BaseMenu) {
    this._DOMChildren[componentMarker] = component
  }

  protected renderDOMChildren(elementDOM: HTMLElement) {
    const renderPlace = elementDOM.querySelectorAll('[data-mount]') as NodeListOf<HTMLElement>

    renderPlace.forEach(async elem => {
      const component = elem.dataset.mount
      if (!component) return
      const componentInstance = this._DOMChildren[component]
      if (!componentInstance) return
      componentInstance.render(elem)
    })
  }

  protected removeChildren(componentMarker: string): BaseMenu | null {
    this._DOMChildren[componentMarker] = null
    const children = this._DOMChildren[componentMarker]
    if (!children) return null
    children.remove()
    return children
  }

  protected destroyChildren(componentMarker: string) {
    const children = this.removeChildren(componentMarker)
    children?.destroy()
  }

  protected destroyAllChildren() {
    Object.values(this._DOMChildren).forEach(DOMChild => DOMChild?.destroy())
    this._DOMChildren = {}
  }
}