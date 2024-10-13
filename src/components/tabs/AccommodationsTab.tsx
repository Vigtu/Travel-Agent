import { useState } from 'react';
import type { ParsedTripPlan } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Star, ExternalLink } from 'lucide-react';

interface AccommodationsTabProps {
  tripPlan: ParsedTripPlan | null;
}

const AccommodationsTab = ({ tripPlan }: AccommodationsTabProps) => {
  if (!tripPlan) {
    return <div className="flex items-center justify-center h-full">Loading accommodations...</div>;
  }

  if (!tripPlan.accommodations || tripPlan.accommodations.length === 0) {
    return <div className="flex items-center justify-center h-full">No accommodation information available.</div>;
  }

  const cleanDescription = (description: string) => {
    // Remove markdown links and keep only the text
    return description.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');
  };

  return (
    <ScrollArea className="h-[calc(100vh-20rem)]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {tripPlan.accommodations.map((accommodation) => (
          <Card key={accommodation.name} className="flex flex-col overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="relative flex-grow">
              <img 
                src={accommodation.image} 
                alt={accommodation.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-xl font-bold text-white mb-2">{accommodation.name}</h3>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={`star-${accommodation.name}-${i}`}
                      className={`w-4 h-4 ${i < accommodation.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="text-sm text-white ml-2">{accommodation.rating} stars</span>
                </div>
                <p className="text-lg font-semibold text-white">{accommodation.price}</p>
              </div>
            </div>
            <CardContent className="p-4 bg-white">
              <p className="text-sm text-gray-600">
                Located in Copacabana, this hotel offers comfortable accommodations at an affordable price.
              </p>
            </CardContent>
            <CardFooter className="bg-gray-50 p-4 mt-auto">
              <Button 
                className="w-full bg-primary hover:bg-primary-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out flex items-center justify-center"
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
