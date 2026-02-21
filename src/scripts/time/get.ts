const getTime = (): number => {
  return game?.time?.worldTime ?? 0
}

export default getTime
