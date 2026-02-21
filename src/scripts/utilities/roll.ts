const roll = async (expr: string): Promise<number> => {
  if (typeof Roll === 'undefined') return 0
  const r = new Roll(expr)
  await r.evaluate()
  return r.result
}

export default roll
