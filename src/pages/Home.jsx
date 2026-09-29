import { Link } from 'react-router-dom'
import { calculators } from '../calculators/registry.js'

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
        Calculadora de Probabilidad y Estadística
      </h1>
      <p className="text-slate-500 dark:text-slate-400 mb-8">
        Elegí una herramienta para empezar
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {calculators.map((calc) => (
          <Link
            key={calc.id}
            to={calc.path}
            className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
          >
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1">
              {calc.title}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {calc.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}