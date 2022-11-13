export interface IMenu {
  elemHTML: HTMLDivElement
  readonly template: string
  
  create(): Promise<void>
  render(parent: HTMLElement): void
  remove(): void
  destroy(): void
}