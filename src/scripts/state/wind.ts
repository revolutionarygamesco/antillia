import getDate from '../time/date.ts'
import isNumber from '../utilities/guards/number.ts'
import isWithinRange from '../utilities/range.ts'
import localize from '../utilities/wrappers/localize.ts'
import makeLink from '../utilities/make-link.ts'
import selectRandomBetween from '../random/between.ts'
import { MODULE_ID, UUIDS } from '../settings.ts'

class WindState {
  level: number

  constructor(init?: number) {
    this.level = 2
    if (isNumber(init)) this.set(init)
  }

  get label () {
    return localize([MODULE_ID, 'wind', 'level', this.level.toString(), 'title'])
  }

  get description () {
    const context: Record<string, string> = {}

    if (this.level === 3) {
      const name = localize([MODULE_ID, 'wind', 'level', '3', 'roll'])
      const uuid = UUIDS.CANVAS
      context.roll = makeLink({ name, uuid })
    }

    if (this.level === 4) {
      const name = localize([MODULE_ID, 'wind', 'level', '4', 'suggestions'])
      const uuid = UUIDS.JOURNAL_RULES_STORM
      context.suggestions = makeLink({ name, uuid })
    }

    return localize([MODULE_ID, 'wind', 'level', this.level.toString(), 'description'], context)
  }

  set (l: number) {
    this.level = Math.max(1, Math.min(4, l))
  }

  incr () {
    this.set(this.level + 1)
  }

  decr () {
    this.set(this.level - 1)
  }

  async sendMessage (whisper: string[] = [game.user.id]) {
    const prefix = [MODULE_ID, 'wind', 'message']
    await foundry.documents.ChatMessage.create({
      speaker: { alias: localize([...prefix, 'speaker']) },
      flavor: localize([...prefix, 'flavor']),
      content: `<p><strong>${this.label}</strong></p>${this.description}`,
      whisper
    })
  }

  async change (whisper: string[] = [game.user.id]) {
    const date = getDate()
    const month = date.getUTCMonth()
    const isWet = isWithinRange(month, [5, 10])
    const isPeak = isWithinRange(month, [7, 8])
    const modifier = isPeak ? 2 : isWet ? 1 : 0

    const roll = selectRandomBetween(1, 20) + modifier

    if (roll < 2) {
      this.set(1)
    } else if (roll < 11) {
      this.decr()
    } else if (roll < 20) {
      this.incr()
    } else {
      this.set(4)
    }

    await this.sendMessage(whisper)
  }
}

export default WindState
