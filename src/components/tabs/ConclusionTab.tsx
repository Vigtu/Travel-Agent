import { TripDetails } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle } from 'lucide-react';

interface ConclusionTabProps {
  tripDetails: TripDetails;
}

const ConclusionTab = ({ tripDetails }: ConclusionTabProps) => {
  const conclusionPoints = [
    "Your itinerary is now complete and ready for an unforgettable journey to France!",
    "Remember to keep all your travel documents handy and make copies of important papers.",
    "Stay flexible with your plans, as unexpected discoveries often lead to the best memories.",
    "Immerse yourself in the local culture by trying new foods and engaging with locals.",
    "Don't forget to share your experiences and photos with friends and family back home.",
    "Most importantly, relax and enjoy your well-deserved vacation in beautiful France!",
  ];

  return (
    <ScrollArea className="h-[calc(100vh-20rem)]">
      <div className="p-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="w-6 h-6 mr-2 text-green-500" />
              Trip Planning Complete
            </CardTitle>
            <CardDescription>
              Congratulations on planning your trip to {tripDetails.country}!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Your {tripDetails.tripName} is scheduled from {tripDetails.startDate.toLocaleDateString()} to {tripDetails.endDate.toLocaleDateString()}. Here are some final thoughts and tips to ensure you have an amazing experience:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              {conclusionPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
};

export default ConclusionTab;