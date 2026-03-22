import getDate from '../time/date.ts'
import isWithinRange from '../utilities/range.ts'
import localize from '../utilities/wrappers/localize.ts'
import selectRandomBetween from '../random/between.ts'
import { MODULE_ID } from '../settings.ts'

class WindState {
  level: number

  constructor(init?: number) {
    this.level = init ?? 2
  }

  get label () {
    return localize([MODULE_ID, 'wind', 'level', this.level.toString(), 'title'])
  }

  get description () {
    return localize([MODULE_ID, 'wind', 'level', this.level.toString(), 'description'])
  }

  incr () {
    this.level = Math.min(this.level + 1, 4)
  }

  decr () {
    this.level = Math.max(this.level - 1, 1)
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
      this.level = 1
    } else if (roll < 11) {
      this.decr()
    } else if (roll < 20) {
      this.incr()
    } else {
      this.level = 4
    }

    await this.sendMessage(whisper)
  }
}

export default WindState
