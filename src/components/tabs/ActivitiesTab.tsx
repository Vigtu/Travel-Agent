import type { ParsedTripPlan } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sun, Sunset, Moon, CloudRain } from 'lucide-react';

interface ActivitiesTabProps {
  tripPlan: ParsedTripPlan | null;
}

const ActivitiesTab = ({ tripPlan }: ActivitiesTabProps) => {
  if (!tripPlan) {
    return <div>Loading activities...</div>;
  }

  return (
    <ScrollArea className="h-[calc(100vh-20rem)]">
      <div className="space-y-6 p-6">
        {tripPlan.activities.map((day, index) => (
          <Card key={`day-${day.day}`} className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="bg-primary text-white rounded-t-lg">
              <CardTitle>Day {day.day}</CardTitle>
              <CardDescription className="text-primary-foreground">{day.date}</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <CloudRain className="w-5 h-5 mr-2 text-blue-500" />
                <span className="text-gray-700">{day.weather}</span>
              </div>
              <ul className="space-y-4">
                {day.items.map((activity, actIndex) => (
                  <li key={`activity-${day.day}-${actIndex}`} className="flex items-center space-x-3">
                    {getIcon(activity.time)}
                    <span className="text-gray-800">{activity.description}</span>
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

const getIcon = (time: string) => {
  switch (time.toLowerCase()) {
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

export default ActivitiesTab;
