import { useState } from 'react';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import InitialPlanningScreen from '@/components/InitialPlanningScreen';
import TripPlannerScreen from '@/components/TripPlannerScreen';
import { TripDetails } from '@/types';

function App() {
  const [tripDetails, setTripDetails] = useState<TripDetails | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {tripDetails ? (
          <TripPlannerScreen tripDetails={tripDetails} />
        ) : (
          <InitialPlanningScreen onPlanningComplete={setTripDetails} />
        )}
      </main>
      <Toaster />
    </div>
  );
}

export default App;