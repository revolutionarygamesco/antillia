import generateIntelligence from './generate.ts'

const generateIntelligenceBottleMessage = async (): Promise<BottleMessage> => {
  const encrypted = await generateIntelligence()
  return { contents: [encrypted] }
}

export default generateIntelligenceBottleMessage
