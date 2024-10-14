import { useState } from 'react';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import InitialPlanningScreen from '@/components/InitialPlanningScreen';
import TripPlannerScreen from '@/components/TripPlannerScreen';
import type { TripDetails } from '@/types';

function App() {
  const [tripDetails, setTripDetails] = useState<TripDetails | null>(null);

  const handlePlanningComplete = (details: TripDetails) => {
    setTripDetails(details);
    console.log("Trip details saved:", details); // For debugging
  };

  const handleResetApp = () => {
    setTripDetails(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onResetApp={handleResetApp} />
      <main className="container mx-auto px-4 py-8">
        {tripDetails ? (
          <TripPlannerScreen tripDetails={tripDetails} />
        ) : (
          <InitialPlanningScreen onPlanningComplete={handlePlanningComplete} />
        )}
      </main>
      <Toaster />
    </div>
  );
}

export default App;