import { useState, useMemo } from 'react'
import { BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import { parsePairs, calculateCorrelation, describeCorrelation } from './formula.js'
import ScatterPlot from './ScatterPlot.jsx'
import Card from '../../components/ui/Card.jsx'
import VariableLegend from '../../components/ui/VariableLegend.jsx'

const EXAMPLE = '1,59 68\n1,61 72\n1,79 86\n1,7 88\n1,62 56'

// Redondea sin dejar ceros de más (122.2707 → 122.2707, 1.5000 → 1.5)
const f = (value, decimals = 4) => parseFloat(value.toFixed(decimals))

export default function CorrelationCalculator() {
  const [rawInput, setRawInput] = useState(EXAMPLE)
  const [xName, setXName] = useState('h')
  const [yName, setYName] = useState('P')

  const { pairs, invalidLines } = useMemo(() => parsePairs(rawInput), [rawInput])
  const stats = pairs.length >= 3 ? calculateCorrelation(pairs) : null

  const inputClass =
    'px-3 py-2 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'

  let equation = null
  if (stats && stats.slope !== null) {
    const sign = stats.intercept < 0 ? '-' : '+'
    equation = `y = ${f(stats.slope, 2)}x ${sign} ${Math.abs(f(stats.intercept, 2))}`
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
        Correlación y Dispersión
      </h1>
      <p className="text-slate-500 dark:text-slate-400 mb-8">
        Ingresá pares de valores (x, y) y obtené el coeficiente de correlación, la recta de regresión y el diagrama
      </p>

      {/* Entrada */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 transition-colors">
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
              Nombre de x
            </label>
            <input value={xName} onChange={(e) => setXName(e.target.value)} className={`w-full ${inputClass}`} />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
              Nombre de y
            </label>
            <input value={yName} onChange={(e) => setYName(e.target.value)} className={`w-full ${inputClass}`} />
          </div>
        </div>

        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
          Pares de datos (uno por línea: x y)
        </label>
        <textarea
          value={rawInput}
          onChange={(e) => setRawInput(e.target.value)}
          rows={6}
          placeholder={'Ej:\n1,59 68\n1,61 72'}
          className={`w-full font-mono text-sm ${inputClass}`}
        />
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            {pairs.length} pares detectados {pairs.length < 3 && '(mínimo 3 para calcular)'}
          </p>
          <button onClick={() => setRawInput('')} className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
            Limpiar
          </button>
        </div>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
          Separador entre x e y: espacio, tabulación o ;  ·  Decimales: coma o punto  ·  Podés pegar dos columnas de Excel
        </p>
        {invalidLines.length > 0 && (
          <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">
            Se ignoraron líneas que no tienen exactamente dos números: {invalidLines.join(', ')}
          </p>
        )}
      </div>

      {stats && (
        <>
          {/* Resultado principal */}
          <div className="mt-6 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-xl p-6 transition-colors">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-sm text-blue-700 dark:text-blue-300 font-medium mb-1">Correlación (r)</p>
                <p className="text-4xl font-bold text-blue-900 dark:text-blue-100">
                  {stats.r !== null ? f(stats.r, 4) : '—'}
                </p>
              </div>
              <div>
                <p className="text-sm text-blue-700 dark:text-blue-300 font-medium mb-1">Determinación (R²)</p>
                <p className="text-4xl font-bold text-blue-900 dark:text-blue-100">
                  {stats.r2 !== null ? f(stats.r2, 4) : '—'}
                </p>
              </div>
            </div>
            <p className="text-sm text-blue-600 dark:text-blue-400 text-center mt-4">
              {describeCorrelation(stats.r)}
            </p>
            {equation && (
              <div className="mt-2 text-center text-blue-900 dark:text-blue-100">
                <BlockMath math={equation} />
              </div>
            )}
          </div>

          <ScatterPlot pairs={pairs} stats={stats} xName={xName} yName={yName} />

          {/* Medidas resumen */}
          <div className="mt-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 transition-colors">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">Medidas calculadas</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <Stat label="n (pares)" value={stats.n} />
              <Stat label={`Media de ${xName}`} value={f(stats.meanX)} />
              <Stat label={`Media de ${yName}`} value={f(stats.meanY)} />
              <Stat label="Covarianza" value={f(stats.covariance)} />
              <Stat label="Sxx" value={f(stats.sxx)} />
              <Stat label="Syy" value={f(stats.syy)} />
              <Stat label="Sxy" value={f(stats.sxy)} />
              <Stat label="Pendiente" value={stats.slope !== null ? f(stats.slope) : '—'} />
              <Stat label="Ordenada" value={stats.intercept !== null ? f(stats.intercept) : '—'} />
            </div>
          </div>

          {/* Paso a paso */}
          <div className="mt-6">
            <Card title="Ver el cálculo paso a paso">
              <p className="text-sm">
                Primero se calculan las desviaciones de cada dato respecto de su media y se
                suman sus productos y cuadrados:
              </p>
              <div className="overflow-x-auto max-h-72 overflow-y-auto">
                <table className="w-full text-sm text-right">
                  <thead className="sticky top-0 bg-white dark:bg-slate-800">
                    <tr className="text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                      <th className="py-2">{xName}</th>
                      <th>{yName}</th>
                      <th>{xName} − x̄</th>
                      <th>{yName} − ȳ</th>
                      <th>(x−x̄)²</th>
                      <th>(y−ȳ)²</th>
                      <th>(x−x̄)(y−ȳ)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.rows.map((row, i) => (
                      <tr key={i} className="border-b border-slate-100 dark:border-slate-700/50">
                        <td className="py-1">{f(row.x)}</td>
                        <td>{f(row.y)}</td>
                        <td>{f(row.dx)}</td>
                        <td>{f(row.dy)}</td>
                        <td>{f(row.dx2, 5)}</td>
                        <td>{f(row.dy2)}</td>
                        <td>{f(row.dxdy)}</td>
                      </tr>
                    ))}
                    <tr className="font-semibold text-slate-800 dark:text-slate-100">
                      <td className="py-2">Σ</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>{f(stats.sxx, 5)}</td>
                      <td>{f(stats.syy)}</td>
                      <td>{f(stats.sxy)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {stats.r !== null && (
                <>
                  <p className="text-sm font-medium">Coeficiente de correlación:</p>
                  <BlockMath
                    math={`r = \\frac{S_{xy}}{\\sqrt{S_{xx} \\cdot S_{yy}}} = \\frac{${f(stats.sxy)}}{\\sqrt{${f(stats.sxx, 5)} \\cdot ${f(stats.syy)}}} = ${f(stats.r)}`}
                  />
                  <p className="text-sm font-medium">Recta de regresión:</p>
                  <BlockMath
                    math={`b = \\frac{S_{xy}}{S_{xx}} = \\frac{${f(stats.sxy)}}{${f(stats.sxx, 5)}} = ${f(stats.slope)}`}
                  />
                  <BlockMath
                    math={`a = \\bar{y} - b\\,\\bar{x} = ${f(stats.meanY)} - ${f(stats.slope)} \\cdot ${f(stats.meanX)} = ${f(stats.intercept)}`}
                  />
                  <VariableLegend
                    items={[
                      { symbol: 'S_{xy}', description: 'suma de los productos de las desviaciones de x e y' },
                      { symbol: 'S_{xx}, S_{yy}', description: 'suma de los cuadrados de las desviaciones de x e y' },
                      { symbol: 'b', description: 'pendiente de la recta' },
                      { symbol: 'a', description: 'ordenada al origen' },
                      { symbol: '\\bar{x}, \\bar{y}', description: 'medias de x e y' },
                    ]}
                  />
                </>
              )}
            </Card>
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
      <p className="text-slate-800 dark:text-slate-100 font-semibold">{value}</p>
    </div>
  )
}