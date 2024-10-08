import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Loader2, Globe } from 'lucide-react'

interface Destination {
  name: string
}

interface TravelConfirmationModalProps {
  showConfirmModal: boolean
  destinations: Destination[]
  isLoading: boolean
  onConfirm: () => void
  onCancel: () => void
}

export default function TravelConfirmationModal({
  showConfirmModal,
  destinations,
  isLoading,
  onConfirm,
  onCancel
}: TravelConfirmationModalProps) {
  return (
    <AnimatePresence>
      {showConfirmModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white rounded-lg p-6 w-full max-w-md"
          >
            <h2 className="text-2xl font-bold mb-4 text-green-600">Confirm Your Adventure</h2>
            {isLoading ? (
              <div className="flex flex-col items-center justify-center mb-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="inline-block mb-4"
                >
                  <Globe className="h-12 w-12 text-green-500" />
                </motion.div>
                <p className="text-gray-600">Planning your dream vacation...</p>
              </div>
            ) : (
              <>
                <p className="text-gray-600 mb-6">Are you ready to embark on this exciting journey?</p>
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Your Destinations:</h3>
                  <ul className="list-disc list-inside">
                    {destinations.map((dest) => (
                      <li key={dest.name} className="text-gray-600">{dest.name}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}
            <div className="flex justify-between">
              <Button variant="outline" onClick={onCancel} className="w-1/2 mr-2" disabled={isLoading}>
                Not Yet
              </Button>
              <Button onClick={onConfirm} disabled={isLoading} className="w-1/2 ml-2 bg-green-500 text-white hover:bg-green-600">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Confirming...
                  </>
                ) : (
                  "Let's Go!"
                )}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}