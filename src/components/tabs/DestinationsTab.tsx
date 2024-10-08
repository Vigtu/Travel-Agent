import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import type { TripDetails } from '@/types';
import { toast } from '@/hooks/use-toast';
import { MapPin } from 'lucide-react';
import ResponsiveSidebar from '@/components/ResponsiveSidebar';
import AnimatedAccordion from '@/components/AnimatedAccordion';
import TravelConfirmationModal from '@/components/TravelConfirmationModal';
import useLocalStorage from '@/hooks/useLocalStorage';

interface DestinationsTabProps {
  tripDetails: TripDetails;
}

const DestinationsTab = ({ tripDetails }: DestinationsTabProps) => {
  const [destinations, setDestinations] = useLocalStorage<{ name: string }[]>('destinations', []);
  const [newDestination, setNewDestination] = useState('');
  const [showNewFeatures, setShowNewFeatures] = useLocalStorage('showNewFeatures', false);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isConfirmButtonEnabled, setIsConfirmButtonEnabled] = useState(false);

  useEffect(() => {
    setIsConfirmButtonEnabled(destinations.length >= 1 && destinations.length <= 3);
  }, [destinations]);

  const addDestination = () => {
    if (newDestination && destinations.length < 3) {
      setDestinations([...destinations, { name: newDestination }]);
      setNewDestination('');
    } else if (destinations.length >= 3) {
      toast({
        title: "Maximum Destinations Reached",
        description: "You can only add up to 3 destinations.",
        variant: "destructive",
      });
    }
  };

  const removeDestination = (index: number) => {
    setDestinations(destinations.filter((_, i) => i !== index));
  };

  const handleConfirmDestinations = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    toast({
      title: "Destinations Confirmed",
      description: "Your destinations have been saved successfully.",
    });
    setShowNewFeatures(true);
    setShowConfirmModal(false);
  };

  const mockTripData = {
    introduction: "Welcome to your amazing trip! Get ready for an unforgettable experience.",
    introImage: "/images/trip-intro.jpg",
    flightDetails: {
      departure: "New York (JFK) - June 15, 2023",
      return: "Paris (CDG) - June 22, 2023",
      airline: "Air France",
      price: "$850",
      duration: "7h 25m"
    },
    flightImage: "/images/airline-logo.png"
  };

  return (
    <div className="flex h-[calc(100vh-20rem)]">
      <ResponsiveSidebar className="w-full max-w-md">
        <div className="space-y-4 px-4">
          <Input
            placeholder="Add destination"
            value={newDestination}
            onChange={(e) => setNewDestination(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addDestination()}
            className="border-gray-300 focus:border-primary focus:ring-primary"
          />
          <Button 
            onClick={addDestination} 
            disabled={destinations.length >= 3 || !newDestination} 
            className="w-full bg-primary hover:bg-primary-600 text-white"
          >
            Add Destination
          </Button>
        </div>
        <div className="mt-4 px-4">
          {destinations.map((dest, index) => (
            <div key={dest.name} className="flex items-center justify-between p-2 hover:bg-gray-100">
              <span className="text-gray-800">{dest.name}</span>
              <Button variant="ghost" size="sm" onClick={() => removeDestination(index)} className="text-gray-500 hover:text-red-500">
                X
              </Button>
            </div>
          ))}
        </div>
        <Separator className="my-4" />
        <div className="px-4">
          <Button 
            onClick={() => setShowConfirmModal(true)} 
            className="w-full bg-primary hover:bg-primary-600 text-white"
            disabled={!isConfirmButtonEnabled}
          >
            Confirm Destinations
          </Button>
        </div>
        <AnimatedAccordion tripData={mockTripData} showNewFeatures={showNewFeatures} />
      </ResponsiveSidebar>
      <div className="flex-1 bg-gray-100 p-4">
        <div className="bg-white rounded-lg shadow-sm p-8 h-full flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-bold mb-2 text-gray-800">Map View</h3>
            <p className="text-gray-600">
              Your destinations will be displayed here on an interactive map.
            </p>
          </div>
        </div>
      </div>
      <TravelConfirmationModal
        showConfirmModal={showConfirmModal}
        destinations={destinations}
        isLoading={isLoading}
        onConfirm={handleConfirmDestinations}
        onCancel={() => setShowConfirmModal(false)}
      />
    </div>
  );
};

export default DestinationsTab;