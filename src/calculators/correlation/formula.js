/**
 * Convierte texto en pares (x, y). Un par por línea.
 * Separador entre x e y: espacio, tabulación o punto y coma.
 * Decimales: coma o punto.
 */
export function parsePairs(text) {
  const pairs = []
  const invalidLines = []

  text.split(/\r?\n/).forEach((line, index) => {
    const trimmed = line.trim()
    if (!trimmed) return

    const tokens = trimmed
      .split(/[\t; ]+/)
      .filter(Boolean)
      .map((t) => t.replace(/^,+|,+$/g, ''))

    const numbers = tokens.map((t) => (t === '' ? NaN : Number(t.replace(',', '.'))))

    if (tokens.length !== 2 || numbers.some(Number.isNaN)) {
      invalidLines.push(index + 1)
      return
    }
    pairs.push({ x: numbers[0], y: numbers[1] })
  })

  return { pairs, invalidLines }
}

const sum = (arr) => arr.reduce((acc, v) => acc + v, 0)

/**
 * Calcula todo lo necesario para correlación y regresión lineal simple.
 *
 * Sxx = Σ(x - x̄)²    Syy = Σ(y - ȳ)²    Sxy = Σ(x - x̄)(y - ȳ)
 * r = Sxy / √(Sxx · Syy)
 * pendiente b = Sxy / Sxx      ordenada a = ȳ - b·x̄
 */
export function calculateCorrelation(pairs) {
  const n = pairs.length
  const meanX = sum(pairs.map((p) => p.x)) / n
  const meanY = sum(pairs.map((p) => p.y)) / n

  const rows = pairs.map(({ x, y }) => {
    const dx = x - meanX
    const dy = y - meanY
    return { x, y, dx, dy, dx2: dx * dx, dy2: dy * dy, dxdy: dx * dy }
  })

  const sxx = sum(rows.map((r) => r.dx2))
  const syy = sum(rows.map((r) => r.dy2))
  const sxy = sum(rows.map((r) => r.dxdy))

  const covariance = sxy / (n - 1)
  const slope = sxx > 0 ? sxy / sxx : null
  const intercept = slope !== null ? meanY - slope * meanX : null

  let r = sxx > 0 && syy > 0 ? sxy / Math.sqrt(sxx * syy) : null
  if (r !== null) r = Math.max(-1, Math.min(1, r)) // evita 1.0000000002 por redondeo
  const r2 = r !== null ? r * r : null

  return { n, meanX, meanY, rows, sxx, syy, sxy, covariance, slope, intercept, r, r2 }
}

/**
 * Descripción cualitativa de r (convención habitual, varía según el autor).
 */
export function describeCorrelation(r) {
  if (r === null) return 'No se puede calcular (una de las variables no varía)'
  const abs = Math.abs(r)
  const direction = r > 0 ? 'positiva' : r < 0 ? 'negativa' : ''
  if (abs === 0) return 'Sin correlación lineal'
  if (abs < 0.3) return `Correlación ${direction} débil`
  if (abs < 0.7) return `Correlación ${direction} moderada`
  if (abs < 1) return `Correlación ${direction} fuerte`
  return `Correlación ${direction} perfecta`
}