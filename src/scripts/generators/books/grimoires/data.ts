import type {GrimoireSchool, GrimoireSchoolData} from './types.ts'
import { UUIDS } from '../../../settings.ts'

const rituals: Record<string, GrimoireSchoolData> = {
  transmutation: {
    school: 'transmutation',
    descriptions: ['stained', 'salt', 'hide', 'dusty', 'leather'],
    categories: [
      {
        name: 'Breathing Underwater',
        spells: [
          { tag: 'call', uuid: UUIDS.ARCANE_CALL },
          { tag: 'thalassomancy', uuid: UUIDS.ARCANE_THALASSOMANCY }
        ]
      },
      {
        name: 'Buff/Debuff',
        spells: [
          { tag: 'curse', uuid: UUIDS.ARCANE_CURSE },
          { tag: 'mermaid', uuid: UUIDS.ARCANE_MERMAID }
        ]
      }
    ]
  },
  evocation: {
    school: 'evocation',
    descriptions: ['annotated', 'dense', 'ponderous', 'arcane', 'recondite'],
    categories: [
      {
        name: 'Time Magic',
        spells: [
          { tag: 'divination', uuid: UUIDS.ARCANE_DIVINATION },
          { tag: 'time', uuid: UUIDS.ARCANE_TIME }
        ]
      },
      {
        name: 'Nature Magic',
        spells: [
          { tag: 'fauna', uuid: UUIDS.ARCANE_FAUNA },
          { tag: 'weathercraft', uuid: UUIDS.ARCANE_WEATHERCRAFT }
        ]
      }
    ]
  },
  conjuration: {
    school: 'conjuration',
    descriptions: ['unnerving', 'unsettling', 'otherworldly', 'alien', 'eldritch'],
    categories: [
      {
        name: 'Eldritch Magic',
        spells: [
          { tag: 'eldritch', uuid: UUIDS.ARCANE_ELDRITCH },
          { tag: 'kraken', uuid: UUIDS.ARCANE_KRAKEN }
        ]
      },
      {
        name: 'Angelic Magic',
        spells: [
          { tag: 'light', uuid: UUIDS.ARCANE_LIGHT },
          { tag: 'ward', uuid: UUIDS.ARCANE_WARD }
        ]
      }
    ]
  },
  necromancy: {
    school: 'necromancy',
    descriptions: ['black', 'ghastly', 'grim', 'dour', 'bleak'],
    categories: [
      {
        name: 'Resurrection',
        spells: [
          { tag: 'grave', uuid: UUIDS.ARCANE_GRAVE },
          { tag: 'return', uuid: UUIDS.ARCANE_RETURN }
        ]
      },
      {
        name: 'Death Magic',
        spells: [
          { tag: 'ferryman', uuid: UUIDS.ARCANE_FERRYMAN },
          { tag: 'spot', uuid: UUIDS.ARCANE_SPOT }
        ]
      }
    ]
  },
  enchantment: {
    school: 'enchantment',
    descriptions: ['beguiling', 'devious', 'artful', 'treacherous', 'cunning'],
    categories: [
      {
        name: 'Influence Magic',
        spells: [
          { tag: 'mists', uuid: UUIDS.ARCANE_MISTS },
          { tag: 'hex', uuid: UUIDS.ARCANE_HEX }
        ]
      },
      {
        name: 'Domination Nagic',
        spells: [
          { tag: 'manacles', uuid: UUIDS.ARCANE_MANACLES },
          { tag: 'delusions', uuid: UUIDS.ARCANE_DELUSIONS }
        ]
      }
    ]
  }
}

export const grimoireIcons: Record<GrimoireSchool, string> = {
  transmutation: 'icons/sundries/books/book-eye-purple.webp',
  evocation: 'icons/sundries/books/book-embossed-spiral-purple-white.webp',
  conjuration: 'icons/sundries/books/book-symbol-yellow-grey.webp',
  necromancy: 'icons/sundries/books/book-face-black.webp',
  enchantment: 'icons/sundries/books/book-purple-gem.webp'
}

export default rituals
