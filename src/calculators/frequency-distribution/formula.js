/**
 * Calcula la tabla de distribución de frecuencias completa
 * a partir de intervalos con su frecuencia absoluta.
 *
 * @param {Array<{lowerLimit: number, upperLimit: number, freq: number}>} intervals
 */
export function calculateFrequencyTable(intervals) {
  const total = intervals.reduce((sum, row) => sum + row.freq, 0)

  let cumulativeFreq = 0
  let cumulativeRelative = 0

  const rows = intervals.map((row) => {
    // Si el usuario cargó un Xc manual, se respeta; si no, se calcula el punto medio
    const classMark = row.xc !== undefined && row.xc !== '' && row.xc !== null
      ? Number(row.xc)
      : (row.lowerLimit + row.upperLimit) / 2

    cumulativeFreq += row.freq
    const relative = total > 0 ? row.freq / total : 0
    cumulativeRelative += relative

    return {
      lowerLimit: row.lowerLimit,
      upperLimit: row.upperLimit,
      classMark,
      freq: row.freq,
      cumulativeFreq,
      relative,
      cumulativeRelative,
      percent: relative * 100,
      cumulativePercent: cumulativeRelative * 100,
    }
  })

  return { rows, total }
}

/**
 * Estadísticas descriptivas para datos agrupados en intervalos,
 * usadas más adelante para el diagrama de caja y bigotes.
 * Usa la fórmula de interpolación para cuartiles en datos agrupados.
 *
 * @param {object} table - resultado de calculateFrequencyTable
 * @param {number} percentile - entre 0 y 1 (ej 0.25 para Q1)
 */
export function calculateGroupedPercentile(table, percentile) {
  const { rows, total } = table
  const targetCount = percentile * total

  // Encontrar el intervalo donde cae el percentil buscado
  const intervalIndex = rows.findIndex((row) => row.cumulativeFreq >= targetCount)
  if (intervalIndex === -1) return rows[rows.length - 1].upperLimit

  const row = rows[intervalIndex]
  const prevCumulative = intervalIndex > 0 ? rows[intervalIndex - 1].cumulativeFreq : 0
  const intervalWidth = row.upperLimit - row.lowerLimit

  // Fórmula de interpolación lineal para percentiles agrupados
  return row.lowerLimit + ((targetCount - prevCumulative) / row.freq) * intervalWidth
}

/**
 * Calcula los 5 valores clave (min, Q1, mediana, Q3, max) para
 * datos agrupados en intervalos, usados en el diagrama de caja y bigotes.
 */
export function calculateGroupedBoxPlotStats(table) {
  return {
    min: table.rows[0].lowerLimit,
    max: table.rows[table.rows.length - 1].upperLimit,
    q1: calculateGroupedPercentile(table, 0.25),
    median: calculateGroupedPercentile(table, 0.5),
    q3: calculateGroupedPercentile(table, 0.75),
  }
}