// src/calculators/sample-size-proportion/formula.js

// Valores Z de referencia para los niveles de confianza más comunes
// (quedan como documentación / verificación)
export const Z_REFERENCE = {
  90: 1.645,
  95: 1.96,
  99: 2.576,
}

/**
 * Aproximación de la función cuantil de la normal estándar (inversa de la CDF).
 * Algoritmo de Peter Acklam.
 */
function inverseNormalCDF(p) {
  const a = [-3.969683028665376e+01, 2.209460984245205e+02, -2.759285104469687e+02,
             1.383577518672690e+02, -3.066479806614716e+01, 2.506628277459239e+00]
  const b = [-5.447609879822406e+01, 1.615858368580409e+02, -1.556989798598866e+02,
             6.680131188771972e+01, -1.328068155288572e+01]
  const c = [-7.784894002430293e-03, -3.223964580411365e-01, -2.400758277161838e+00,
             -2.549732539343734e+00, 4.374664141464968e+00, 2.938163982698783e+00]
  const d = [7.784695709041462e-03, 3.224671290700398e-01, 2.445134137142996e+00,
             3.754408661907416e+00]

  const pLow = 0.02425
  const pHigh = 1 - pLow

  if (p < pLow) {
    const q = Math.sqrt(-2 * Math.log(p))
    return (((((c[0]*q+c[1])*q+c[2])*q+c[3])*q+c[4])*q+c[5]) /
           ((((d[0]*q+d[1])*q+d[2])*q+d[3])*q+1)
  } else if (p <= pHigh) {
    const q = p - 0.5
    const r = q * q
    return (((((a[0]*r+a[1])*r+a[2])*r+a[3])*r+a[4])*r+a[5]) * q /
           (((((b[0]*r+b[1])*r+b[2])*r+b[3])*r+b[4])*r+1)
  } else {
    const q = Math.sqrt(-2 * Math.log(1 - p))
    return -(((((c[0]*q+c[1])*q+c[2])*q+c[3])*q+c[4])*q+c[5]) /
            ((((d[0]*q+d[1])*q+d[2])*q+d[3])*q+1)
  }
}

/**
 * Calcula el valor Z a partir de un nivel de confianza en %.
 */
export function getZValue(confidenceLevelPercent) {
  const confidence = confidenceLevelPercent / 100
  const p = 1 - (1 - confidence) / 2
  return inverseNormalCDF(p)
}

/**
 * Aplica la corrección de población finita al n calculado.
 * n_ajustado = n / (1 + (n-1)/N)
 */
export function adjustForFinitePopulation(n, populationSize) {
  if (!populationSize || populationSize <= 0) return n
  return n / (1 + (n - 1) / populationSize)
}

/**
 * Función principal: calcula el tamaño de muestra final.
 */
export function calculateSampleSize({ confidenceLevel, marginError, populationSize, expectedProportion = 0.5 }) {
  const Z = getZValue(confidenceLevel)
  const rawN = (Math.pow(Z, 2) * expectedProportion * (1 - expectedProportion)) / Math.pow(marginError, 2)
  const adjustedN = adjustForFinitePopulation(rawN, populationSize)

  return {
    rawN: Math.ceil(rawN),
    adjustedN: Math.ceil(adjustedN),
    zValue: Number(Z.toFixed(3)),
  }
}