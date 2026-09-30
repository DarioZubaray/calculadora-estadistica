import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceDot } from 'recharts'
import { generateSensitivityData } from './formula.js'

export default function SensitivityChart({ confidenceLevel, populationSize, expectedProportion, currentMarginError, currentN }) {
  const data = generateSensitivityData({ confidenceLevel, populationSize, expectedProportion })

  return (
    <div className="mt-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 transition-colors">
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
        Sensibilidad: tamaño de muestra según margen de error
      </p>
      <p className="text-xs text-slate-400 dark:text-slate-500 mb-4">
        Con nivel de confianza y proporción esperada fijos en los valores actuales
      </p>

      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
          <XAxis
            dataKey="marginError"
            tickFormatter={(v) => `${v}%`}
            label={{ value: 'Margen de error', position: 'bottom', offset: -5, fontSize: 12 }}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            label={{ value: 'n', angle: -90, position: 'insideLeft', fontSize: 12 }}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            formatter={(value) => [Math.round(value), 'Tamaño de muestra']}
            labelFormatter={(label) => `Margen de error: ${label}%`}
          />
          <Line type="monotone" dataKey="n" stroke="#3b82f6" strokeWidth={2} dot={false} />
          <ReferenceDot x={currentMarginError} y={currentN} r={5} fill="#ef4444" stroke="white" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>

      <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
        El punto rojo marca tu configuración actual ({currentMarginError}% de margen → {currentN} personas)
      </p>
    </div>
  )
}