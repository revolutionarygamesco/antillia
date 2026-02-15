import selectRandomElement from '../../../random/el.ts'

export const upgrades = ['tunnels', 'expansion', 'armor', 'undead']

const selectFortUpgrade = () => selectRandomElement(upgrades)

export default selectFortUpgrade
