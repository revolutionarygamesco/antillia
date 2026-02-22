const clone = <T extends object>(orig: T): T => {
  if (typeof structuredClone === 'function') return structuredClone(orig)
  if (typeof foundry?.utils?.deepClone) return foundry.utils.deepClone(orig)
  return orig
}

export default clone
