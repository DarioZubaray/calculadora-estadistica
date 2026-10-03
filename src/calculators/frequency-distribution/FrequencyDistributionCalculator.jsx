import { useState } from 'react'
import FrequencyTableInput from './FrequencyTableInput.jsx'
import { calculateFrequencyTable, calculateGroupedBoxPlotStats } from './formula.js'
import ParetoChart from './ParetoChart.jsx'
import HistogramChart from './HistogramChart.jsx'
import GroupedBoxPlotChart from './GroupedBoxPlotChart.jsx'

export default function FrequencyDistributionCalculator() {
  const [intervals, setIntervals] = useState([])

  const table = intervals.length > 0 ? calculateFrequencyTable(intervals) : null
  const boxPlotStats = table ? calculateGroupedBoxPlotStats(table) : null

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
        Distribución de Frecuencias
      </h1>
      <p className="text-slate-500 dark:text-slate-400 mb-8">
        Cargá tus intervalos y frecuencias absolutas
      </p>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 transition-colors">
        <FrequencyTableInput onChange={setIntervals} />
      </div>

      {table && (
        <>
          <div className="mt-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 overflow-x-auto transition-colors">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">Tabla completa</p>
            <table className="w-full text-sm text-right">
              <thead>
                <tr className="text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                  <th className="py-2 text-left">[Li ; Ls)</th>
                  <th>Xc</th>
                  <th>Fabs</th>
                  <th>Fabsacum</th>
                  <th>Frel</th>
                  <th>Frelacum</th>
                  <th>Fporc</th>
                  <th>Fporcacum</th>
                </tr>
              </thead>
              <tbody className="text-slate-700 dark:text-slate-200">
                {table.rows.map((row, i) => (
                  <tr key={i} className="border-b border-slate-100 dark:border-slate-700/50">
                    <td className="py-2 text-left">[{row.lowerLimit} ; {row.upperLimit})</td>
                    <td>{row.classMark.toFixed(1)}</td>
                    <td>{row.freq}</td>
                    <td>{row.cumulativeFreq}</td>
                    <td>{row.relative.toFixed(3)}</td>
                    <td>{row.cumulativeRelative.toFixed(3)}</td>
                    <td>{row.percent.toFixed(1)}%</td>
                    <td>{row.cumulativePercent.toFixed(1)}%</td>
                  </tr>
                ))}
                <tr className="font-semibold text-slate-800 dark:text-slate-100">
                  <td className="py-2 text-left">Total</td>
                  <td></td>
                  <td>{table.total}</td>
                  <td colSpan={5}></td>
                </tr>
              </tbody>
            </table>
          </div>

          <ParetoChart table={table} />
          <HistogramChart table={table} />
          <GroupedBoxPlotChart stats={boxPlotStats} />
        </>
      )}
    </div>
  )
}