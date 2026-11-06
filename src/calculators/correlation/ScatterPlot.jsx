import {
  ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis,
  CartesianGrid, Tooltip, ReferenceLine,
} from 'recharts'

export default function ScatterPlot({ pairs, stats, xName, yName }) {
  const xs = pairs.map((p) => p.x)
  const ys = pairs.map((p) => p.y)
  const minX = Math.min(...xs)
  const maxX = Math.max(...xs)
  const minY = Math.min(...ys)
  const maxY = Math.max(...ys)

  // Margen para que los puntos no queden pegados al borde
  const padX = (maxX - minX) * 0.1 || 1
  const padY = (maxY - minY) * 0.1 || 1

  const hasLine = stats.slope !== null
  const lineSegment = hasLine
    ? [
        { x: minX, y: stats.slope * minX + stats.intercept },
        { x: maxX, y: stats.slope * maxX + stats.intercept },
      ]
    : null

  return (
    <div className="mt-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 transition-colors">
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
        Diagrama de dispersión
      </p>
      <p className="text-xs text-slate-400 dark:text-slate-500 mb-4">
        Cada punto es un par ({xName}, {yName}); la línea roja es la recta de regresión.
      </p>

      <ResponsiveContainer width="100%" height={320}>
        <ScatterChart margin={{ top: 10, right: 20, left: 0, bottom: 25 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
          <XAxis
            type="number"
            dataKey="x"
            name={xName}
            domain={[minX - padX, maxX + padX]}
            tickFormatter={(v) => Number(v.toFixed(2))}
            tick={{ fontSize: 12 }}
            label={{ value: xName, position: 'bottom', offset: 5, fontSize: 12 }}
          />
          <YAxis
            type="number"
            dataKey="y"
            name={yName}
            domain={[minY - padY, maxY + padY]}
            tickFormatter={(v) => Number(v.toFixed(2))}
            tick={{ fontSize: 12 }}
            label={{ value: yName, angle: -90, position: 'insideLeft', fontSize: 12 }}
          />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter data={pairs} fill="#3b82f6" />
          {lineSegment && (
            <ReferenceLine
              segment={lineSegment}
              stroke="#ef4444"
              strokeWidth={2}
              strokeDasharray="5 4"
              ifOverflow="extendDomain"
            />
          )}
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}