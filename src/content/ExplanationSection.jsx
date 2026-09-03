import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'

function Card({ title, defaultOpen = false, children }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 mb-4 overflow-hidden transition-colors">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">{title}</h3>
        <svg
          className={`w-5 h-5 text-slate-400 shrink-0 ml-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        className={`grid transition-all duration-200 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-300 leading-relaxed space-y-3">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ExplanationSection() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">
        Entendiendo el tamaño de la muestra
      </h2>

      <Card title="¿Qué es el tamaño de la muestra?" defaultOpen>
        <p>
          Es la <strong>cantidad de personas (o elementos) que necesitás encuestar o medir</strong> de
          una población para que los resultados que obtengas sean representativos de esa población
          completa, dentro de un margen de error y nivel de confianza que vos mismo definís.
        </p>
        <p>
          No se trata de "cuantos más, mejor" sin límite: hay un punto en el que aumentar la
          muestra deja de mejorar significativamente la precisión, y solo suma costo y tiempo.
          El tamaño de muestra busca ese equilibrio.
        </p>
      </Card>

      <Card title="Cómo calcular el tamaño de la muestra (fórmula)">
        <p>Para estimar una <strong>proporción</strong> (lo más común en encuestas — "¿qué % prefiere X?"):</p>
        <BlockMath math="n = \frac{Z^2 \cdot p(1-p)}{e^2}" />
        <p>Si además conocés el tamaño de la población (N) y es finita, se aplica una corrección:</p>
        <BlockMath math="n_{ajustado} = \frac{n}{1 + \dfrac{n-1}{N}}" />
      </Card>

      <Card title="¿Qué necesito para calcular el tamaño de la muestra de mi encuesta?">
        <div className="grid gap-3">
          <div className="border-l-4 border-blue-400 pl-4 py-1">
            <p className="font-semibold text-slate-700 dark:text-slate-200">
              Tamaño de la población <InlineMath math="(N)" />
            </p>
            <p className="text-sm">
              Cantidad total de individuos del universo que querés estudiar (ej: todos los clientes
              de una empresa). Si no lo sabés o es muy grande, se trata como "infinita".
            </p>
          </div>

          <div className="border-l-4 border-blue-400 pl-4 py-1">
            <p className="font-semibold text-slate-700 dark:text-slate-200">
              Margen de error <InlineMath math="(e)" />
            </p>
            <p className="text-sm">
              Cuánto puede desviarse tu resultado del valor real de la población. Se expresa en %
              (ej: ±5%). Menor margen implica que necesitás más muestra.
            </p>
          </div>

          <div className="border-l-4 border-blue-400 pl-4 py-1">
            <p className="font-semibold text-slate-700 dark:text-slate-200">
              Nivel de confianza
            </p>
            <p className="text-sm">
              Qué tan seguro querés estar de que el resultado real cae dentro del margen de error,
              si repitieras el estudio muchas veces. Se expresa en % (90%, 95%, 99% son los más
              usados) y se traduce a un valor <InlineMath math="Z" /> mediante la distribución normal.
            </p>
          </div>

          <div className="border-l-4 border-blue-400 pl-4 py-1">
            <p className="font-semibold text-slate-700 dark:text-slate-200">
              Intervalo de confianza
            </p>
            <p className="text-sm">
              Es el <em>rango de resultados</em> que obtenés al combinar tu estimación con el margen
              de error: estimación ± margen de error. Ejemplo: si medís 60% de aceptación con margen
              de error 5%, el intervalo de confianza es [55%, 65%]. No confundir con el nivel de
              confianza: ese es el % de "seguridad" (95%); el intervalo es el rango de valores resultante.
            </p>
          </div>

          <div className="border-l-4 border-blue-400 pl-4 py-1">
            <p className="font-semibold text-slate-700 dark:text-slate-200">
              Desviación estándar <InlineMath math="(\sigma)" />
            </p>
            <p className="text-sm">
              Qué tan dispersos están los datos respecto al promedio. Se usa cuando estimás una
              media. Cuando estimás una proporción (como en esta calculadora), se reemplaza por{' '}
              <InlineMath math="p(1-p)" />, donde <InlineMath math="p" /> es la proporción esperada
              (si no la sabés, se usa 0.5, el escenario de máxima variabilidad y el más conservador).
            </p>
          </div>
        </div>
      </Card>

      <Card title="¿Cómo calculo el tamaño de la muestra para mi encuesta?">
        <p>
          Ejemplo: querés saber qué % de tus 5.000 clientes (N) está satisfecho, con 95% de
          confianza (Z=1.96) y margen de error de 5% (e=0.05), sin saber la proporción esperada
          (p=0.5, caso conservador).
        </p>
        <p className="font-medium">1. Calculás n para población infinita:</p>
        <BlockMath math="n = \frac{1.96^2 \cdot 0.5 \cdot (1-0.5)}{0.05^2} = 384.16 \approx 385" />
        <p className="font-medium">2. Como conocés N=5000, aplicás la corrección de población finita:</p>
        <BlockMath math="n_{ajustado} = \frac{385}{1 + \frac{385-1}{5000}} \approx 357" />
        <p>
          Resultado: necesitás encuestar a <strong>357 personas</strong>. Podés reproducir este
          mismo cálculo cargando esos valores en la calculadora de arriba.
        </p>
      </Card>

      <Card title="¿Cuándo se considera que el tamaño de la muestra es adecuado?">
        <p>No hay un número mágico universal — depende del balance entre estos factores:</p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li><strong>Cubre el margen de error y confianza definidos:</strong> si el cálculo dio 357 y encuestaste 357+, es adecuada para esos parámetros.</li>
          <li><strong>Representa la diversidad de la población:</strong> no solo importa la cantidad, sino que la muestra sea aleatoria y represente bien los subgrupos (edad, ubicación, etc.).</li>
          <li><strong>Es alcanzable con los recursos disponibles:</strong> en la práctica se busca el tamaño mínimo que cumple los criterios estadísticos.</li>
          <li><strong>Tasa de respuesta esperada:</strong> si solo el 20% responde encuestas, necesitás invitar a más personas que el n calculado.</li>
        </ul>
      </Card>

      <Card title="¿Cuándo se considera que el tamaño de la muestra es grande?">
        <p>
          Se suele usar la regla práctica de <InlineMath math="n \geq 30" /> como umbral para
          considerar una muestra "grande", porque es el punto donde, por el{' '}
          <strong>Teorema Central del Límite</strong>, la distribución de las medias muestrales
          empieza a aproximarse a una distribución normal, sin importar la forma de la distribución
          original de la población. Esto permite usar la distribución Z en lugar de la distribución
          t de Student, simplificando los cálculos.
        </p>
        <p>
          Pero "grande" es relativo al contexto: para inferencias estadísticas básicas,{' '}
          <InlineMath math="n \geq 30" /> ya se considera grande. Para encuestas de opinión con
          poblaciones de miles o millones, unos pocos cientos (300-400) ya dan buena precisión —
          el tamaño de muestra crece mucho más lento que el tamaño de la población.
        </p>
      </Card>
    </div>
  )
}