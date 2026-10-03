import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

export default function HistogramChart({ table }) {
  const data = table.rows.map((row) => ({
    label: `[${row.lowerLimit};${row.upperLimit})`,
    xc: row.classMark,
    Fabs: row.freq,
  }))

  return (
    <div className="mt-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 transition-colors">
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Histograma</p>
      <p className="text-xs text-slate-400 dark:text-slate-500 mb-4">
        Cada barra representa un intervalo; a diferencia de un gráfico de barras, no hay espacio entre ellas porque la variable es continua.
      </p>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }} barCategoryGap={0}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
          <XAxis dataKey="label" tick={{ fontSize: 11 }} />
          <YAxis label={{ value: 'Frecuencia', angle: -90, position: 'insideLeft', fontSize: 12 }} tick={{ fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey="Fabs" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}