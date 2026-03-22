import makeGuineaman from './make.ts'

describe('makeGuineaman', () => {
  let established: Record<string, any> = {}

  beforeEach(() => {
    established = {}
  })

  it('sets the type to frigate', () => {
    makeGuineaman(established)
    expect(established.type).toBe('Frigate')
  })

  it('changes the type to frigate', () => {
    established.type = 'Sloop'
    makeGuineaman(established)
    expect(established.type).toBe('Frigate')
  })

  it('often sets the upgrades to sails', () => {
    makeGuineaman(established)
    const valid = ['', 'sails']
    expect(valid).toContain(established.upgrades.join(' '))
  })

  it('often adds sails to upgrades', () => {
    established.upgrades = ['armored']
    makeGuineaman(established)
    const valid = ['armored', 'armored sails']
    expect(valid).toContain(established.upgrades.join(' '))
  })

  it('will set nationality to British, French, or Dutch', () => {
    makeGuineaman(established)
    const valid = ['British', 'French', 'Dutch']
    expect(valid).toContain(established.nationality)
  })

  it('will change nationality to British, French, or Dutch', () => {
    established.nationality = 'Spanish'
    makeGuineaman(established)
    const valid = ['British', 'French', 'Dutch']
    expect(valid).toContain(established.nationality)
  })
})
