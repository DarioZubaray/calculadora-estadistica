import { useDarkMode } from './hooks/useDarkMode.js'
import ThemeToggle from './components/ui/ThemeToggle.jsx'
import circuitLight from './assets/circuit-bg-light.svg'
import circuitDark from './assets/circuit-bg-dark.svg'
import SampleSizeCalculator from './calculators/sample-size-proportion/SampleSizeCalculator.jsx'
import ExplanationSection from './content/ExplanationSection.jsx'

function App() {
  const [isDark, setIsDark] = useDarkMode()

  return (
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
        <SampleSizeCalculator />
        <ExplanationSection />
      </div>
    </div>
  )
}

export default App