import { useState } from 'react';
import { format } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import type { TripDetails, ParsedTripPlan } from '@/types';
import DestinationsTab from '@/components/tabs/DestinationsTab';
import ActivitiesTab from '@/components/tabs/ActivitiesTab';
import AccommodationsTab from '@/components/tabs/AccommodationsTab';
import TipsTab from '@/components/tabs/TipsTab';
import ConclusionTab from '@/components/tabs/ConclusionTab';
import { parseTripPlan } from '@/utils/tripPlanParser';

interface TripPlannerScreenProps {
  tripDetails: TripDetails;
}

const TripPlannerScreen = ({ tripDetails }: TripPlannerScreenProps) => {
  const [activeTab, setActiveTab] = useState('destinations');
  const [progress, setProgress] = useState(0);
  const [tripPlan, setTripPlan] = useState<ParsedTripPlan | null>(null);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const progressMap: { [key: string]: number } = {
      destinations: 20,
      general: 40,
      activities: 60,
      accommodations: 80,
      tips: 100,
    };
    setProgress(progressMap[value]);
  };

  const handleTripPlanUpdate = (apiResponse: string) => {
    const parsedPlan = parseTripPlan(apiResponse);
    setTripPlan(parsedPlan);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-gray-50">
      <div className="bg-white shadow-sm p-4">
        <h2 className="text-2xl font-bold text-gray-800">{tripDetails.name}</h2>
        <p className="text-sm text-gray-600 mt-1">
          {tripDetails.startDate && format(tripDetails.startDate, 'MMMM d, yyyy')} - {tripDetails.endDate && format(tripDetails.endDate, 'MMMM d, yyyy')}
        </p>
      </div>
      <div className="flex-grow bg-white shadow-sm flex flex-col overflow-hidden">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="flex flex-col h-full">
          <TabsList className="flex justify-between p-1 bg-gray-100">
            <TabsTrigger value="destinations" className="flex-1 data-[state=active]:bg-white data-[state=active]:text-primary">Destinations</TabsTrigger>
            <TabsTrigger value="general" className="flex-1 data-[state=active]:bg-white data-[state=active]:text-primary" disabled={!tripPlan}>General</TabsTrigger>
            <TabsTrigger value="activities" className="flex-1 data-[state=active]:bg-white data-[state=active]:text-primary" disabled={!tripPlan}>Activities</TabsTrigger>
            <TabsTrigger value="accommodations" className="flex-1 data-[state=active]:bg-white data-[state=active]:text-primary" disabled={!tripPlan}>Accommodations</TabsTrigger>
            <TabsTrigger value="tips" className="flex-1 data-[state=active]:bg-white data-[state=active]:text-primary" disabled={!tripPlan}>Tips</TabsTrigger>
          </TabsList>
          <Progress 
            value={progress} 
            className="w-full h-1 bg-gray-200" 
            aria-label={`Trip planning progress: ${progress}% complete`}
          />
          <div className="flex-grow overflow-hidden">
            <TabsContent value="destinations" className="h-full">
              <DestinationsTab tripDetails={tripDetails} onTripPlanUpdate={handleTripPlanUpdate} />
            </TabsContent>
            <TabsContent value="general" className="h-full">
              <ConclusionTab tripPlan={tripPlan} />
            </TabsContent>
            <TabsContent value="activities" className="h-full">
              <ActivitiesTab tripPlan={tripPlan} />
            </TabsContent>
            <TabsContent value="accommodations" className="h-full">
              <AccommodationsTab tripPlan={tripPlan} />
            </TabsContent>
            <TabsContent value="tips" className="h-full">
              <TipsTab tripPlan={tripPlan} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default TripPlannerScreen;
