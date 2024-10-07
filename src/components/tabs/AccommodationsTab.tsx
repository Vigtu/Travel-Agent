import { TripDetails } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Star } from 'lucide-react';

interface AccommodationsTabProps {
  tripDetails: TripDetails;
}

const AccommodationsTab = ({ tripDetails }: AccommodationsTabProps) => {
  const accommodations = [
    { name: 'Luxury Hotel Paris', rating: 4.5, price: '€200/night', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
    { name: 'Cozy Apartment Near Louvre', rating: 4.2, price: '€150/night', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
    { name: 'Boutique Hotel Montmartre', rating: 4.7, price: '€180/night', image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
  ];

  return (
    <ScrollArea className="h-[calc(100vh-20rem)]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {accommodations.map((accommodation, index) => (
          <Card key={index} className="overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
            <img src={accommodation.image} alt={accommodation.name} className="w-full h-48 object-cover" />
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800">{accommodation.name}</CardTitle>
              <CardDescription className="flex items-center">
                <Star className="w-5 h-5 text-yellow fill-current mr-1" />
                <span className="text-yellow font-semibold">{accommodation.rating}</span>
                <span className="text-gray-600 ml-1">stars</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold text-primary">{accommodation.price}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-primary hover:bg-primary-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
                Book Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};

export default AccommodationsTab;