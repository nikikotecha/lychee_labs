import { motion } from 'framer-motion'

export default function SplashScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center justify-center h-screen bg-gradient-to-br from-siemens-blue to-gray-900"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="w-48 h-48 mx-auto mb-8 rounded-2xl bg-white flex items-center justify-center p-8">
            <img 
              src="/media/Logo_black.png" 
              alt="Company Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-2">
            Siemens NX
          </h1>
          <h2 className="text-2xl font-light text-siemens-green mb-4">
            URDF Exporter
          </h2>
          <p className="text-gray-400 text-sm">
            Demo Version 0.2
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-8"
        >
          <div className="w-48 h-1 mx-auto bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ delay: 1.2, duration: 1.3 }}
              className="h-full bg-siemens-green"
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
