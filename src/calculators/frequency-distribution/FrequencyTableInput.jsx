import { useState } from 'react'

const emptyRow = () => ({ lowerLimit: '', upperLimit: '', xc: '', freq: '' })

export default function FrequencyTableInput({ onChange }) {
  const [rows, setRows] = useState([
    { lowerLimit: 0, upperLimit: 2, xc: '', freq: 5 },
    { lowerLimit: 2, upperLimit: 4, xc: '', freq: 9 },
    { lowerLimit: 4, upperLimit: 6, xc: '', freq: 3 },
    { lowerLimit: 6, upperLimit: 8, xc: '', freq: 1 },
    { lowerLimit: 8, upperLimit: 10, xc: '', freq: 0 },
  ])

  function updateRow(index, field, value) {
    const updated = rows.map((row, i) =>
      i === index ? { ...row, [field]: value } : row
    )
    setRows(updated)
    emitValidRows(updated)
  }

  function addRow() {
    setRows([...rows, emptyRow()])
  }

  function removeRow(index) {
    const updated = rows.filter((_, i) => i !== index)
    setRows(updated)
    emitValidRows(updated)
  }

  function emitValidRows(updated) {
    const valid = updated
      .filter((r) => r.lowerLimit !== '' && r.upperLimit !== '' && r.freq !== '')
      .map((r) => ({
        lowerLimit: Number(r.lowerLimit),
        upperLimit: Number(r.upperLimit),
        xc: r.xc,
        freq: Number(r.freq),
      }))
    onChange(valid)
  }

  useState(() => emitValidRows(rows))

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-slate-500 dark:text-slate-400">
            <th className="pb-2 pr-2">Límite inf.</th>
            <th className="pb-2 pr-2">Límite sup.</th>
            <th className="pb-2 pr-2">Xc (opcional)</th>
            <th className="pb-2 pr-2">Frec. absoluta</th>
            <th className="pb-2"></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              <td className="pr-2 pb-2">
                <input
                  type="number"
                  value={row.lowerLimit}
                  onChange={(e) => updateRow(i, 'lowerLimit', e.target.value)}
                  className="w-20 px-2 py-1 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded"
                />
              </td>
              <td className="pr-2 pb-2">
                <input
                  type="number"
                  value={row.upperLimit}
                  onChange={(e) => updateRow(i, 'upperLimit', e.target.value)}
                  className="w-20 px-2 py-1 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded"
                />
              </td>
              <td className="pr-2 pb-2">
                <input
                  type="number"
                  value={row.xc}
                  placeholder="auto"
                  onChange={(e) => updateRow(i, 'xc', e.target.value)}
                  className="w-20 px-2 py-1 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded placeholder:text-slate-300 dark:placeholder:text-slate-500"
                />
              </td>
              <td className="pr-2 pb-2">
                <input
                  type="number"
                  value={row.freq}
                  onChange={(e) => updateRow(i, 'freq', e.target.value)}
                  className="w-20 px-2 py-1 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded"
                />
              </td>
              <td className="pb-2">
                <button onClick={() => removeRow(i)} className="text-red-500 hover:text-red-700 text-xs">
                  ✕
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addRow} className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline">
        + Agregar intervalo
      </button>
    </div>
  )
}