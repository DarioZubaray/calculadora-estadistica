import { useState, useMemo } from 'react'
import { calculateBoxPlotStats } from './formula.js'
import BoxPlotChart from './BoxPlotChart.jsx'
import VariableLegend from '../../components/ui/VariableLegend.jsx'

export default function BoxPlotCalculator() {
  const [rawInput, setRawInput] = useState('12, 15, 14, 10, 18, 22, 14, 13, 16, 45')

  const data = useMemo(() => {
    return rawInput
      .split(/[,\s]+/)
      .map((v) => parseFloat(v))
      .filter((v) => !isNaN(v))
  }, [rawInput])

  const stats = data.length >= 4 ? calculateBoxPlotStats(data) : null

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
        Diagrama de Caja y Bigotes
      </h1>
      <p className="text-slate-500 dark:text-slate-400 mb-8">
        Ingresá tus datos separados por coma o espacio
      </p>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 transition-colors">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
          Datos
        </label>
        <textarea
          value={rawInput}
          onChange={(e) => setRawInput(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 font-mono text-sm"
        />
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
          {data.length} valores detectados {data.length < 4 && '(mínimo 4 para calcular)'}
        </p>
      </div>

      {stats && (
        <>
          <div className="mt-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 transition-colors">
            <BoxPlotChart stats={stats} />
            <p className="text-xs text-slate-400 dark:text-slate-500 text-center mt-2">
              * bigotes: dato real más extremo dentro de 1.5×IQR (no el límite teórico)
            </p>
          </div>

          <div className="mt-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 transition-colors">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">Estadísticas</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
              <Stat label="Mínimo" value={stats.min} />
              <Stat label="Q1" value={stats.q1} />
              <Stat label="Mediana" value={stats.median} />
              <Stat label="Q3" value={stats.q3} />
              <Stat label="Máximo" value={stats.max} />
              <Stat label="IQR" value={stats.iqr} />
            </div>
            <VariableLegend
              items={[
                { symbol: 'Q1, Q3', description: 'primer y tercer cuartil (25% y 75% de los datos)' },
                { symbol: 'IQR', description: 'rango intercuartílico, Q3 − Q1' },
              ]}
            />
            {stats.outliers.length > 0 && (
              <p className="text-sm text-red-600 dark:text-red-400 mt-4">
                Outliers detectados: {stats.outliers.join(', ')}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div>
      <p className="text-slate-400 dark:text-slate-500 text-xs">{label}</p>
      <p className="text-slate-800 dark:text-slate-100 font-semibold">{value.toFixed(2)}</p>
    </div>
  )
}