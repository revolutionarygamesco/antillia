const parseHTML = (
  html: string
): Pick<Document, 'querySelector' | 'querySelectorAll'> => {
  return new DOMParser().parseFromString(html, 'text/html')
}

export default parseHTML
