import { useState } from 'react'
import { Download, Play, FileText, CheckCircle } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import { motion, AnimatePresence } from 'framer-motion'

const logMessages = [
  { time: '0.00s', message: 'Initializing URDF generator...', type: 'info' },
  { time: '0.12s', message: 'Parsing kinematic chain...', type: 'info' },
  { time: '0.24s', message: 'Resolving joint dependencies (1/12)', type: 'progress' },
  { time: '0.36s', message: 'Resolving joint dependencies (4/12)', type: 'progress' },
  { time: '0.48s', message: 'Resolving joint dependencies (8/12)', type: 'progress' },
  { time: '0.60s', message: 'Resolving joint dependencies (12/12)', type: 'progress' },
  { time: '0.72s', message: '✓ Kinematic chain resolved successfully', type: 'success' },
  { time: '0.84s', message: 'Calculating mass properties...', type: 'info' },
  { time: '0.96s', message: 'Computing inertia tensors...', type: 'info' },
  { time: '1.08s', message: 'Generating collision meshes...', type: 'info' },
  { time: '1.20s', message: 'AI correction: Adjusted wrist_2 axis alignment', type: 'warning' },
  { time: '1.32s', message: 'Exporting URDF XML...', type: 'info' },
  { time: '1.44s', message: '✓ URDF file generated: myrobot.urdf', type: 'success' },
  { time: '1.56s', message: 'Validating against URDF schema...', type: 'info' },
  { time: '1.68s', message: '✓ URDF validation passed', type: 'success' },
]

export default function ExportValidate() {
  const { exportWithIsaac, setExportWithIsaac, setShowSuccessModal, setExportComplete } = useAppStore()
  const [isExporting, setIsExporting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [logs, setLogs] = useState<typeof logMessages>([])
  const [exportDone, setExportDone] = useState(false)

  const handleExport = async () => {
    setIsExporting(true)
    setProgress(0)
    setLogs([])
    setExportDone(false)

    // Simulate log streaming
    for (let i = 0; i < logMessages.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 120))
      setLogs(prev => [...prev, logMessages[i]])
      setProgress(((i + 1) / logMessages.length) * 100)
    }

    await new Promise(resolve => setTimeout(resolve, 300))
    setIsExporting(false)
    setExportDone(true)
    setExportComplete(true)
    
    // Show success modal after a brief delay
    setTimeout(() => {
      setShowSuccessModal(true)
    }, 500)
  }

  const handleDownloadPDF = () => {
    // Mock PDF download
    console.log('Downloading export summary PDF...')
  }

  return (
    <div className="flex h-full">
      {/* Main Panel */}
      <div className="flex-1 p-6 overflow-auto bg-gray-50 dark:bg-gray-900">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Export Options */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <Download className="w-5 h-5 text-siemens-green" />
              <span>Export Configuration</span>
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    exportWithIsaac ? 'bg-siemens-green text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-500'
                  }`}>
                    <Play className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-medium">Isaac Sim Preview</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Validate in NVIDIA Isaac Sim after export
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={exportWithIsaac}
                    onChange={(e) => setExportWithIsaac(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-siemens-green/20 dark:peer-focus:ring-siemens-green/40 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-siemens-green"></div>
                </label>
              </div>

              <button
                onClick={handleExport}
                disabled={isExporting || exportDone}
                className="w-full py-4 bg-siemens-green text-white rounded-lg font-medium hover:bg-siemens-green/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-lg"
              >
                {isExporting ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Generating URDF...</span>
                  </>
                ) : exportDone ? (
                  <>
                    <CheckCircle className="w-6 h-6" />
                    <span>Export Complete</span>
                  </>
                ) : (
                  <>
                    <Download className="w-6 h-6" />
                    <span>Generate URDF</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <AnimatePresence>
            {isExporting && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Export Progress</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{Math.round(progress)}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-siemens-green"
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Status Console */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gray-800 dark:bg-gray-900 px-4 py-2 border-b border-gray-700 flex items-center justify-between">
              <span className="text-sm font-mono text-gray-300">Status Console</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-xs text-gray-400">Ready</span>
              </div>
            </div>
            <div className="bg-gray-900 p-4 font-mono text-xs text-green-400 h-64 overflow-auto">
              {logs.length === 0 ? (
                <div className="text-gray-500">Waiting for export command...</div>
              ) : (
                logs.map((log, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`mb-1 ${
                      log.type === 'error' ? 'text-red-400' :
                      log.type === 'warning' ? 'text-yellow-400' :
                      log.type === 'success' ? 'text-green-400' :
                      'text-gray-400'
                    }`}
                  >
                    <span className="text-gray-600">[{log.time}]</span> {log.message}
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* Export Summary */}
          {exportDone && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 mt-1" />
                  <div>
                    <h3 className="font-semibold text-green-900 dark:text-green-300 mb-2">
                      Export Successful
                    </h3>
                    <div className="space-y-1 text-sm text-green-800 dark:text-green-400">
                      <p>✓ URDF file: <code className="px-2 py-0.5 bg-green-100 dark:bg-green-900/40 rounded">myrobot.urdf</code></p>
                      <p>✓ Export location: <code className="px-2 py-0.5 bg-green-100 dark:bg-green-900/40 rounded">/exports/</code></p>
                      <p>✓ File size: 24.8 KB</p>
                      <p>✓ Validation: Passed</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleDownloadPDF}
                  className="px-4 py-2 bg-white dark:bg-gray-800 border border-green-300 dark:border-green-700 text-green-700 dark:text-green-400 rounded-lg text-sm font-medium hover:bg-green-50 dark:hover:bg-green-900/30 flex items-center space-x-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>Download Summary PDF</span>
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Right Panel - Export Statistics */}
      <div className="w-80 border-l border-gray-200 dark:border-gray-700 p-6 bg-white dark:bg-gray-800 overflow-auto">
        <h3 className="text-sm font-semibold mb-4">Export Statistics</h3>
        
        <div className="space-y-3">
          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Processing Time</p>
            <p className="text-2xl font-bold text-siemens-green">1.68s</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">vs. 4 hours manual</p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">AI Corrections</p>
            <p className="text-2xl font-bold">1</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Auto-fixed axis alignment</p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Confidence Score</p>
            <p className="text-2xl font-bold text-green-600">98.5%</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Ready for production</p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Comparison</p>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Manual URDF</span>
                <span className="font-medium">~4 hours</span>
              </div>
              <div className="flex justify-between text-siemens-green font-medium">
                <span>AI-Assisted</span>
                <span>30 seconds</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
              <p className="font-bold text-siemens-green">480x faster</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
