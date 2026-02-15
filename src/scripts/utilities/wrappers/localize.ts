const localize = (
  key: string | string[],
  options?: Record<string, any>
) => {
  const k = typeof key === 'string' ? key : key.join('.')
  return game?.i18n?.format?.(k, options) ?? key
}

export default localize
