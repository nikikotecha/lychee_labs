import { Check } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import clsx from 'clsx'

const steps = [
  { number: 1, title: 'Load Assembly', description: 'Import NX file' },
  { number: 2, title: 'Joint & Link Mapping', description: 'Auto-detect kinematics' },
  { number: 3, title: 'Export & Validate', description: 'Generate URDF' },
]

export default function StepNavigation() {
  const { currentStep, setCurrentStep, selectedFile } = useAppStore()

  return (
    <nav id="step-navigation" className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="max-w-7xl mx-auto">
        <ol className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isActive = currentStep === step.number
            const isCompleted = currentStep > step.number
            const isClickable = step.number === 1 || (step.number === 2 && selectedFile) || (step.number === 3 && currentStep >= 3)

            return (
              <li key={step.number} className="flex items-center flex-1">
                <div className="flex items-center w-full">
                  <button
                    onClick={() => isClickable && setCurrentStep(step.number as 1 | 2 | 3)}
                    disabled={!isClickable}
                    className={clsx(
                      'flex items-center space-x-3 p-3 rounded-lg transition-all w-full',
                      isActive && 'bg-siemens-green/10 dark:bg-siemens-green/20',
                      isClickable && 'hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer',
                      !isClickable && 'cursor-not-allowed opacity-50'
                    )}
                  >
                    <div
                      className={clsx(
                        'flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-colors',
                        isCompleted && 'bg-siemens-green text-white',
                        isActive && !isCompleted && 'bg-siemens-green text-white ring-4 ring-siemens-green/20',
                        !isActive && !isCompleted && 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                      )}
                    >
                      {isCompleted ? <Check className="w-5 h-5" /> : step.number}
                    </div>
                    <div className="text-left">
                      <p className={clsx(
                        'font-medium',
                        isActive && 'text-siemens-green',
                        !isActive && 'text-gray-700 dark:text-gray-300'
                      )}>
                        {step.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {step.description}
                      </p>
                    </div>
                  </button>
                </div>

                {index < steps.length - 1 && (
                  <div className="flex-1 h-0.5 mx-4 bg-gray-200 dark:bg-gray-700">
                    <div
                      className={clsx(
                        'h-full transition-all duration-500',
                        isCompleted ? 'bg-siemens-green w-full' : 'bg-gray-200 dark:bg-gray-700 w-0'
                      )}
                    />
                  </div>
                )}
              </li>
            )
          })}
        </ol>
      </div>
    </nav>
  )
}
