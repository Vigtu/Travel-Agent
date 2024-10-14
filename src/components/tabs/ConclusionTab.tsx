import type { ParsedTripPlan } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plane, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

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

  // Function to remove markdown from text
  const removeMarkdown = (text: string) => {
    return text.replace(/!\[.*?\]\(.*?\)/g, '').trim();
  };

  return (
    <ScrollArea className="h-full">
      <motion.div
        className="p-6 space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="relative rounded-xl overflow-hidden shadow-lg">
          <img
            src={tripPlan.conclusionImage || 'https://source.unsplash.com/random/800x400/?travel'}
            alt="Trip conclusion"
            className="w-full h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <h2 className="text-4xl font-bold mb-2">Your {tripPlan.destination} Adventure Awaits!</h2>
            <p className="text-xl">Get ready for an unforgettable journey</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800">
                Trip Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-700 leading-relaxed">{removeMarkdown(tripPlan.conclusion)}</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold">Flight Details</h3>
                <Plane className="w-8 h-8" />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="font-semibold">Departure</p>
                  <p>{tripPlan.flightDetails.departure || 'Not specified'}</p>
                </div>
                <div>
                  <p className="font-semibold">Return</p>
                  <p>{tripPlan.flightDetails.return || 'Not specified'}</p>
                </div>
                <div>
                  <p className="font-semibold">Airline</p>
                  <p>{tripPlan.flightDetails.airline || 'Not specified'}</p>
                </div>
                <div>
                  <p className="font-semibold">Duration</p>
                  <p>{tripPlan.flightDetails.duration || 'Not specified'}</p>
                </div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <p className="text-lg font-semibold mb-2">Ready to take off?</p>
                <p className="mb-4">Secure your flight now and start your adventure to {tripPlan.destination}!</p>
                {tripPlan.flightDetails.bookingUrl && (
                  <Button 
                    className="w-full bg-white text-blue-600 hover:bg-blue-100 transition-colors duration-300"
                    onClick={() => window.open(tripPlan.flightDetails.bookingUrl, '_blank')}
                  >
                    Book Flight for {tripPlan.flightDetails.price} <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
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
