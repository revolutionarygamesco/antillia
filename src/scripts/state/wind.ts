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
}

export default WindState
