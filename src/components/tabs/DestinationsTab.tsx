import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import type { TripDetails, ParsedTripPlan } from '@/types';
import { toast } from '@/hooks/use-toast';
import { MapPin, Plane } from 'lucide-react';
import ResponsiveSidebar from '@/components/ResponsiveSidebar';
import TravelConfirmationModal from '@/components/TravelConfirmationModal';
import useLocalStorage from '@/hooks/useLocalStorage';
import { getTravelPlan } from '@/api/travelApi';
import { parseTripPlan } from '@/utils/tripPlanParser';
import BudgetBreakdownChart from '@/components/BudgetBreakdownChart';

interface DestinationsTabProps {
  tripDetails: TripDetails;
  onTripPlanUpdate: (apiResponse: string) => void;
}

const DestinationsTab = ({ tripDetails, onTripPlanUpdate }: DestinationsTabProps) => {
  const [destinations, setDestinations] = useLocalStorage<{ name: string }[]>('destinations', []);
  const [newDestination, setNewDestination] = useState('');
  const [showNewFeatures, setShowNewFeatures] = useLocalStorage('showNewFeatures', false);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isConfirmButtonEnabled, setIsConfirmButtonEnabled] = useState(false);
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [tripPlan, setTripPlan] = useState<ParsedTripPlan | null>(null);

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
    try {
      const response = await getTravelPlan(tripDetails, destinations.map(d => d.name));
      const parsedPlan = parseTripPlan(response);
      setTripPlan(parsedPlan);
      onTripPlanUpdate(response);
      console.log('API Response:', response);
      toast({
        title: "Destinations Confirmed",
        description: "Your travel plan has been generated successfully.",
      });
      setShowNewFeatures(true);
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
    <div className="flex h-full">
      <ResponsiveSidebar className="w-1/3 min-w-[300px] max-w-[400px]">
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
        <div className="mt-4 px-4 max-h-[200px] overflow-y-auto">
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
        {tripPlan && (
          <>
            <Separator className="my-4" />
            <div className="px-4">
              <h3 className="text-lg font-semibold mb-2">Introduction</h3>
              <p className="text-sm text-gray-600 mb-4">{tripPlan.introduction}</p>
              <h3 className="text-lg font-semibold mb-2">Flight Details</h3>
              <div className="space-y-2">
                <p><strong>Departure:</strong> {tripPlan.flightDetails.departure}</p>
                <p><strong>Return:</strong> {tripPlan.flightDetails.return}</p>
                <p><strong>Airline:</strong> {tripPlan.flightDetails.airline}</p>
                <p><strong>Price:</strong> {tripPlan.flightDetails.price}</p>
                <p><strong>Duration:</strong> {tripPlan.flightDetails.duration}</p>
              </div>
            </div>
          </>
        )}
      </ResponsiveSidebar>
      <div className="flex-1 bg-gray-100 p-4 overflow-hidden">
        <div className="bg-white rounded-lg shadow-sm p-8 h-full flex items-center justify-center">
          <div className="text-center">
            {tripPlan ? (
              <>
                <Plane className="w-16 h-16 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold mb-2 text-gray-800">Flight Details</h3>
                <p className="text-gray-600">
                  Your flight to {tripPlan.destination} is booked and ready!
                </p>
              </>
            ) : (
              <>
                <MapPin className="w-16 h-16 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold mb-2 text-gray-800">Map View</h3>
                <p className="text-gray-600">
                  Your destinations will be displayed here on an interactive map.
                </p>
              </>
            )}
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
