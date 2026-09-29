import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import Card from '../components/ui/Card.jsx'

export default function BoxPlotExplanation() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">
        Entendiendo el diagrama de caja y bigotes
      </h2>

      <Card title="¿Qué es un diagrama de caja y bigotes?" defaultOpen>
        <p>
          También llamado <strong>box plot</strong>, es una representación gráfica que resume
          la distribución de un conjunto de datos usando cinco valores clave: el mínimo, el
          primer cuartil, la mediana, el tercer cuartil y el máximo.
        </p>
        <p>
          Con un solo vistazo permite ver dónde se concentra la mayoría de los datos, qué tan
          dispersos están, si la distribución es simétrica o está sesgada, y si existen{' '}
          <strong>valores atípicos (outliers)</strong> que se separan mucho del resto.
        </p>
      </Card>

      <Card title="Cómo se construye (fórmulas)">
        <p>
          Todo parte de ordenar los datos y calcular sus <strong>cuartiles</strong> — los valores
          que dividen el conjunto ordenado en cuatro partes iguales:
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li><InlineMath math="Q_1" /> (25% de los datos por debajo)</li>
          <li><InlineMath math="Q_2" /> = mediana (50% de los datos por debajo)</li>
          <li><InlineMath math="Q_3" /> (75% de los datos por debajo)</li>
        </ul>
        <p>El rango intercuartílico mide la dispersión del 50% central de los datos:</p>
        <BlockMath math="IQR = Q_3 - Q_1" />
        <p>Y define los límites a partir de los cuales un dato se considera outlier:</p>
        <BlockMath math="\text{Límite inferior} = Q_1 - 1.5 \cdot IQR" />
        <BlockMath math="\text{Límite superior} = Q_3 + 1.5 \cdot IQR" />
        <p className="text-sm">
          Esta regla del <InlineMath math="1.5 \times IQR" /> se conoce como{' '}
          <strong>regla de Tukey</strong>, y es el criterio más usado en estadística descriptiva
          para detectar valores atípicos.
        </p>
      </Card>

      <Card title="¿Qué necesito para armar mi diagrama?">
        <div className="grid gap-3">
          <div className="border-l-4 border-blue-400 pl-4 py-1">
            <p className="font-semibold text-slate-700 dark:text-slate-200">
              Mediana <InlineMath math="(Q_2)" />
            </p>
            <p className="text-sm">
              El valor que queda justo en el medio de los datos ordenados. La mitad de las
              observaciones son menores, la mitad son mayores. Se dibuja como la línea dentro
              de la caja.
            </p>
          </div>

          <div className="border-l-4 border-blue-400 pl-4 py-1">
            <p className="font-semibold text-slate-700 dark:text-slate-200">
              Primer y tercer cuartil <InlineMath math="(Q_1, Q_3)" />
            </p>
            <p className="text-sm">
              Delimitan la caja: <InlineMath math="Q_1" /> es el borde inferior, <InlineMath math="Q_3" /> el
              superior. Entre ambos se encuentra el 50% central de los datos.
            </p>
          </div>

          <div className="border-l-4 border-blue-400 pl-4 py-1">
            <p className="font-semibold text-slate-700 dark:text-slate-200">
              Rango intercuartílico <InlineMath math="(IQR)" />
            </p>
            <p className="text-sm">
              La "altura" de la caja: <InlineMath math="Q_3 - Q_1" />. Cuanto más grande, más
              dispersos están los datos centrales.
            </p>
          </div>

          <div className="border-l-4 border-blue-400 pl-4 py-1">
            <p className="font-semibold text-slate-700 dark:text-slate-200">
              Bigotes
            </p>
            <p className="text-sm">
              Las líneas que salen de la caja hacia el mínimo y el máximo. Importante: <strong>no
              llegan hasta el límite teórico</strong> (<InlineMath math="Q_1 - 1.5 \cdot IQR" />), sino
              hasta el dato real más extremo que todavía está dentro de ese límite.
            </p>
          </div>

          <div className="border-l-4 border-blue-400 pl-4 py-1">
            <p className="font-semibold text-slate-700 dark:text-slate-200">
              Valores atípicos (outliers)
            </p>
            <p className="text-sm">
              Datos que caen fuera de los límites de Tukey. Se dibujan como puntos individuales
              separados de los bigotes, porque podrían representar errores de medición o casos
              genuinamente excepcionales que merecen atención aparte.
            </p>
          </div>
        </div>
      </Card>

      <Card title="¿Cómo interpreto el diagrama?">
        <p>Algunas lecturas rápidas que permite el box plot:</p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            <strong>Simetría:</strong> si la mediana está centrada en la caja y los bigotes tienen
            longitud parecida, la distribución es aproximadamente simétrica.
          </li>
          <li>
            <strong>Asimetría (sesgo):</strong> si la mediana está corrida hacia un lado, o un
            bigote es mucho más largo que el otro, los datos están sesgados hacia ese extremo.
          </li>
          <li>
            <strong>Dispersión:</strong> una caja más ancha (mayor IQR) indica más variabilidad en
            el 50% central de los datos.
          </li>
          <li>
            <strong>Outliers:</strong> puntos aislados fuera de los bigotes señalan observaciones
            inusuales que vale la pena revisar.
          </li>
        </ul>
      </Card>

      <Card title="¿Cuándo se considera que un dato es un valor atípico?">
        <p>
          Con el criterio de Tukey, un dato se marca como outlier cuando cae fuera del rango:
        </p>
        <BlockMath math="[Q_1 - 1.5 \cdot IQR,\ \ Q_3 + 1.5 \cdot IQR]" />
        <p>
          Es importante notar que este es un criterio <strong>estadístico</strong>, no una prueba
          de que el dato esté mal: puede ser un error de carga, pero también puede ser un caso
          real y legítimo que simplemente se aleja del comportamiento típico del resto. Conviene
          siempre revisar el contexto antes de descartar un outlier.
        </p>
        <p className="text-sm">
          Existe también un criterio más estricto, con <InlineMath math="3 \times IQR" /> en vez de{' '}
          <InlineMath math="1.5 \times IQR" />, usado para marcar "outliers extremos" cuando se
          quiere ser más conservador.
        </p>
      </Card>

      <Card title="¿Para qué sirve comparado con otras herramientas?">
        <p>
          El box plot es especialmente útil cuando querés <strong>comparar la distribución de
          varios grupos al mismo tiempo</strong> (por ejemplo, calificaciones de distintas
          divisiones, o tiempos de respuesta antes y después de un cambio): al dibujar varias
          cajas una al lado de la otra, se ven de inmediato las diferencias de mediana, dispersión
          y outliers entre grupos, algo que es difícil de leer en una tabla de números.
        </p>
        <p>
          A diferencia de un histograma, no muestra la forma exacta de la distribución (no
          distingue, por ejemplo, si los datos son bimodales), pero a cambio es mucho más compacto
          y fácil de comparar entre grupos.
        </p>
      </Card>
    </div>
  )
}