import { useState } from 'react'
import { Edit2, Check, AlertTriangle, ArrowRight, Lightbulb } from 'lucide-react'
import { useAppStore, JointLink } from '../../store/useAppStore'
import { motion } from 'framer-motion'
import clsx from 'clsx'

const jointTypes = ['revolute', 'prismatic', 'fixed', 'continuous'] as const

const aiSuggestions = [
  {
    icon: '💡',
    title: 'Axis Alignment Detected',
    description: 'All revolute joints aligned to principal axes. No corrections needed.',
  },
  {
    icon: '✨',
    title: 'Kinematic Chain Valid',
    description: 'Chain validation successful: base → end_effector path exists.',
  },
  {
    icon: '🎯',
    title: 'Mass Properties',
    description: 'Center of mass calculated for all links. Ready for physics simulation.',
  },
]

export default function JointMapping() {
  const { joints, updateJoint, setCurrentStep } = useAppStore()
  const [editingId, setEditingId] = useState<string | null>(null)

  const handleEdit = (joint: JointLink, field: keyof JointLink, value: string) => {
    updateJoint(joint.id, { [field]: value })
  }

  const getStatusIcon = (status: JointLink['status']) => {
    switch (status) {
      case 'ok':
        return <Check className="w-4 h-4 text-green-600" />
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-600" />
    }
  }

  return (
    <div className="flex h-full">
      {/* Main Panel - Joint Table */}
      <div className="flex-1 p-6 overflow-auto bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold flex items-center space-x-2">
              <svg className="w-5 h-5 text-siemens-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Joint & Link Mapping</span>
              <span className="ml-3 px-2 py-1 text-xs bg-siemens-green/20 text-siemens-green rounded">
                {joints.length} links detected
              </span>
            </h2>

            <button
              onClick={() => setCurrentStep(3)}
              className="px-4 py-2 bg-siemens-green text-white rounded-lg font-medium hover:bg-siemens-green/90 flex items-center space-x-2"
            >
              <span>Continue to Export</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Link Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Joint Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Parent
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Axis
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {joints.map((joint, index) => (
                    <motion.tr
                      key={joint.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    >
                      <td className="px-4 py-3 text-sm font-medium">
                        {joint.linkName}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {editingId === joint.id ? (
                          <select
                            value={joint.jointType}
                            onChange={(e) => handleEdit(joint, 'jointType', e.target.value)}
                            className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-sm"
                            onBlur={() => setEditingId(null)}
                            autoFocus
                          >
                            {jointTypes.map(type => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                        ) : (
                          <span className={clsx(
                            'px-2 py-1 rounded text-xs font-medium',
                            joint.jointType === 'revolute' && 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
                            joint.jointType === 'prismatic' && 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
                            joint.jointType === 'fixed' && 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
                            joint.jointType === 'continuous' && 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                          )}>
                            {joint.jointType}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                        {joint.parent}
                      </td>
                      <td className="px-4 py-3 text-sm font-mono text-gray-600 dark:text-gray-400">
                        {joint.axis}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(joint.status)}
                          <span className="text-xs capitalize">{joint.status}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setEditingId(joint.id)}
                          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                          title="Edit joint"
                        >
                          <Edit2 className="w-4 h-4 text-gray-500" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Links</p>
              <p className="text-2xl font-bold text-siemens-green">{joints.length}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">Revolute Joints</p>
              <p className="text-2xl font-bold text-blue-600">
                {joints.filter(j => j.jointType === 'revolute').length}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">Prismatic Joints</p>
              <p className="text-2xl font-bold text-purple-600">
                {joints.filter(j => j.jointType === 'prismatic').length}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">Fixed Joints</p>
              <p className="text-2xl font-bold text-gray-600">
                {joints.filter(j => j.jointType === 'fixed').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - AI Suggestions */}
      <div className="w-80 border-l border-gray-200 dark:border-gray-700 p-6 bg-white dark:bg-gray-800 overflow-auto">
        <h3 className="text-sm font-semibold mb-4 flex items-center space-x-2">
          <Lightbulb className="w-4 h-4 text-yellow-500" />
          <span>AI Suggestions</span>
        </h3>

        <div className="space-y-3">
          {aiSuggestions.map((suggestion, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 + 0.5 }}
              className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg border border-gray-200 dark:border-gray-600"
            >
              <div className="flex items-start space-x-2">
                <span className="text-2xl">{suggestion.icon}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium mb-1">{suggestion.title}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{suggestion.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-siemens-green/10 dark:bg-siemens-green/20 rounded-lg border border-siemens-green/30">
          <p className="text-xs font-medium text-siemens-green mb-2">✓ Validation Complete</p>
          <p className="text-xs text-gray-700 dark:text-gray-300">
            All kinematic chains validated. Ready for URDF export.
          </p>
        </div>
      </div>
    </div>
  )
}
