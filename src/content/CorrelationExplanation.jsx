import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import Card from '../components/ui/Card.jsx'

export default function CorrelationExplanation() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">
        Entendiendo la correlación y la dispersión
      </h2>

      <Card title="¿Qué es un diagrama de dispersión?" defaultOpen>
        <p>
          Es un gráfico donde cada observación se dibuja como un punto <InlineMath math="(x, y)" />,
          con una variable en cada eje. Sirve para ver <strong>si dos variables están relacionadas</strong> y
          de qué manera: si al crecer una tiende a crecer la otra, si tiende a decrecer, o si no hay
          ningún patrón.
        </p>
        <p>
          Por ejemplo, con pares (altura, peso) de varias personas, la nube de puntos suele subir de
          izquierda a derecha: a mayor altura, tiende a haber mayor peso.
        </p>
      </Card>

      <Card title="¿Qué es la correlación y cómo se calcula (fórmulas)?">
        <p>
          La correlación mide qué tan bien se ajustan los puntos a una <strong>línea recta</strong>. Se
          resume en el <strong>coeficiente de correlación de Pearson</strong> (<InlineMath math="r" />),
          que siempre queda entre −1 y 1:
        </p>
        <BlockMath math="r = \frac{S_{xy}}{\sqrt{S_{xx} \cdot S_{yy}}}" />
        <p className="text-sm">Donde las sumas de desviaciones respecto de las medias son:</p>
        <BlockMath math="S_{xx} = \sum (x_i - \bar{x})^2 \qquad S_{yy} = \sum (y_i - \bar{y})^2 \qquad S_{xy} = \sum (x_i - \bar{x})(y_i - \bar{y})" />
        <p className="text-sm">
          Relacionado con esto está la <strong>covarianza</strong>, que indica si las variables se mueven
          en el mismo sentido (positiva) o en sentido opuesto (negativa):
        </p>
        <BlockMath math="\text{cov}(x, y) = \frac{S_{xy}}{n - 1}" />
        <p className="text-sm">
          El problema de la covarianza es que depende de las unidades (kilos por metros, por ejemplo).{' '}
          <InlineMath math="r" /> la divide por los desvíos de ambas variables y queda sin unidades,
          por eso se puede comparar entre distintos problemas.
        </p>
      </Card>

      <Card title="¿Cómo interpreto el valor de r?">
        <p>El signo da la dirección y el valor absoluto la fuerza:</p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li><InlineMath math="r > 0" />: correlación positiva (cuando una sube, la otra tiende a subir).</li>
          <li><InlineMath math="r < 0" />: correlación negativa (cuando una sube, la otra tiende a bajar).</li>
          <li><InlineMath math="r \approx 0" />: no hay relación <em>lineal</em>.</li>
          <li><InlineMath math="r = \pm 1" />: todos los puntos están exactamente sobre una recta.</li>
        </ul>
        <p className="text-sm">
          Una convención habitual (varía según el autor y la disciplina) es considerar{' '}
          <InlineMath math="|r| < 0.3" /> débil, entre 0.3 y 0.7 moderada, y mayor a 0.7 fuerte.
        </p>
      </Card>

      <Card title="La recta de regresión">
        <p>
          Es la recta que mejor se ajusta a la nube de puntos según el método de{' '}
          <strong>mínimos cuadrados</strong>: la que hace mínima la suma de los cuadrados de las
          distancias verticales entre cada punto y la recta.
        </p>
        <BlockMath math="y = a + b\,x" />
        <BlockMath math="b = \frac{S_{xy}}{S_{xx}} \qquad a = \bar{y} - b\,\bar{x}" />
        <p className="text-sm">
          La <strong>pendiente</strong> <InlineMath math="b" /> indica cuánto cambia <InlineMath math="y" /> en
          promedio por cada unidad que aumenta <InlineMath math="x" />. La <strong>ordenada</strong>{' '}
          <InlineMath math="a" /> es el valor que predice la recta cuando <InlineMath math="x = 0" />; a
          veces no tiene sentido real (una altura de 0 metros, por ejemplo), y es solo parte del ajuste.
        </p>
      </Card>

      <Card title="El coeficiente de determinación (R²)">
        <p>
          Es el cuadrado del coeficiente de correlación y se muestra en el gráfico de Excel como{' '}
          <InlineMath math="R^2" />:
        </p>
        <BlockMath math="R^2 = r^2" />
        <p className="text-sm">
          Indica <strong>qué proporción de la variabilidad de y es explicada por x</strong> a través de la
          recta. Por ejemplo, <InlineMath math="R^2 = 0.58" /> significa que aproximadamente el 58% de las
          diferencias en y se explican por la relación lineal con x; el 42% restante queda sin explicar
          (otros factores, azar).
        </p>
      </Card>

      <Card title="¿Qué necesito para calcularla?">
        <div className="grid gap-3">
          <div className="border-l-4 border-blue-400 pl-4 py-1">
            <p className="font-semibold text-slate-700 dark:text-slate-200">Pares emparejados</p>
            <p className="text-sm">
              Cada valor de x tiene que corresponder al mismo individuo u observación que su valor de y
              (la altura y el peso <em>de la misma persona</em>). El orden de los pares no importa, pero
              no se pueden mezclar.
            </p>
          </div>
          <div className="border-l-4 border-blue-400 pl-4 py-1">
            <p className="font-semibold text-slate-700 dark:text-slate-200">Variables numéricas</p>
            <p className="text-sm">Ambas variables deben ser cuantitativas.</p>
          </div>
          <div className="border-l-4 border-blue-400 pl-4 py-1">
            <p className="font-semibold text-slate-700 dark:text-slate-200">Variación en ambas variables</p>
            <p className="text-sm">
              Si todos los valores de x (o de y) son iguales, no hay dispersión y no se puede calcular la
              correlación.
            </p>
          </div>
        </div>
      </Card>

      <Card title="Cuidados al interpretar">
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>
            <strong>Correlación no implica causalidad:</strong> que dos variables se muevan juntas no
            prueba que una cause la otra; puede haber una tercera variable detrás.
          </li>
          <li>
            <strong>Solo mide relaciones lineales:</strong> una relación curva (por ejemplo, en forma de U)
            puede tener <InlineMath math="r \approx 0" /> y estar fuertemente relacionada. Por eso conviene
            mirar siempre el diagrama de dispersión y no solo el número.
          </li>
          <li>
            <strong>Los valores atípicos pesan mucho:</strong> un solo punto muy alejado puede cambiar
            bastante <InlineMath math="r" /> y la recta.
          </li>
          <li>
            <strong>Pocos datos, poca confianza:</strong> con pocos pares, un <InlineMath math="r" /> alto
            puede ser casualidad. Los 5 pares de ejemplo sirven para aprender, no para sacar conclusiones.
          </li>
          <li>
            <strong>No extrapolar:</strong> la recta es confiable dentro del rango de valores observados de x,
            no mucho más allá.
          </li>
        </ul>
      </Card>
    </div>
  )
}