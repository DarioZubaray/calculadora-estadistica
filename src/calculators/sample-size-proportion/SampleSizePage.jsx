import { Link } from 'react-router-dom'
import SampleSizeCalculator from './SampleSizeCalculator.jsx'
import SampleSizeExplanation from '../../content/SampleSizeExplanation.jsx'

export default function SampleSizePage() {
  return (
    <>
      <div className="max-w-2xl mx-auto px-6">
        <Link to="/" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
          ← Volver al inicio
        </Link>
      </div>
      <SampleSizeCalculator />
      <SampleSizeExplanation />
    </>
  )
}