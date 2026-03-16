import type { DoomedSituation } from '../types.ts'

const pastConfessions = ['murderer', 'sorcerer', 'adulterer']
const confessions = ['traitor', ...pastConfessions]
const madness = ['cult', 'faustian', 'paranoia']
const scavengers = ['shadows', 'carrion', 'sharks', 'vultures']
const uncontrollable = ['mutiny', ...pastConfessions, ...madness, ...scavengers]
const all = ['mutiny', ...confessions, ...madness, ...scavengers]

const situations: Record<string, DoomedSituation> = {
  davy: {
    tag: 'davy',
    complications: uncontrollable
  },
  kraken: {
    tag: 'kraken',
    complications: uncontrollable
  },
  whale: {
    tag: 'whale',
    complications: uncontrollable
  },
  orcas: {
    tag: 'orcas',
    complications: uncontrollable
  },
  scourge: {
    tag: 'scourge',
    complications: uncontrollable
  },
  ghosts: {
    tag: 'ghosts',
    complications: uncontrollable
  },
  deep: {
    tag: 'deep',
    complications: uncontrollable
  },
  metamorphosis: {
    tag: 'metamorphosis',
    complications: []
  },
  haunted: {
    tag: 'haunted',
    complications: []
  },
  disease: {
    tag: 'disease',
    complications: ['traitor', ...scavengers]
  },
  cannibalism: {
    tag: 'cannibalism',
    complications: all
  },
  sacrifice: {
    tag: 'sacrifice',
    complications: all
  },
  drinking: {
    tag: 'drinking',
    complications: all
  },
  meat: {
    tag: 'meat',
    complications: all
  },
  lost: {
    tag: 'lost',
    complications: all
  },
  reef: {
    tag: 'reef',
    complications: all
  },
  infestation: {
    tag: 'infestation',
    complications: all
  },
  battle: {
    tag: 'battle',
    complications: all
  },
  storm: {
    tag: 'storm',
    complications: all
  }
}

export default situations
