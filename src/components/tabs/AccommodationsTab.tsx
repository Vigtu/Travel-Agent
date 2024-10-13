import { useState } from 'react';
import type { ParsedTripPlan } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Star, ExternalLink } from 'lucide-react';

interface AccommodationsTabProps {
  tripPlan: ParsedTripPlan | null;
}

const AccommodationsTab = ({ tripPlan }: AccommodationsTabProps) => {
  const [selectedAccommodation, setSelectedAccommodation] = useState<number | null>(null);

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
          <Card key={accommodation.name} className="overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="relative h-48">
              <img src={accommodation.image} alt={accommodation.name} className="w-full h-full object-cover" />
            </div>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800">{accommodation.name}</CardTitle>
              <CardDescription className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={`star-${accommodation.name}-${i}`}
                    className={`w-5 h-5 ${i < accommodation.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                  />
                ))}
                <span className="text-gray-600 ml-2">{accommodation.rating} stars</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold text-primary">{accommodation.price}</p>
              <p className="text-sm text-gray-600 mt-2">{accommodation.description}</p>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-primary hover:bg-primary-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105" 
                onClick={() => window.open(`https://example.com/book/${accommodation.name}`, '_blank')}
              >
                Book Now <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};

export default AccommodationsTab;
