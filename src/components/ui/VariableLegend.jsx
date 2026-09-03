import { InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'

export default function VariableLegend({ items }) {
  return (
    <div className="mt-3 pt-3 border-t border-slate-100 space-y-1">
      {items.map(({ symbol, description }) => (
        <p key={symbol} className="text-xs text-slate-500">
          <InlineMath math={symbol} /> = {description}
        </p>
      ))}
    </div>
  )
}