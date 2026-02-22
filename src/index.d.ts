declare class ApplicationV2 {
  render: (options: boolean) => Promise<ApplicationV2>
  close: (options?: any) => Promise<ApplicationV2>
  _onRender(context: any, options: any): Promise<void>
  _onClose(options: any): void
}

declare class ChatMessage {
  create(data?: any, operation?: any): Promise<any>
}

declare class DialogV2 extends ApplicationV2 {
  element: HTMLElement
  constructor(options?: any)
  close: (options?: any) => Promise<DialogV2>
}

declare class Roll {
  constructor(formula: string, data?: Record<string, any>)
  evaluate(options?: {
    allowInteractive?: boolean,
    allowStrings?: boolean,
    maximize?: boolean,
    minimize?: boolean
  }): Promise<Roll>
  result: number
}


interface Collection<K, V> extends Map<K, V> {
  find(predicate: (value: V, key: K, collection: this) => boolean): V | undefined
  filter(predicate: (value: V, key: K, collection: this) => boolean): V[]
  map<T>(callback: (value: V, key: K, collection: this) => T): T[]
  some(predicate: (value: V, key: K, collection: this) => boolean): boolean
  every(predicate: (value: V, key: K, collection: this) => boolean): boolean
  reduce<T>(callback: (accumulator: T, value: V, key: K, collection: this) => T, initial: T): T
  getName(name: string): V | undefined
  contents: V[]
}

interface Document {
  id: string
  name: string
  uuid: string
  getFlag<T>(scope: string, key: string): T
  setFlag<T>(scope: string, key: string, value: T): void
}

interface JournalEntry extends Document {
  pages: JournalEntryPage[]
  create(data?: any, operation?: any): Promise<JournalEntry>
}

interface JournalEntryPage extends Document {
  type: string
  title: {
    show: boolean
    level: number
  }
  text: {
    format: number
    content: string
  }
}

interface Item extends Document {
  create(data?: any, operation?: any): Promise<Item>
}

interface RollTable extends Document {
  draw(options?: any): Promise<any>
}

interface TableResult extends Document {
  type: string
  documentUuid?: string
  img?: string
}

interface User {
  id: string
}

interface Module {
  api: Record<string, Function>
}

declare const Hooks: {
  on: (name: string, callback: (...args: any[]) => void) => number
  once: (name: string, callback: (...args: any[]) => void) => number
  off: (name: string, fn: number | Function) => void
}

declare const game: {
  i18n: {
    format: (key: string, data?: Record<string, any>) => string
    localize: (key: string) => string
  },
  modules: Collection<string, Module>,
  time: {
    worldTime: number
  },
  user: User
}

declare const foundry: {
  documents: {
    ChatMessage: ChatMessage,
    Item: Item,
    JournalEntry: JournalEntry
  }
}

interface BottleMessage {
  description?: string // Any additional description of the bottle
  with?: string // What else was found with the note
  hint?: string // Hint as to what else besides paper may be inside
  additional?: string // Additional items to show in chat
  contents: Item[] // The items found in the bottle; usually at least the message
}
