const parseHTML = (
  html: string
): Pick<Document, 'querySelector'> => {
  return new DOMParser().parseFromString(html, 'text/html')
}

export default parseHTML
