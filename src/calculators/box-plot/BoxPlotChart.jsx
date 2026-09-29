export default function BoxPlotChart({ stats }) {
  const { min, max, q1, median, q3, lowerWhisker, upperWhisker, outliers } = stats

  const width = 600
  const height = 200
  const padding = 60
  const boxY = 70
  const boxHeight = 60

  const domainMin = Math.min(min, ...outliers) - (max - min) * 0.1
  const domainMax = Math.max(max, ...outliers) + (max - min) * 0.1

  const scaleX = (value) =>
    padding + ((value - domainMin) / (domainMax - domainMin)) * (width - 2 * padding)

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
      {/* Eje */}
      <line x1={padding} y1={height - 30} x2={width - padding} y2={height - 30}
        stroke="currentColor" className="text-slate-300 dark:text-slate-600" />

      {/* Bigote inferior */}
      <line x1={scaleX(lowerWhisker)} y1={boxY + boxHeight / 2} x2={scaleX(q1)} y2={boxY + boxHeight / 2}
        stroke="currentColor" className="text-slate-500 dark:text-slate-400" strokeWidth="2" />
      <line x1={scaleX(lowerWhisker)} y1={boxY + 10} x2={scaleX(lowerWhisker)} y2={boxY + boxHeight - 10}
        stroke="currentColor" className="text-slate-500 dark:text-slate-400" strokeWidth="2" />

      {/* Bigote superior */}
      <line x1={scaleX(q3)} y1={boxY + boxHeight / 2} x2={scaleX(upperWhisker)} y2={boxY + boxHeight / 2}
        stroke="currentColor" className="text-slate-500 dark:text-slate-400" strokeWidth="2" />
      <line x1={scaleX(upperWhisker)} y1={boxY + 10} x2={scaleX(upperWhisker)} y2={boxY + boxHeight - 10}
        stroke="currentColor" className="text-slate-500 dark:text-slate-400" strokeWidth="2" />

      {/* Caja (Q1 a Q3) */}
      <rect x={scaleX(q1)} y={boxY} width={scaleX(q3) - scaleX(q1)} height={boxHeight}
        fill="currentColor" className="text-blue-100 dark:text-blue-900" stroke="#3b82f6" strokeWidth="2" />

      {/* Línea de la mediana */}
      <line x1={scaleX(median)} y1={boxY} x2={scaleX(median)} y2={boxY + boxHeight}
        stroke="#3b82f6" strokeWidth="3" />

      {/* Outliers */}
      {outliers.map((value, i) => (
        <circle key={i} cx={scaleX(value)} cy={boxY + boxHeight / 2} r="4"
          fill="#ef4444" stroke="white" strokeWidth="1" />
      ))}

      {/* Etiquetas de valores clave */}
      {[
        { value: lowerWhisker, label: 'min*' },
        { value: q1, label: 'Q1' },
        { value: median, label: 'Med' },
        { value: q3, label: 'Q3' },
        { value: upperWhisker, label: 'max*' },
      ].map(({ value, label }) => (
        <g key={label}>
          <text x={scaleX(value)} y={boxY - 10} textAnchor="middle"
            className="text-xs fill-slate-600 dark:fill-slate-300 font-medium">
            {label}
          </text>
          <text x={scaleX(value)} y={boxY + boxHeight + 20} textAnchor="middle"
            className="text-xs fill-slate-500 dark:fill-slate-400">
            {value.toFixed(1)}
          </text>
        </g>
      ))}
    </svg>
  )
}