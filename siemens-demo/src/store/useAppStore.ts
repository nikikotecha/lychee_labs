import { create } from 'zustand'

export type Step = 1 | 2 | 3

export interface JointLink {
  id: string
  linkName: string
  jointType: 'revolute' | 'prismatic' | 'fixed' | 'continuous'
  parent: string
  axis: string
  status: 'ok' | 'warning' | 'error'
}

export interface AppState {
  // UI State
  currentStep: Step
  darkMode: boolean
  isProcessing: boolean
  soundEnabled: boolean
  
  // File State
  selectedFile: string | null
  fileName: string | null
  
  // Joint/Link Data
  joints: JointLink[]
  
  // Export State
  exportWithIsaac: boolean
  exportComplete: boolean
  showSuccessModal: boolean
  
  // Actions
  setCurrentStep: (step: Step) => void
  toggleDarkMode: () => void
  toggleSound: () => void
  setSelectedFile: (path: string, name: string) => void
  setProcessing: (processing: boolean) => void
  updateJoint: (id: string, updates: Partial<JointLink>) => void
  setExportWithIsaac: (value: boolean) => void
  setExportComplete: (complete: boolean) => void
  setShowSuccessModal: (show: boolean) => void
  resetApp: () => void
}

const mockJoints: JointLink[] = [
  { id: '1', linkName: 'base_link', jointType: 'fixed', parent: 'world', axis: '-', status: 'ok' },
  { id: '2', linkName: 'shoulder_link', jointType: 'revolute', parent: 'base_link', axis: '0 0 1', status: 'ok' },
  { id: '3', linkName: 'upper_arm_link', jointType: 'revolute', parent: 'shoulder_link', axis: '0 1 0', status: 'ok' },
  { id: '4', linkName: 'forearm_link', jointType: 'revolute', parent: 'upper_arm_link', axis: '0 1 0', status: 'ok' },
  { id: '5', linkName: 'wrist_1_link', jointType: 'revolute', parent: 'forearm_link', axis: '0 0 1', status: 'ok' },
  { id: '6', linkName: 'wrist_2_link', jointType: 'revolute', parent: 'wrist_1_link', axis: '0 1 0', status: 'ok' },
  { id: '7', linkName: 'wrist_3_link', jointType: 'revolute', parent: 'wrist_2_link', axis: '0 0 1', status: 'ok' },
  { id: '8', linkName: 'end_effector', jointType: 'fixed', parent: 'wrist_3_link', axis: '-', status: 'ok' },
  { id: '9', linkName: 'gripper_left', jointType: 'prismatic', parent: 'end_effector', axis: '0 1 0', status: 'ok' },
  { id: '10', linkName: 'gripper_right', jointType: 'prismatic', parent: 'end_effector', axis: '0 -1 0', status: 'ok' },
  { id: '11', linkName: 'camera_link', jointType: 'fixed', parent: 'end_effector', axis: '-', status: 'ok' },
  { id: '12', linkName: 'tool_link', jointType: 'fixed', parent: 'end_effector', axis: '-', status: 'ok' },
]

export const useAppStore = create<AppState>((set) => ({
  // Initial State
  currentStep: 1,
  darkMode: false,
  isProcessing: false,
  soundEnabled: true,
  selectedFile: null,
  fileName: null,
  joints: [],
  exportWithIsaac: true,
  exportComplete: false,
  showSuccessModal: false,
  
  // Actions
  setCurrentStep: (step) => set({ currentStep: step }),
  
  toggleDarkMode: () => set((state) => {
    const newDarkMode = !state.darkMode
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    return { darkMode: newDarkMode }
  }),
  
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
  
  setSelectedFile: (path, name) => set({ 
    selectedFile: path, 
    fileName: name,
    joints: mockJoints // Load mock joints when file is selected
  }),
  
  setProcessing: (processing) => set({ isProcessing: processing }),
  
  updateJoint: (id, updates) => set((state) => ({
    joints: state.joints.map(joint => 
      joint.id === id ? { ...joint, ...updates } : joint
    )
  })),
  
  setExportWithIsaac: (value) => set({ exportWithIsaac: value }),
  
  setExportComplete: (complete) => set({ exportComplete: complete }),
  
  setShowSuccessModal: (show) => set({ showSuccessModal: show }),
  
  resetApp: () => set({
    currentStep: 1,
    isProcessing: false,
    selectedFile: null,
    fileName: null,
    joints: [],
    exportComplete: false,
    showSuccessModal: false,
  }),
}))
