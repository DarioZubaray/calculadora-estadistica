import { Link } from 'react-router-dom'
import FrequencyDistributionCalculator from './FrequencyDistributionCalculator.jsx'
import FrequencyDistributionExplanation from '../../content/FrequencyDistributionExplanation.jsx'

export default function FrequencyDistributionPage() {
  return (
    <>
      <div className="max-w-4xl mx-auto px-6">
        <Link to="/" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
          ← Volver al inicio
        </Link>
      </div>
      <FrequencyDistributionCalculator />
      <FrequencyDistributionExplanation />
    </>
  )
}