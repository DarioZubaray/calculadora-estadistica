import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import Card from '../components/ui/Card.jsx'

export default function FrequencyDistributionExplanation() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">
        Entendiendo la distribución de frecuencias
      </h2>

      <Card title="¿Qué es una tabla de distribución de frecuencias?" defaultOpen>
        <p>
          Es una forma de organizar un conjunto grande de datos agrupándolos en{' '}
          <strong>intervalos (o clases)</strong>, contando cuántas observaciones caen dentro
          de cada uno. Se usa cuando los datos son numéricos y hay demasiados valores distintos
          como para listarlos uno por uno de forma útil.
        </p>
        <p>
          Cada intervalo se escribe como <InlineMath math="[L_i ; L_s)" />, donde{' '}
          <InlineMath math="L_i" /> es el límite inferior (incluido) y <InlineMath math="L_s" /> el
          límite superior (no incluido) — por eso el corchete es distinto en cada lado.
        </p>
      </Card>

      <Card title="Cómo se calcula cada columna (fórmulas)">
        <div className="space-y-4">
          <div>
            <p className="font-medium">Marca de clase <InlineMath math="(X_c)" /></p>
            <p className="text-sm">El punto medio del intervalo, representa a todo el intervalo:</p>
            <BlockMath math="X_c = \frac{L_i + L_s}{2}" />
          </div>
          <div>
            <p className="font-medium">Frecuencia absoluta acumulada <InlineMath math="(F_{abs\,acum})" /></p>
            <p className="text-sm">Suma de las frecuencias absolutas hasta ese intervalo inclusive.</p>
          </div>
          <div>
            <p className="font-medium">Frecuencia relativa <InlineMath math="(F_{rel})" /></p>
            <BlockMath math="F_{rel} = \frac{F_{abs}}{n}" />
            <p className="text-sm">Proporción que representa ese intervalo sobre el total <InlineMath math="n" />.</p>
          </div>
          <div>
            <p className="font-medium">Frecuencia porcentual <InlineMath math="(F_{porc})" /></p>
            <BlockMath math="F_{porc} = F_{rel} \times 100" />
          </div>
          <div>
            <p className="font-medium">Acumuladas <InlineMath math="(F_{rel\,acum}, F_{porc\,acum})" /></p>
            <p className="text-sm">Mismo criterio que la frecuencia absoluta acumulada, pero sumando los valores relativos o porcentuales en vez de los absolutos.</p>
          </div>
        </div>
      </Card>

      <Card title="¿Qué necesito para armar la tabla?">
        <div className="grid gap-3">
          <div className="border-l-4 border-blue-400 pl-4 py-1">
            <p className="font-semibold text-slate-700 dark:text-slate-200">Intervalos <InlineMath math="(L_i; L_s)" /></p>
            <p className="text-sm">Los rangos en que dividís tus datos. Suelen tener el mismo ancho (amplitud constante), aunque no es obligatorio.</p>
          </div>
          <div className="border-l-4 border-blue-400 pl-4 py-1">
            <p className="font-semibold text-slate-700 dark:text-slate-200">Frecuencia absoluta <InlineMath math="(F_{abs})" /></p>
            <p className="text-sm">Cuántas observaciones caen dentro de cada intervalo. Es el dato crudo que da origen a todo lo demás.</p>
          </div>
        </div>
      </Card>

      <Card title="¿Cómo leo e interpreto los tres gráficos?">
        <div className="space-y-4">
          <div>
            <p className="font-medium">Diagrama de Pareto</p>
            <p className="text-sm">
              Combina barras de frecuencia absoluta con una línea de porcentaje acumulado.
              Permite ver rápidamente qué intervalos concentran la mayor parte de los datos —
              en su versión clásica (ordenada de mayor a menor frecuencia) se usa para aplicar
              la regla 80/20, aunque en intervalos continuos se suele respetar el orden natural
              de los rangos.
            </p>
          </div>
          <div>
            <p className="font-medium">Histograma</p>
            <p className="text-sm">
              Barras contiguas (sin espacio entre sí, a diferencia de un gráfico de barras común)
              donde el área de cada barra representa la frecuencia del intervalo. Muestra la
              "forma" de la distribución: si es simétrica, si tiene colas largas, si hay más de
              un pico (bimodal), etc.
            </p>
          </div>
          <div>
            <p className="font-medium">Caja y Bigotes</p>
            <p className="text-sm">
              Igual que en la calculadora de box plot, pero acá los cuartiles se calculan por{' '}
              <strong>interpolación sobre los intervalos</strong> (no hay datos individuales
              disponibles), por lo que no se pueden detectar outliers puntuales — solo se estima
              la posición aproximada de Q1, mediana y Q3 dentro del rango total.
            </p>
          </div>
        </div>
      </Card>

      <Card title="¿Cómo se calculan los cuartiles en datos agrupados?">
        <p>
          A diferencia de datos individuales (donde se interpola entre dos valores reales
          ordenados), acá se interpola <strong>dentro del intervalo</strong> donde cae el
          percentil buscado:
        </p>
        <BlockMath math="Q_k = L_i + \frac{\frac{k}{4}n - F_{abs\,acum\,anterior}}{F_{abs}} \times (L_s - L_i)" />
        <p className="text-sm">
          Donde se busca el intervalo cuya frecuencia acumulada supera por primera vez al
          percentil objetivo (<InlineMath math="\frac{k}{4}n" /> para cuartiles), y se interpola
          linealmente dentro de ese intervalo usando su amplitud <InlineMath math="(L_s - L_i)" />.
        </p>
      </Card>
    </div>
  )
}