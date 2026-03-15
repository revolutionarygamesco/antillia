import getGivenName from './name.given.ts'

describe('getGivenName', () => {
  it.each([
    ['Mateo', 'Mateo Lopez-Jimenez y Garcia'],
    ['John', 'John Hughes'],
    ['Martín', 'Martín Jimenez y Delgado-Muñoz'],
    ['Anthony', 'Anthony Brown'],
    ['Cristina', 'Cristina Torres y Torres-Vazquez'],
    ['Catherine', 'Catherine Fontaine'],
    ['Luis', 'Luis Leon y Blanco'],
    ['Costanza', 'Costanza Ortiz-Rodriguez y Vega'],
    ['Andrew', 'Andrew Davies'],
    ['Hester', 'Hester Baker'],
    ['Peig', 'Peig Ó Cuinn (Maggie Quinn)'],
    ['Ángeles', 'María de los Ángeles Lopez-Gonzalez y Sanchez'],
    ['Pila', 'María del Pila Lopez-Gonzalez y Sanchez'],
    ['Luz', 'María de la Luz Lopez-Gonzalez y Sanchez'],
    ['Carmen', 'María del Carmen Lopez-Gonzalez y Sanchez'],
    ['Soledad', 'María de la Soledad Lopez-Gonzalez y Sanchez'],
    ['Dolores', 'María de los Dolores Lopez-Gonzalez y Sanchez'],
    ['Mercedes', 'María de las Mercedes Lopez-Gonzalez y Sanchez'],
    ['Consolación', 'María de la Consolación Lopez-Gonzalez y Sanchez'],
    ['Concepción', 'María de la Concepción Lopez-Gonzalez y Sanchez'],
    ['Asunción', 'María de la Asunción Lopez-Gonzalez y Sanchez'],
    ['Remedios', 'María de los Remedios Lopez-Gonzalez y Sanchez'],
    ['Paz', 'María de la Paz Lopez-Gonzalez y Sanchez'],
    ['Esperanza', 'María de la Esperanza Lopez-Gonzalez y Sanchez'],
    ['Nieves', 'María de las Nieves Lopez-Gonzalez y Sanchez'],
    ['Rosario', 'María del Rosario Lopez-Gonzalez y Sanchez'],
    ['Milagros', 'María de los Milagros Lopez-Gonzalez y Sanchez'],
    ['Desamparados', 'María de los Desamparados Lopez-Gonzalez y Sanchez'],
    ['Victoria', 'María de la Victoria Lopez-Gonzalez y Sanchez'],
    ['Natividad', 'María de la Natividad Lopez-Gonzalez y Sanchez'],
    ['Visitación', 'María de la Visitación Lopez-Gonzalez y Sanchez'],
    ['Maria', 'Maria Lopez-Gonzalez y Sanchez'],
    ['Costanza', 'Costanza Ortiz-Rodriguez y Vega'],
    ['Jean-Baptiste', 'Jean-Baptiste Aubert']
  ] as Array<[string, string]>)('gets %s from %s', (expected, full) => {
    expect(getGivenName(full)).toBe(expected)
  })
})
