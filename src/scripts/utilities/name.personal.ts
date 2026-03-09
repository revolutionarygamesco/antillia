const generatePersonalName = async (
  nationality: string = 'English',
  gender: 'Masculine' | 'Feminine' = 'Masculine'
): Promise<string> => {
  const namer = game?.modules?.get('revolutionary-piratenames')?.api
  return namer?.generateName
    ? await namer.generateName(nationality, gender)
    : 'John Doe'
}

export default generatePersonalName
