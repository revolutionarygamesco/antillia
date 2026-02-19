import localize from '../utilities/wrappers/localize.ts'
import selectRandomElement from '../random/el.ts'
import makeLink from '../utilities/make-link.ts'
import { MODULE_ID, UUIDS } from '../settings.ts'

import generateIntelligenceBottleMessage from './intelligence/bottle-message.ts'

const generateBottleMessage = async (): Promise<void> => {
  const generators: Array<() => Promise<BottleMessage>> = [
    generateIntelligenceBottleMessage
  ]

  const generator = selectRandomElement(generators)
  const msg = await generator()

  const sideKey = selectRandomElement(['port', 'starboard'])
  const side = localize([MODULE_ID, 'sides', sideKey])

  const linkText = localize([MODULE_ID, 'bottle-messages', 'bottle'])
  const bottle = `@UUID[${UUIDS.BOTTLE}]{${linkText}}`

  const descPath = [MODULE_ID, 'bottle-messages', 'description']
  let description = localize([...descPath, 'base'], { bottle })
  if (msg.description && msg.hint) {
    description = localize([...descPath, 'describedWith'], { ...msg, bottle })
  } else if (msg.description) {
    description = localize([...descPath, 'described'], { ...msg, bottle })
  } else if (msg.with) {
    description = localize([...descPath, 'with'], { ...msg, bottle })
  }

  const contents = msg.contents
    .map(item => makeLink(item))
    .map(link => `<p>${link}</p>`)
    .join('')

  const content = localize([MODULE_ID, 'bottle-messages', 'content'], {
    side, description, additional: msg.additional ?? '', contents
  })

  await foundry.documents.ChatMessage.create({
    speaker: { alias: localize(`${MODULE_ID}.lookout`) },
    flavor: localize(`${MODULE_ID}.bottle-messages.flavor`),
    content,
    whisper: [game.user.id]
  })
}

export default generateBottleMessage
