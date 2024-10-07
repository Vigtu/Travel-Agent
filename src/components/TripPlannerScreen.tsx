import { useState } from 'react';
import { format } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { TripDetails } from '@/types';
import DestinationsTab from '@/components/tabs/DestinationsTab';
import ActivitiesTab from '@/components/tabs/ActivitiesTab';
import AccommodationsTab from '@/components/tabs/AccommodationsTab';
import TipsTab from '@/components/tabs/TipsTab';
import ConclusionTab from '@/components/tabs/ConclusionTab';

interface TripPlannerScreenProps {
  tripDetails: TripDetails;
}

const TripPlannerScreen = ({ tripDetails }: TripPlannerScreenProps) => {
  const [activeTab, setActiveTab] = useState('destinations');
  const [progress, setProgress] = useState(0);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const progressMap: { [key: string]: number } = {
      destinations: 20,
      activities: 40,
      accommodations: 60,
      tips: 80,
      conclusion: 100,
    };
    setProgress(progressMap[value]);
  };

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-3xl font-bold text-gray-800">{tripDetails.tripName}</h2>
        <p className="text-lg text-gray-600 mt-2">
          {format(tripDetails.startDate, 'MMMM d, yyyy')} - {format(tripDetails.endDate, 'MMMM d, yyyy')}
        </p>
      </div>
      <div className="bg-white rounded-lg shadow-sm">
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-5 p-1 bg-gray-100 rounded-t-lg">
            <TabsTrigger value="destinations" className="data-[state=active]:bg-white data-[state=active]:text-primary">Destinations</TabsTrigger>
            <TabsTrigger value="activities" className="data-[state=active]:bg-white data-[state=active]:text-primary">Activities</TabsTrigger>
            <TabsTrigger value="accommodations" className="data-[state=active]:bg-white data-[state=active]:text-primary">Accommodations</TabsTrigger>
            <TabsTrigger value="tips" className="data-[state=active]:bg-white data-[state=active]:text-primary">Tips</TabsTrigger>
            <TabsTrigger value="conclusion" className="data-[state=active]:bg-white data-[state=active]:text-primary">Conclusion</TabsTrigger>
          </TabsList>
          <Progress 
            value={progress} 
            className="w-full h-0.5 bg-gray-200" 
            indicatorClassName="bg-primary transition-all duration-300 ease-in-out"
            aria-label={`Trip planning progress: ${progress}% complete`}
          />
          <TabsContent value="destinations">
            <DestinationsTab tripDetails={tripDetails} />
          </TabsContent>
          <TabsContent value="activities">
            <ActivitiesTab tripDetails={tripDetails} />
          </TabsContent>
          <TabsContent value="accommodations">
            <AccommodationsTab tripDetails={tripDetails} />
          </TabsContent>
          <TabsContent value="tips">
            <TipsTab tripDetails={tripDetails} />
          </TabsContent>
          <TabsContent value="conclusion">
            <ConclusionTab tripDetails={tripDetails} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TripPlannerScreen;