/**
 * Calcula un percentil por interpolación lineal (método usado por Excel/NumPy).
 * @param {number[]} sortedData - datos ya ordenados ascendente
 * @param {number} percentile - entre 0 y 1 (ej: 0.25 para Q1)
 */
function calculatePercentile(sortedData, percentile) {
  const n = sortedData.length
  const index = percentile * (n - 1)
  const lowerIndex = Math.floor(index)
  const upperIndex = Math.ceil(index)

  if (lowerIndex === upperIndex) return sortedData[lowerIndex]

  const weight = index - lowerIndex
  return sortedData[lowerIndex] * (1 - weight) + sortedData[upperIndex] * weight
}

/**
 * Calcula las estadísticas completas para un diagrama de caja y bigotes.
 * @param {number[]} rawData - datos sin ordenar
 */
export function calculateBoxPlotStats(rawData) {
  const data = [...rawData].sort((a, b) => a - b)
  const n = data.length

  const q1 = calculatePercentile(data, 0.25)
  const median = calculatePercentile(data, 0.5)
  const q3 = calculatePercentile(data, 0.75)
  const iqr = q3 - q1

  // Límites teóricos para detectar outliers (regla de Tukey: 1.5 * IQR)
  const lowerFence = q1 - 1.5 * iqr
  const upperFence = q3 + 1.5 * iqr

  // Los bigotes van hasta el dato real más extremo QUE ESTÉ dentro de los límites
  // (no hasta el límite teórico en sí — es un error común)
  const inRangeData = data.filter((v) => v >= lowerFence && v <= upperFence)
  const lowerWhisker = inRangeData.length ? inRangeData[0] : data[0]
  const upperWhisker = inRangeData.length ? inRangeData[inRangeData.length - 1] : data[n - 1]

  const outliers = data.filter((v) => v < lowerFence || v > upperFence)

  return {
    n,
    min: data[0],
    max: data[n - 1],
    q1,
    median,
    q3,
    iqr,
    lowerFence,
    upperFence,
    lowerWhisker,
    upperWhisker,
    outliers,
    sortedData: data,
  }
}