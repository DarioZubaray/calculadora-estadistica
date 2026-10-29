import { useState, useMemo } from 'react'
import { parseSample, countFrequencies } from './formula.js'

const EXAMPLE =
  '6, 2, 2, 2, 2, 1, 3, 4, 6, 6, 2, 1, 2, 5, 4, 4, 5, 0, 3, 6, 0, 6, 1, 5, 2, 5, 3, 2, 0, 5, 2, 6, 3, 4, 2, 5, 1, 4, 5, 4, 3, 6, 1, 5, 6, 0, 2, 4, 0, 4, 6, 5, 0, 6, 1, 1, 1, 2, 5, 0, 0, 4'

export default function SampleCounterCalculator() {
  const [rawInput, setRawInput] = useState(EXAMPLE)

  const { values, ignored } = useMemo(() => parseSample(rawInput), [rawInput])
  const frequencies = useMemo(() => countFrequencies(values), [values])
  const maxCount = Math.max(0, ...frequencies.map((f) => f.count))

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
        Conteo de Muestra
      </h1>
      <p className="text-slate-500 dark:text-slate-400 mb-8">
        Pegá tus datos con cualquier separador y mirá cuántas veces aparece cada valor
      </p>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 transition-colors">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
          Muestra
        </label>
        <textarea
          value={rawInput}
          onChange={(e) => setRawInput(e.target.value)}
          rows={4}
          placeholder="Ej: 6, 2, 2, 5, 1  (o separados por espacios, punto y coma, saltos de línea...)"
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 font-mono text-sm"
        />
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            {values.length} valores detectados · {frequencies.length} distintos
          </p>
          <button
            onClick={() => setRawInput('')}
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
          >
            Limpiar
          </button>
        </div>
        {ignored.length > 0 && (
          <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">
            Se ignoró texto que no es numérico: {[...new Set(ignored)].slice(0, 5).join(', ')}
          </p>
        )}
      </div>

      {frequencies.length > 0 && (
        <>
          {/* Gráfico de barras horizontales (equivalente al print de Python) */}
          <div className="mt-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 transition-colors">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">
              Gráfico de frecuencias
            </p>
            <div className="space-y-2">
              {frequencies.map(({ value, count }) => (
                <div key={value} className="flex items-center gap-3">
                  <span className="w-10 text-right font-mono text-sm text-slate-700 dark:text-slate-200">
                    {value}
                  </span>
                  <div className="flex-1 flex items-center gap-2 border-l border-slate-300 dark:border-slate-600 pl-2">
                    <div
                      className="h-6 rounded-r bg-blue-500 dark:bg-blue-400 transition-all duration-300"
                      style={{ width: `${(count / maxCount) * 90}%`, minWidth: '4px' }}
                    />
                    <span className="font-mono text-sm text-slate-600 dark:text-slate-300">
                      {count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tabla de apoyo */}
          <div className="mt-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 transition-colors">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">Tabla</p>
            <table className="w-full text-sm text-right">
              <thead>
                <tr className="text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                  <th className="py-2 text-left">Valor</th>
                  <th>Frecuencia</th>
                  <th>Porcentaje</th>
                </tr>
              </thead>
              <tbody className="text-slate-700 dark:text-slate-200">
                {frequencies.map(({ value, count, percent }) => (
                  <tr key={value} className="border-b border-slate-100 dark:border-slate-700/50">
                    <td className="py-2 text-left">{value}</td>
                    <td>{count}</td>
                    <td>{percent.toFixed(1)}%</td>
                  </tr>
                ))}
                <tr className="font-semibold text-slate-800 dark:text-slate-100">
                  <td className="py-2 text-left">Total</td>
                  <td>{values.length}</td>
                  <td>100%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}
