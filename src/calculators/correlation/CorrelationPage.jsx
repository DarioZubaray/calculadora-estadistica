import { Link } from 'react-router-dom'
import CorrelationCalculator from './CorrelationCalculator.jsx'
import CorrelationExplanation from '../../content/CorrelationExplanation.jsx'

export default function CorrelationPage() {
  return (
    <>
      <div className="max-w-3xl mx-auto px-6">
        <Link to="/" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
          ← Volver al inicio
        </Link>
      </div>
      <CorrelationCalculator />
      <CorrelationExplanation />
    </>
  )
}