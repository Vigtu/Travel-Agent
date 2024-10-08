import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import PlanningForm from '@/components/PlanningForm';
import type { TripDetails } from '@/types';

interface InitialPlanningScreenProps {
  onPlanningComplete: (tripDetails: TripDetails) => void;
}

const InitialPlanningScreen = ({ onPlanningComplete }: InitialPlanningScreenProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-gray-50">
      <h1 className="text-5xl font-bold mb-4 text-gray-800">Where do you want to go?</h1>
      <p className="text-xl mb-8 text-gray-600">Plan your perfect trip with TravelAI</p>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="lg" className="bg-primary hover:bg-primary-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
            Start Planning
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-800">Plan Your Trip</DialogTitle>
          </DialogHeader>
          <PlanningForm onSubmit={(details) => {
            onPlanningComplete(details);
            setOpen(false);
          }} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InitialPlanningScreen;