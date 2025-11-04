import { Moon, Sun, Volume2, VolumeX, HelpCircle } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'

interface HeaderProps {
  onStartTour?: () => void
}

export default function Header({ onStartTour }: HeaderProps) {
  const { darkMode, toggleDarkMode, soundEnabled, toggleSound } = useAppStore()

  return (
    <header id="app-header" className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img 
            src="/media/Logo_black.png" 
            alt="Company Logo" 
            className="h-10 w-auto dark:brightness-0 dark:invert"
          />
          <div>
            <h1 className="text-xl font-bold">Siemens NX URDF Exporter</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">AI-Powered Kinematic Chain Mapping</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-right mr-4">
            <p className="text-sm font-medium">Demo Mode</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Version 0.2</p>
          </div>

          {onStartTour && (
            <button
              onClick={onStartTour}
              className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="Start tutorial"
            >
              <HelpCircle className="w-5 h-5 text-siemens-green" />
            </button>
          )}

          <button
            onClick={toggleSound}
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
          >
            {soundEnabled ? (
              <Volume2 className="w-5 h-5" />
            ) : (
              <VolumeX className="w-5 h-5" />
            )}
          </button>

          <button
            onClick={toggleDarkMode}
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title={darkMode ? 'Light mode' : 'Dark mode'}
          >
            {darkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
