import checkVersion from '../utilities/check-version.ts'
import fromUuid from '../utilities/wrappers/from-uuid.ts'
import getDay from '../time/day.ts'
import getTime from '../time/get.ts'
import localize from '../utilities/wrappers/localize.ts'
import makeLink from '../utilities/make-link.ts'
import stockArray from '../random/stock.ts'
import selectRandomElement from '../random/el.ts'
import { MODULE_ID, UUIDS } from '../settings.ts'

const prefix = [MODULE_ID, 'bottle-sermons']
const sermonDirectory: Record<string, { deity: string, base: string[], historical: string[] }> = {
  god: {
    deity: 'god',
    base: ['simple', 'rum', 'enemy', 'babylon'],
    historical: ['slavery', 'cain']
  },
  nature: {
    deity: 'nature',
    base: ['gospel', 'lilies', 'green', 'ribbon'],
    historical: ['eden', 'savage']
  },
  gods: {
    deity: 'gods',
    base: ['old', 'neptune', 'thor', 'odin'],
    historical: ['ezili-dantor', 'guabancex']
  },
  chaos: {
    deity: 'chaos',
    base: ['folly', 'hurricane', 'dice', 'ship'],
    historical: ['eustasius', 'primordial']
  },
  deep: {
    deity: 'deep',
    base: ['call', 'song', 'baptism', 'sirens'],
    historical: ['bones', 'nautilus']
  },
  dark: {
    deity: 'dark',
    base: ['wolves', 'sins', 'book', 'armada'],
    historical: ['rebels', 'god']
  },
  church: {
    deity: 'church',
    base: ['heresy', 'elmo', 'rosary', 'judgement'],
    historical: ['nations', 'charitatis'],
  }
}

const isSermon = (
  path: string[],
  deity: string,
  sermon: string
): boolean => {
  const key = path.join('.')
  const test = `${deity}.${sermon}`
  return key.endsWith(test)
}

const selectRandomSermon = (
  isPremium: boolean = false
): { deity: string, sermon: string } => {
  const { deity, base, historical } = selectRandomElement(stockArray([
    //{ n: 6, item: sermonDirectory.god },
    //{ n: 3, item: sermonDirectory.nature },
    // { n: 1, item: sermonDirectory.gods },
    // { n: 1, item: sermonDirectory.chaos },
    // { n: 1, item: sermonDirectory.deep },
    // { n: 1, item: sermonDirectory.dark },
    { n: 6, item: sermonDirectory.church }
  ]))

  const sermons = isPremium ? [...base, ...historical] : base
  return { deity, sermon: selectRandomElement(sermons) }
}

const createNote = async (
  path: string[],
  context: Record<string, string>
): Promise<Item> => {
  const title = localize([...path, 'title'], context)
  const note = localize([...path, 'note'], context)

  return await foundry.documents.Item.create({
    name: title,
    type: 'misc',
    img: 'icons/sundries/documents/paper-plain-white.webp',
    folder: UUIDS.PROPAGANDA,
    system: {
      description: note,
      value: 0,
      carryWeight: 0
    },
    ownership: { default: 0 }
  })
}

const generateBottleSermon = async (): Promise<BottleMessage> => {
  const at = getTime()
  const { premium } = await checkVersion()
  const { deity, sermon } = selectRandomSermon(premium)
  const path = [...prefix, deity, sermon]
  const context: Record<string, string> = { date: getDay(at) }
  const message: BottleMessage = { contents: [] }

  if (isSermon(path, 'gods', 'thor')) {
    const name = localize([...path, 'mjolnir'])
    const uuid = UUIDS.MJOLNIR
    context.mjolnir = makeLink({ name, uuid  })
    message.contents.push(await fromUuid(uuid))
  }

  if (isSermon(path, 'gods', 'ezili-dantor')) {
    const name = localize([...path, 'tobacco'])
    const uuid = UUIDS.TOBACCO
    context.tobacco = makeLink({ name, uuid  })
    message.contents.push(await fromUuid(uuid))
  }

  if (isSermon(path, 'chaos', 'dice')) {
    const name = localize([...path, 'dice'])
    const uuid = UUIDS.DICE
    context.dice = makeLink({ name, uuid  })
    message.contents.push(await fromUuid(uuid))
  }

  if (isSermon(path, 'chaos', 'hurricane')) {
    const name = localize([...path, 'handout'])
    const uuid = UUIDS.JOURNAL_HURRICANE
    context.handout = makeLink({ name, uuid  })
  }

  if (isSermon(path, 'chaos', 'eustasius')) {
    const name = localize([...path, 'eustasius'])
    const uuid = UUIDS.JOURNAL_SINT_EUSTASIUS
    context.eustasius = makeLink({ name, uuid  })
  }

  if (isSermon(path, 'church', 'rosary')) {
    const name = localize([...path, 'rosary'])
    const uuid = UUIDS.ROSARY
    context.eustasius = makeLink({ name, uuid  })
  }

  if (isSermon(path, 'church', 'rosary')) {
    const name = localize([...path, 'rosary'])
    const uuid = UUIDS.ROSARY
    context.rosary = makeLink({ name, uuid  })
    message.contents.push(await fromUuid(uuid))

    const lang = selectRandomElement(stockArray([
      { n: 3, item: 'spanish' },
      { n: 2, item: 'french' },
      { n: 1, item: 'irish' }
    ]))
    context.lang = localize([...path, 'languages', lang])
  }

  if (isSermon(path, 'church', 'charitatis')) {
    const name = localize([...path, 'cobre'])
    const uuid = UUIDS.JOURNAL_EL_COBRE
    context.cobre = makeLink({ name, uuid  })
  }

  const note = await createNote(path, context)
  message.contents = [note, ...message.contents]

  const w = localize([...path, 'with'], context)
  const h = localize([...path, 'hint'], context)
  const a = localize([...path, 'additional'], context)
  const d = localize([...path, 'description'], context)

  if (!w.startsWith(path.join('.'))) message.with = w
  if (!h.startsWith(path.join('.'))) message.hint = h
  if (!a.startsWith(path.join('.'))) message.additional = a
  if (!d.startsWith(path.join('.'))) message.description = d

  return message
}

export default generateBottleSermon
