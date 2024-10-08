import { motion } from 'framer-motion'
import { Globe } from 'lucide-react'

interface FirstTimeLoaderProps {
  isLoading: boolean
  isFirstApiCall: boolean
}

export default function FirstTimeLoader({ isLoading, isFirstApiCall }: FirstTimeLoaderProps) {
  if (!isFirstApiCall || !isLoading) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mt-6 text-center"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="inline-block"
      >
        <Globe className="h-12 w-12 text-green-500" />
      </motion.div>
      <p className="mt-2 text-gray-600">Planning your dream vacation...</p>
    </motion.div>
  )
}