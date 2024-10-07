import { TripDetails } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sun, Sunset, Moon } from 'lucide-react';

interface ActivitiesTabProps {
  tripDetails: TripDetails;
}

const ActivitiesTab = ({ tripDetails }: ActivitiesTabProps) => {
  const activities = [
    { 
      day: 1, 
      items: [
        { time: 'morning', activity: 'Visit Eiffel Tower' },
        { time: 'afternoon', activity: 'Explore Louvre Museum' },
        { time: 'evening', activity: 'Seine River Cruise' },
      ]
    },
    { 
      day: 2, 
      items: [
        { time: 'morning', activity: 'Day trip to Versailles' },
        { time: 'afternoon', activity: 'Explore Versailles Gardens' },
        { time: 'evening', activity: 'Dinner at a local bistro' },
      ]
    },
    { 
      day: 3, 
      items: [
        { time: 'morning', activity: 'Walk around Montmartre' },
        { time: 'afternoon', activity: 'Visit Sacré-Cœur' },
        { time: 'evening', activity: 'Watch a cabaret show' },
      ]
    },
  ];

  const getIcon = (time: string) => {
    switch (time) {
      case 'morning':
        return <Sun className="w-5 h-5 text-yellow-500" />;
      case 'afternoon':
        return <Sunset className="w-5 h-5 text-orange-500" />;
      case 'evening':
        return <Moon className="w-5 h-5 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <ScrollArea className="h-[calc(100vh-20rem)]">
      <div className="space-y-6 p-6">
        {activities.map((day) => (
          <Card key={day.day} className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="bg-primary text-white rounded-t-lg">
              <CardTitle>Day {day.day}</CardTitle>
              <CardDescription className="text-primary-foreground">Planned activities for the day</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-4">
                {day.items.map((item, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    {getIcon(item.time)}
                    <span className="text-gray-800">{item.activity}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};

export default ActivitiesTab;