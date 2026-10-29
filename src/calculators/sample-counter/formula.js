/**
 * Extrae todos los números de un texto, sin importar el delimitador.
 * - Acepta enteros y decimales con punto (2.5)
 * - Acepta negativos (-3), pero "1-2-3" se lee como 1, 2, 3
 *   (el guion pegado a un dígito anterior es separador, no signo)
 * - La coma es siempre separador
 */
export function parseSample(text) {
  const numberRegex = /(?<![\d.])-?\d+(?:\.\d+)?/g
  const matches = text.match(numberRegex) ?? []
  const values = matches.map(Number)

  // Detectar texto "raro" (letras) que fue ignorado, para avisarle al usuario
  const leftover = text.replace(numberRegex, ' ')
  const ignored = leftover.match(/[A-Za-zÁ-ÿ]+/g) ?? []

  return { values, ignored }
}

/**
 * Cuenta cuántas veces aparece cada valor distinto.
 * Devuelve un array ordenado de menor a mayor valor.
 */
export function countFrequencies(values) {
  const counts = new Map()
  for (const value of values) {
    counts.set(value, (counts.get(value) ?? 0) + 1)
  }

  const total = values.length
  return [...counts.entries()]
    .sort(([a], [b]) => a - b)
    .map(([value, count]) => ({
      value,
      count,
      percent: total > 0 ? (count / total) * 100 : 0,
    }))
}
