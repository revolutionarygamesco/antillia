import localize from '../utilities/wrappers/localize.ts'
import { MODULE_ID } from '../settings.ts'

class WindState {
  level: number

  constructor(init?: number) {
    this.level = init ?? 2
  }

  get label () {
    return localize([MODULE_ID, 'wind', 'level', this.level.toString(), 'title'])
  }
}

export default WindState
