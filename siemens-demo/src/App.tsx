import { useEffect, useState } from 'react'
import { useAppStore } from './store/useAppStore'
import Header from './components/Header'
import StepNavigation from './components/StepNavigation'
import LoadAssembly from './components/steps/LoadAssembly'
import JointMapping from './components/steps/JointMapping'
import ExportValidate from './components/steps/ExportValidate'
import SuccessModal from './components/SuccessModal'
import SplashScreen from './components/SplashScreen'
import { useTour } from './hooks/useTour'
import './tour.css'

function App() {
  const { currentStep, darkMode } = useAppStore()
  const [showSplash, setShowSplash] = useState(true)
  const { startTour } = useTour()

  useEffect(() => {
    // Show splash screen for 2.5 seconds
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Apply dark mode class
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  if (showSplash) {
    return <SplashScreen />
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header onStartTour={startTour} />
      <StepNavigation />
      
      <main className="flex-1 overflow-hidden">
        {currentStep === 1 && <LoadAssembly />}
        {currentStep === 2 && <JointMapping />}
        {currentStep === 3 && <ExportValidate />}
      </main>

      <SuccessModal />
    </div>
  )
}

export default App
