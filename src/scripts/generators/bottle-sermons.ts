import checkVersion from '../utilities/check-version.ts'
import getDay from '../time/day.ts'
import getTime from '../time/get.ts'
import localize from '../utilities/wrappers/localize.ts'
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
  }
}

const selectRandomSermon = (
  isPremium: boolean = false
): { deity: string, sermon: string } => {
  const { deity, base, historical } = selectRandomElement(stockArray([
    { n: 6, item: sermonDirectory.god },
    { n: 3, item: sermonDirectory.nature }
  ]))

  const sermons = isPremium ? [...base, ...historical] : base
  return { deity, sermon: selectRandomElement(sermons) }
}

const createNote = async (
  at: number,
  path: string[]
): Promise<Item> => {
  const date = getDay(at)
  const title = localize([...path, 'title'])
  const note = localize([...path, 'note'], { date })

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
  const note = await createNote(at, path)

  const w = localize([...path, 'with'])
  const h = localize([...path, 'hint'])
  const a = localize([...path, 'additional'])

  const message: BottleMessage = { contents: [note] }
  if (!w.startsWith(path.join('.'))) message.with = w
  if (!h.startsWith(path.join('.'))) message.hint = h
  if (!a.startsWith(path.join('.'))) message.additional = a

  return message
}

export default generateBottleSermon
