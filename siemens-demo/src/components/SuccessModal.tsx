import { X, Play, CheckCircle, Send } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import { motion, AnimatePresence } from 'framer-motion'

export default function SuccessModal() {
  const { showSuccessModal, setShowSuccessModal, exportWithIsaac } = useAppStore()

  const handleClose = () => {
    setShowSuccessModal(false)
  }

  const handleOpenIsaac = () => {
    console.log('Opening Isaac Sim preview...')
    // In a real implementation, this would open the video player
    alert('Isaac Sim Preview: In this demo, a pre-recorded video would play showing the robot animated in Isaac Sim with full physics validation.')
  }

  return (
    <AnimatePresence>
      {showSuccessModal && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border-2 border-siemens-green">
              {/* Header */}
              <div className="bg-gradient-to-r from-siemens-green to-siemens-blue p-6 text-white relative">
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-1">✅ Export Complete</h2>
                    <p className="text-white/90 text-sm">URDF successfully generated and validated</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Validation Results */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                      <span className="font-semibold text-green-900 dark:text-green-300">Robot Kinematics</span>
                    </div>
                    <p className="text-2xl font-bold text-green-700 dark:text-green-400">OK</p>
                    <p className="text-xs text-green-600 dark:text-green-500 mt-1">All joints validated</p>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                      <span className="font-semibold text-green-900 dark:text-green-300">Collisions</span>
                    </div>
                    <p className="text-2xl font-bold text-green-700 dark:text-green-400">None</p>
                    <p className="text-xs text-green-600 dark:text-green-500 mt-1">Clean geometry</p>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span className="font-semibold text-blue-900 dark:text-blue-300">Mass Properties</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">Valid</p>
                    <p className="text-xs text-blue-600 dark:text-blue-500 mt-1">Inertia calculated</p>
                  </div>

                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      <span className="font-semibold text-purple-900 dark:text-purple-300">URDF Schema</span>
                    </div>
                    <p className="text-2xl font-bold text-purple-700 dark:text-purple-400">Passed</p>
                    <p className="text-xs text-purple-600 dark:text-purple-500 mt-1">XML validated</p>
                  </div>
                </div>

                {/* Isaac Sim Section */}
                {exportWithIsaac && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gradient-to-r from-siemens-green/10 to-siemens-blue/10 dark:from-siemens-green/20 dark:to-siemens-blue/20 p-4 rounded-lg border border-siemens-green/30"
                  >
                    <p className="font-semibold mb-3 flex items-center space-x-2">
                      <Play className="w-5 h-5 text-siemens-green" />
                      <span>URDF Validated in Isaac Sim</span>
                    </p>
                    <button
                      onClick={handleOpenIsaac}
                      className="w-full py-3 bg-gradient-to-r from-siemens-green to-siemens-blue text-white rounded-lg font-medium hover:opacity-90 flex items-center justify-center space-x-2"
                    >
                      <Play className="w-5 h-5" />
                      <span>Open in Isaac Sim</span>
                    </button>
                  </motion.div>
                )}

                {/* Next Steps */}
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                  <p className="font-semibold mb-2 flex items-center space-x-2">
                    <Send className="w-4 h-4 text-siemens-green" />
                    <span>Next Steps</span>
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li className="flex items-start space-x-2">
                      <span className="text-siemens-green mt-0.5">→</span>
                      <span>Send to ROS 2 pipeline for robot control integration</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-siemens-green mt-0.5">→</span>
                      <span>Test in Gazebo or Isaac Sim simulation environment</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-siemens-green mt-0.5">→</span>
                      <span>Deploy to physical robot hardware</span>
                    </li>
                  </ul>
                </div>

                {/* Stats */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Time saved:</span>
                      <span className="ml-2 font-bold text-siemens-green">~3h 59m 30s</span>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-500 dark:text-gray-400">Efficiency:</span>
                      <span className="ml-2 font-bold text-siemens-green">480x faster</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 flex justify-end space-x-3">
                <button
                  onClick={handleClose}
                  className="px-6 py-2 bg-siemens-green text-white rounded-lg font-medium hover:bg-siemens-green/90"
                >
                  Done
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
