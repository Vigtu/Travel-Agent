import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { TripDetails } from '@/types';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from '@/hooks/use-toast';
import { MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

interface DestinationsTabProps {
  tripDetails: TripDetails;
}

const DestinationsTab = ({ tripDetails }: DestinationsTabProps) => {
  const [destinations, setDestinations] = useState<string[]>([]);
  const [newDestination, setNewDestination] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const addDestination = () => {
    if (newDestination && destinations.length < 10) {
      setDestinations([...destinations, newDestination]);
      setNewDestination('');
    }
  };

  const removeDestination = (index: number) => {
    setDestinations(destinations.filter((_, i) => i !== index));
  };

  const confirmDestinations = () => {
    toast({
      title: "Destinations Confirmed",
      description: "Your destinations have been saved successfully.",
    });
  };

  return (
    <div className="flex h-[calc(100vh-20rem)]">
      <div className={`bg-white border-r ${isSidebarOpen ? 'w-80' : 'w-16'} transition-all duration-300 flex flex-col`}>
        <Button
          variant="ghost"
          className="self-end p-2"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <ChevronLeft className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />}
        </Button>
        {isSidebarOpen && (
          <>
            <div className="p-4 space-y-4">
              <Input
                placeholder="Add destination"
                value={newDestination}
                onChange={(e) => setNewDestination(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addDestination()}
                className="border-gray-300 focus:border-primary focus:ring-primary"
              />
              <Button onClick={addDestination} disabled={destinations.length >= 10} className="w-full bg-primary hover:bg-primary-600 text-white">
                Add Destination
              </Button>
            </div>
            <ScrollArea className="flex-1">
              {destinations.map((dest, index) => (
                <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-100">
                  <span className="text-gray-800">{dest}</span>
                  <Button variant="ghost" size="sm" onClick={() => removeDestination(index)} className="text-gray-500 hover:text-red-500">
                    X
                  </Button>
                </div>
              ))}
            </ScrollArea>
            <Separator />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="m-4 bg-primary hover:bg-primary-600 text-white">Confirm Destinations</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Your Destinations</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to confirm these destinations? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={confirmDestinations} className="bg-primary hover:bg-primary-600 text-white">Confirm</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        )}
      </div>
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
    </div>
  );
};

export default DestinationsTab;