export default function GroupedBoxPlotChart({ stats }) {
  const { min, max, q1, median, q3 } = stats

  const width = 600
  const height = 180
  const padding = 60
  const boxY = 60
  const boxHeight = 60

  const scaleX = (value) => padding + ((value - min) / (max - min)) * (width - 2 * padding)

  return (
    <div className="mt-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 transition-colors">
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Caja y Bigotes</p>
      <p className="text-xs text-slate-400 dark:text-slate-500 mb-4">
        Calculado con interpolación sobre los intervalos (no hay datos individuales, por lo que no se detectan outliers puntuales)
      </p>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        <line x1={padding} y1={height - 30} x2={width - padding} y2={height - 30}
          stroke="currentColor" className="text-slate-300 dark:text-slate-600" />

        <line x1={scaleX(min)} y1={boxY + boxHeight / 2} x2={scaleX(q1)} y2={boxY + boxHeight / 2}
          stroke="currentColor" className="text-slate-500 dark:text-slate-400" strokeWidth="2" />
        <line x1={scaleX(min)} y1={boxY + 10} x2={scaleX(min)} y2={boxY + boxHeight - 10}
          stroke="currentColor" className="text-slate-500 dark:text-slate-400" strokeWidth="2" />

        <line x1={scaleX(q3)} y1={boxY + boxHeight / 2} x2={scaleX(max)} y2={boxY + boxHeight / 2}
          stroke="currentColor" className="text-slate-500 dark:text-slate-400" strokeWidth="2" />
        <line x1={scaleX(max)} y1={boxY + 10} x2={scaleX(max)} y2={boxY + boxHeight - 10}
          stroke="currentColor" className="text-slate-500 dark:text-slate-400" strokeWidth="2" />

        <rect x={scaleX(q1)} y={boxY} width={scaleX(q3) - scaleX(q1)} height={boxHeight}
          fill="currentColor" className="text-blue-100 dark:text-blue-900" stroke="#3b82f6" strokeWidth="2" />

        <line x1={scaleX(median)} y1={boxY} x2={scaleX(median)} y2={boxY + boxHeight}
          stroke="#3b82f6" strokeWidth="3" />

        {[
          { value: min, label: 'Min' },
          { value: q1, label: 'Q1' },
          { value: median, label: 'Med' },
          { value: q3, label: 'Q3' },
          { value: max, label: 'Max' },
        ].map(({ value, label }) => (
          <g key={label}>
            <text x={scaleX(value)} y={boxY - 10} textAnchor="middle" className="text-xs fill-slate-600 dark:fill-slate-300 font-medium">
              {label}
            </text>
            <text x={scaleX(value)} y={boxY + boxHeight + 20} textAnchor="middle" className="text-xs fill-slate-500 dark:fill-slate-400">
              {value.toFixed(1)}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}