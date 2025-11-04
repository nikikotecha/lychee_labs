import { driver, DriveStep } from 'driver.js'
import 'driver.js/dist/driver.css'
import { useEffect } from 'react'

const tourSteps: DriveStep[] = [
  {
    element: '#app-header',
    popover: {
      title: 'Welcome to Siemens NX URDF Exporter',
      description: 'AI-powered tool that converts your NX assemblies to URDF. Let me show you how it works.',
      side: 'bottom',
      align: 'center',
    },
  },
  {
    element: '#step-navigation',
    popover: {
      title: '3-Step Workflow',
      description: 'Follow this simple process: Load Assembly → Map Joints → Export & Validate. Click each step to navigate.',
      side: 'bottom',
      align: 'center',
    },
  },
  {
    element: '#file-upload-zone',
    popover: {
      title: 'Step 1: Load Your NX Assembly',
      description: 'Click here to import your Siemens NX assembly file (.prt or .asm). Our AI will instantly analyze the component hierarchy.',
      side: 'right',
      align: 'start',
    },
  },
  {
    element: '#component-tree',
    popover: {
      title: 'Component Hierarchy',
      description: 'View your assembly structure here. All components are automatically detected and organized.',
      side: 'left',
      align: 'start',
    },
  },
  {
    element: '#analyze-button',
    popover: {
      title: 'AI-Powered Analysis',
      description: 'Click "Analyze Kinematics" to detect joints, links, and kinematic chains automatically.',
      side: 'top',
      align: 'center',
    },
  },
  {
    popover: {
      title: 'Ready to Get Started!',
      description: 'That\'s the basics! Now try loading a file and exporting to URDF. 🚀',
      side: 'top',
      align: 'center',
    },
  },
]

const tourConfig = {
  showProgress: true,
  showButtons: ['next' as const, 'previous' as const, 'close' as const],
  progressText: '{{current}} of {{total}}',
  nextBtnText: 'Next →',
  prevBtnText: '← Back',
  doneBtnText: 'Get Started! 🚀',
  
  // Custom styling to match Siemens theme
  popoverClass: 'siemens-tour-popover',
  
  onDestroyed: () => {
    // Save that user has seen the tour
    localStorage.setItem('siemens-tour-completed', 'true')
  },
}

export const useTour = () => {
  const startTour = () => {
    const driverObj = driver({
      ...tourConfig,
      steps: tourSteps,
    })
    driverObj.drive()
  }

  const hasSeenTour = () => {
    return localStorage.getItem('siemens-tour-completed') === 'true'
  }

  const resetTour = () => {
    localStorage.removeItem('siemens-tour-completed')
  }

  // Auto-start tour on first visit
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasSeenTour()) {
        startTour()
      }
    }, 1500) // Wait 1.5s after splash screen

    return () => clearTimeout(timer)
  }, [])

  return { startTour, hasSeenTour, resetTour }
}
