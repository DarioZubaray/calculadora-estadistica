import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDarkMode } from './hooks/useDarkMode.js'
import ThemeToggle from './components/ui/ThemeToggle.jsx'
import circuitLight from './assets/circuit-bg-light.svg'
import circuitDark from './assets/circuit-bg-dark.svg'
import Home from './pages/Home.jsx'
import SampleSizePage from './calculators/sample-size-proportion/SampleSizePage.jsx'
import BoxPlotPage from './calculators/box-plot/BoxPlotPage.jsx'

function App() {
  const [isDark, setIsDark] = useDarkMode()

  return (
    <BrowserRouter>
      <div
        className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors"
        style={{
          backgroundImage: `url("${isDark ? circuitDark : circuitLight}")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
        }}
      >
        <ThemeToggle isDark={isDark} setIsDark={setIsDark} />
        <div className="py-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tamano-muestra" element={<SampleSizePage />} />
            <Route path="/caja-bigotes" element={<BoxPlotPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App