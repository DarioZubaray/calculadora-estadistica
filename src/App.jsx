import 'katex/dist/katex.min.css'
import { BlockMath } from 'react-katex'

function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-800 mb-4">
          Scaffolding OK 🎉
        </h1>
        <BlockMath math="n = \frac{Z^2 \cdot p(1-p)}{e^2}" />
      </div>
    </div>
  )
}

export default App