import type { ParsedTripPlan } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Star, ExternalLink } from 'lucide-react';

interface AccommodationsTabProps {
  tripPlan: ParsedTripPlan | null;
}

const AccommodationsTab = ({ tripPlan }: AccommodationsTabProps) => {
  if (!tripPlan) {
    return <div>Loading accommodations...</div>;
  }

  if (!tripPlan.accommodations || tripPlan.accommodations.length === 0) {
    return <div>No accommodation information available.</div>;
  }

  return (
    <ScrollArea className="h-[calc(100vh-20rem)]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {tripPlan.accommodations.map((accommodation, index) => (
          <Card key={`accommodation-${index}`} className="overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
            {accommodation.image && (
              <img src={accommodation.image} alt={accommodation.name} className="w-full h-48 object-cover" />
            )}
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800">{accommodation.name}</CardTitle>
              {accommodation.rating && (
                <CardDescription className="flex items-center">
                  <Star className="w-5 h-5 text-yellow fill-current mr-1" />
                  <span className="text-yellow font-semibold">{accommodation.rating}</span>
                  <span className="text-gray-600 ml-1">stars</span>
                </CardDescription>
              )}
            </CardHeader>
            <CardContent>
              {accommodation.price && (
                <p className="text-lg font-semibold text-primary">{accommodation.price}</p>
              )}
              {accommodation.description && (
                <p className="text-sm text-gray-600 mt-2">{accommodation.description}</p>
              )}
            </CardContent>
            {accommodation.bookingLink && (
              <CardFooter>
                <Button 
                  className="w-full bg-primary hover:bg-primary-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105" 
                  onClick={() => window.open(accommodation.bookingLink, '_blank')}
                >
                  Book Now <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </CardFooter>
            )}
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};

export default AccommodationsTab;
