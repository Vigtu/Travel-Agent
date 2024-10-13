import React from 'react';
import type { ParsedTripPlan } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle, Plane, Sun, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

interface ConclusionTabProps {
  tripPlan: ParsedTripPlan | null;
}

const ConclusionTab: React.FC<ConclusionTabProps> = ({ tripPlan }) => {
  if (!tripPlan) {
    return <div className="flex items-center justify-center h-full">Loading general information...</div>;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <ScrollArea className="h-full">
      <motion.div
        className="p-6 space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="relative">
          <img
            src={tripPlan.conclusionImage || 'https://source.unsplash.com/random/800x400/?travel'}
            alt="Trip conclusion"
            className="w-full h-64 object-cover rounded-xl shadow-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-xl" />
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h2 className="text-3xl font-bold mb-2">Your {tripPlan.destination} Adventure Awaits!</h2>
            <p className="text-lg">Get ready for an unforgettable journey</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl font-bold text-gray-800">
                <CheckCircle className="w-8 h-8 mr-3 text-green-500" />
                Trip Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-700 leading-relaxed">{tripPlan.conclusion}</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-blue-50 shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-4 flex items-center">
              <Plane className="w-8 h-8 text-blue-500 mr-3" />
              <div>
                <h4 className="font-semibold text-gray-800">Flight</h4>
                <p className="text-sm text-gray-600">{tripPlan.flightDetails.airline}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-yellow-50 shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-4 flex items-center">
              <Sun className="w-8 h-8 text-yellow-500 mr-3" />
              <div>
                <h4 className="font-semibold text-gray-800">Weather</h4>
                <p className="text-sm text-gray-600">Perfect for your trip!</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-green-50 shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-4 flex items-center">
              <MapPin className="w-8 h-8 text-green-500 mr-3" />
              <div>
                <h4 className="font-semibold text-gray-800">Destination</h4>
                <p className="text-sm text-gray-600">{tripPlan.destination}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-2">Final Thoughts</h3>
              <p className="text-lg">
                Your journey to {tripPlan.destination} is about to begin. Embrace the adventure,
                create lasting memories, and enjoy every moment of your trip!
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </ScrollArea>
  );
};

export default ConclusionTab;
