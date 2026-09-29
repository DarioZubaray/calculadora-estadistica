import { Link } from 'react-router-dom'
import BoxPlotCalculator from './BoxPlotCalculator.jsx'
import BoxPlotExplanation from '../../content/BoxPlotExplanation.jsx'

export default function BoxPlotPage() {
  return (
    <>
      <div className="max-w-2xl mx-auto px-6">
        <Link to="/" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
          ← Volver al inicio
        </Link>
      </div>
      <BoxPlotCalculator />
      <BoxPlotExplanation />
    </>
  )
}
