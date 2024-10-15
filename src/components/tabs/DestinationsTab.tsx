import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import type { TripDetails, ParsedTripPlan } from '@/types';
import { toast } from '@/hooks/use-toast';
import { Plus, X } from 'lucide-react';
import TravelConfirmationModal from '@/components/TravelConfirmationModal';
import { getTravelPlan } from '@/api/travelApi';
import { parseTripPlan } from '@/utils/tripPlanParser';
import { Suspense } from 'react';
import MapboxMap from '@/components/tabs/MapboxMap';

interface DestinationsTabProps {
  tripDetails: TripDetails;
  onTripPlanUpdate: (apiResponse: string) => void;
}

const DestinationsTab = ({ tripDetails, onTripPlanUpdate }: DestinationsTabProps) => {
  const [destinations, setDestinations] = useState<{ name: string }[]>([]);
  const [newDestination, setNewDestination] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isConfirmButtonEnabled, setIsConfirmButtonEnabled] = useState(false);
  const [_tripPlan, setTripPlan] = useState<ParsedTripPlan | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [mapKey, setMapKey] = useState(0);

  useEffect(() => {
    setIsConfirmButtonEnabled(destinations.length >= 1 && destinations.length <= 3);
  }, [destinations]);

  useEffect(() => {
    // Clear destinations and add the new one from tripDetails
    if (tripDetails.destinations) {
      setDestinations([{ name: tripDetails.destinations }]);
      setMapKey(prevKey => prevKey + 1);
    }
  }, [tripDetails]);

  const addDestination = () => {
    if (newDestination && destinations.length < 3) {
      const updatedDestinations = [...destinations, { name: newDestination }];
      setDestinations(updatedDestinations);
      setNewDestination('');
      setMapKey(prevKey => prevKey + 1);
    } else if (destinations.length >= 3) {
      toast({
        title: "Maximum Destinations Reached",
        description: "You can only add up to 3 destinations.",
        variant: "destructive",
      });
    }
  };

  const removeDestination = (index: number) => {
    const updatedDestinations = destinations.filter((_, i) => i !== index);
    setDestinations(updatedDestinations);
    setMapKey(prevKey => prevKey + 1);
  };

  const handleConfirmDestinations = async () => {
    setIsLoading(true);
    try {
      const response = await getTravelPlan(tripDetails, destinations.map(d => d.name));
      const parsedPlan = parseTripPlan(response);
      setTripPlan(parsedPlan);
      onTripPlanUpdate(response);
      toast({
        title: "Destinations Confirmed",
        description: "Your travel plan has been generated successfully.",
      });
    } catch (error) {
      console.error('API Error:', error);
      toast({
        title: "Error",
        description: "Failed to generate travel plan. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setShowConfirmModal(false);
    }
  };

  return (
    <div className="flex h-full bg-gray-50">
      <div className={`bg-white shadow-md transition-all duration-300 ${isMinimized ? 'w-16' : 'w-1/3 min-w-[300px] max-w-[400px]'}`}>
        <div className="p-4 flex justify-between items-center">
          <h3 className={`font-semibold ${isMinimized ? 'hidden' : 'block'}`}>Your Destinations</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-gray-500 hover:text-gray-700"
          >
            {isMinimized ? <Plus className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </Button>
        </div>
        {!isMinimized && (
          <>
            <div className="p-4 space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Add destination"
                  value={newDestination}
                  onChange={(e) => setNewDestination(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addDestination()}
                  className="flex-grow"
                />
                <Button 
                  onClick={addDestination} 
                  disabled={destinations.length >= 3 || !newDestination}
                  className="bg-primary hover:bg-primary-600 text-white"
                >
                  Add
                </Button>
              </div>
              <div className="space-y-2">
                {destinations.map((dest, index) => (
                  <div key={dest.name} className="flex items-center justify-between p-2 bg-gray-100 rounded">
                    <span className="text-gray-800">{dest.name}</span>
                    <Button variant="ghost" size="sm" onClick={() => removeDestination(index)} className="text-gray-500 hover:text-red-500">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <Separator className="my-4" />
            <div className="px-4 pb-4">
              <Button 
                onClick={() => setShowConfirmModal(true)} 
                className="w-full bg-primary hover:bg-primary-600 text-white"
                disabled={!isConfirmButtonEnabled}
              >
                Confirm Destinations
              </Button>
            </div>
          </>
        )}
      </div>
      <div className="flex-1">
        <Suspense fallback={
          <div className="flex items-center justify-center h-full bg-gray-100">
            <p className="text-gray-600">Loading map...</p>
          </div>
        }>
          <MapboxMap 
            key={mapKey}
            destinations={destinations} 
          />
        </Suspense>
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
