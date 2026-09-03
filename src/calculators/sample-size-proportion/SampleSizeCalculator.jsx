import { useState } from 'react'
import { BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import { calculateSampleSize } from './formula.js'
import VariableLegend from '../../components/ui/VariableLegend.jsx'

export default function SampleSizeCalculator() {
  const [confidenceLevel, setConfidenceLevel] = useState(95)
  const [marginErrorPercent, setMarginErrorPercent] = useState(5)
  const [populationSize, setPopulationSize] = useState('')
  const [expectedProportionPercent, setExpectedProportionPercent] = useState(50)

  // Convertimos de % (lo que ve el usuario) a decimal (lo que espera formula.js)
  const marginError = marginErrorPercent / 100
  const expectedProportion = expectedProportionPercent / 100
  const population = populationSize === '' ? null : Number(populationSize)

  const result = calculateSampleSize({
    confidenceLevel: Number(confidenceLevel),
    marginError,
    populationSize: population,
    expectedProportion,
  })

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
        Calculadora de Tamaño de Muestra
      </h1>
      <p className="text-slate-500 mb-8">
        Para estimar una proporción (ej: encuestas de opinión)
      </p>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
        {/* Nivel de confianza */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Nivel de confianza: {confidenceLevel}%
          </label>
          <input
            type="range"
            min="80"
            max="99.5"
            step="0.5"
            value={confidenceLevel}
            onChange={(e) => setConfidenceLevel(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>80%</span>
            <span>90%</span>
            <span>99.5%</span>
          </div>
        </div>

        {/* Margen de error */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Margen de error: {marginErrorPercent}%
          </label>
          <input
            type="range"
            min="1"
            max="10"
            step="0.5"
            value={marginErrorPercent}
            onChange={(e) => setMarginErrorPercent(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Proporción esperada */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Proporción esperada: {expectedProportionPercent}%
            <span className="text-slate-400 font-normal"> (50% si no la conocés)</span>
          </label>
          <input
            type="range"
            min="1"
            max="99"
            value={expectedProportionPercent}
            onChange={(e) => setExpectedProportionPercent(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Tamaño de población */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Tamaño de la población
            <span className="text-slate-400 font-normal"> (dejalo vacío si es desconocida o muy grande)</span>
          </label>
          <input
            type="number"
            min="1"
            placeholder="Ej: 5000"
            value={populationSize}
            onChange={(e) => setPopulationSize(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Resultado */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
        <p className="text-sm text-blue-700 font-medium mb-1">Tamaño de muestra necesario</p>
        <p className="text-5xl font-bold text-blue-900">
          {population ? result.adjustedN : result.rawN}
        </p>
        <p className="text-sm text-blue-600 mt-2">personas a encuestar</p>
      </div>

      {/* Fórmula usada, con los valores del usuario ya sustituidos */}
      <div className="mt-6 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <p className="text-sm font-medium text-slate-500 mb-3">Fórmula aplicada</p>
        <BlockMath math="n = \frac{Z^2 \cdot p(1-p)}{e^2}" />
        <BlockMath
          math={`n = \\frac{${result.zValue}^2 \\cdot ${expectedProportion}(1-${expectedProportion})}{${marginError}^2} = ${result.rawN}`}
        />
        <VariableLegend
          items={[
            { symbol: 'n', description: 'tamaño de muestra necesario' },
            { symbol: 'Z', description: `valor Z para ${confidenceLevel}% de confianza` },
            { symbol: 'p', description: `proporción esperada (${expectedProportionPercent}%)` },
            { symbol: 'e', description: `margen de error (${marginErrorPercent}%)` },
          ]}
        />

        {population && (
          <>
            <p className="text-sm font-medium text-slate-500 mb-3 mt-4">Ajuste por población finita</p>
            <BlockMath math="n_{ajustado} = \frac{n}{1 + \frac{n-1}{N}}" />
            <BlockMath
              math={`n_{ajustado} = \\frac{${result.rawN}}{1 + \\frac{${result.rawN}-1}{${population}}} = ${result.adjustedN}`}
            />
            <VariableLegend
              items={[
                { symbol: 'n_{ajustado}', description: 'tamaño de muestra corregido' },
                { symbol: 'n', description: `tamaño de muestra sin ajustar (${result.rawN})` },
                { symbol: 'N', description: `tamaño de la población (${population})` },
              ]}
            />
          </>
        )}

        <BlockMath
          math={`n = \\frac{${result.zValue}^2 \\cdot ${expectedProportion}(1-${expectedProportion})}{${marginError}^2} = ${result.rawN}`}
        />
        {population && (
          <>
            <p className="text-sm font-medium text-slate-500 mb-3 mt-4">Ajuste por población finita</p>
            <BlockMath math="n_{ajustado} = \frac{n}{1 + \frac{n-1}{N}}" />
            <BlockMath
              math={`n_{ajustado} = \\frac{${result.rawN}}{1 + \\frac{${result.rawN}-1}{${population}}} = ${result.adjustedN}`}
            />
          </>
        )}
      </div>
    </div>
  )
}