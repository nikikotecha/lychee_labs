import { useState } from 'react'
import { Upload, FolderTree, Play, AlertCircle } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import { motion } from 'framer-motion'

interface ComponentNode {
  id: string
  name: string
  type: string
  children?: ComponentNode[]
}

const mockAssembly: ComponentNode = {
  id: '1',
  name: 'robot_assembly.prt',
  type: 'assembly',
  children: [
    {
      id: '2',
      name: 'base_structure',
      type: 'part',
      children: [
        { id: '3', name: 'base_link', type: 'body' },
        { id: '4', name: 'mounting_plate', type: 'body' },
      ],
    },
    {
      id: '5',
      name: 'arm_assembly',
      type: 'assembly',
      children: [
        { id: '6', name: 'shoulder_link', type: 'body' },
        { id: '7', name: 'upper_arm_link', type: 'body' },
        { id: '8', name: 'forearm_link', type: 'body' },
        { id: '9', name: 'wrist_assembly', type: 'assembly', children: [
          { id: '10', name: 'wrist_1_link', type: 'body' },
          { id: '11', name: 'wrist_2_link', type: 'body' },
          { id: '12', name: 'wrist_3_link', type: 'body' },
        ]},
      ],
    },
    {
      id: '13',
      name: 'end_effector',
      type: 'assembly',
      children: [
        { id: '14', name: 'gripper_left', type: 'body' },
        { id: '15', name: 'gripper_right', type: 'body' },
        { id: '16', name: 'camera_link', type: 'body' },
        { id: '17', name: 'tool_link', type: 'body' },
      ],
    },
  ],
}

const TreeNode = ({ node, level = 0 }: { node: ComponentNode; level?: number }) => {
  const [expanded, setExpanded] = useState(true)
  
  const getIcon = (type: string) => {
    switch (type) {
      case 'assembly':
        return '📦'
      case 'part':
        return '🔧'
      case 'body':
        return '⚙️'
      default:
        return '📄'
    }
  }

  return (
    <div>
      <div
        className="flex items-center space-x-2 py-1.5 px-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer"
        style={{ paddingLeft: `${level * 20 + 8}px` }}
        onClick={() => node.children && setExpanded(!expanded)}
      >
        {node.children && (
          <span className="text-gray-500 text-sm">
            {expanded ? '▼' : '▶'}
          </span>
        )}
        <span className="text-lg">{getIcon(node.type)}</span>
        <span className="text-sm font-medium">{node.name}</span>
        <span className="text-xs text-gray-500 dark:text-gray-400">({node.type})</span>
      </div>
      {expanded && node.children && (
        <div>
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function LoadAssembly() {
  const { selectedFile, fileName, setSelectedFile, setCurrentStep, setProcessing } = useAppStore()
  const [analyzing, setAnalyzing] = useState(false)

  const handleFileSelect = async () => {
    setProcessing(true)
    // Simulate file selection
    await new Promise(resolve => setTimeout(resolve, 800))
    setSelectedFile('/nx/projects/robot_assembly.prt', 'robot_assembly.prt')
    setProcessing(false)
  }

  const handleAnalyze = async () => {
    setAnalyzing(true)
    // Simulate analysis
    await new Promise(resolve => setTimeout(resolve, 2000))
    setAnalyzing(false)
    setCurrentStep(2)
  }

  return (
    <div className="flex h-full">
      {/* Left Panel - File Selection */}
      <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 p-6 bg-white dark:bg-gray-800">
        <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2">
          <Upload className="w-5 h-5 text-siemens-green" />
          <span>Import Assembly</span>
        </h2>

        <div className="space-y-4">
          <button
            id="file-upload-zone"
            onClick={handleFileSelect}
            className="w-full p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-siemens-green hover:bg-siemens-green/5 transition-colors"
          >
            <Upload className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p className="text-sm font-medium">Select NX Assembly File</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">.prt or .asm files</p>
          </button>

          {selectedFile && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-siemens-green/10 dark:bg-siemens-green/20 p-4 rounded-lg"
            >
              <div className="flex items-start space-x-3">
                <FolderTree className="w-5 h-5 text-siemens-green mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{fileName}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{selectedFile}</p>
                  <div className="mt-3 pt-3 border-t border-siemens-green/20">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-gray-500">Components:</span>
                        <span className="ml-2 font-medium">17</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Size:</span>
                        <span className="ml-2 font-medium">4.2 MB</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {selectedFile && (
            <motion.button
              id="analyze-button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={handleAnalyze}
              disabled={analyzing}
              className="w-full py-3 bg-siemens-green text-white rounded-lg font-medium hover:bg-siemens-green/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {analyzing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Analyzing Kinematics...</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  <span>Analyze Kinematics</span>
                </>
              )}
            </motion.button>
          )}

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-blue-900 dark:text-blue-300">Demo Mode</p>
                <p className="text-blue-700 dark:text-blue-400 text-xs mt-1">
                  File selection is simulated. In production, this would open the native NX file browser.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Assembly Tree */}
      <div className="flex-1 p-6 bg-gray-50 dark:bg-gray-900">
        <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2">
          <FolderTree className="w-5 h-5 text-siemens-green" />
          <span>Component Hierarchy</span>
        </h2>

        {selectedFile ? (
          <motion.div
            id="component-tree"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 overflow-auto max-h-[calc(100vh-300px)]"
          >
            <TreeNode node={mockAssembly} />
          </motion.div>
        ) : (
          <div className="flex items-center justify-center h-[calc(100vh-300px)] text-gray-400">
            <div className="text-center">
              <FolderTree className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <p className="text-sm">No assembly loaded</p>
              <p className="text-xs mt-1">Select a file to view the component tree</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
