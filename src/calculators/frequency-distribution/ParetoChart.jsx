import { ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

export default function ParetoChart({ table }) {
  const data = table.rows.map((row) => ({
    label: `[${row.lowerLimit};${row.upperLimit})`,
    Fabs: row.freq,
    Fporcacum: Number(row.cumulativePercent.toFixed(1)),
  }))

  return (
    <div className="mt-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 transition-colors">
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">Diagrama de Pareto</p>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
          <XAxis dataKey="label" tick={{ fontSize: 11 }} />
          <YAxis yAxisId="left" label={{ value: 'Frecuencia', angle: -90, position: 'insideLeft', fontSize: 12 }} tick={{ fontSize: 12 }} />
          <YAxis yAxisId="right" orientation="right" domain={[0, 100]} label={{ value: '% acumulado', angle: 90, position: 'insideRight', fontSize: 12 }} tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="Fabs" fill="#3b82f6" name="Frecuencia absoluta" />
          <Line yAxisId="right" type="monotone" dataKey="Fporcacum" stroke="#ef4444" strokeWidth={2} name="% acumulado" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}