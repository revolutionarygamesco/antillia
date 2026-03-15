const getGivenName = (full: string): string => {
  const maria = full.match(/^María (de los|del|de la|de los|de las) (.*?) /)
  if (maria) return maria[2]

  const pieces = full.split(' ')
  return pieces[0]
}

export default getGivenName
