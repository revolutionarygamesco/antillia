const getId = (uuid: string): string => {
  const elements = uuid.split('.')
  return elements.pop() ?? uuid
}

export default getId
