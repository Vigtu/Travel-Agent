import { useState } from 'react';
import type { ParsedTripPlan } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sun, Cloud, CloudRain, Snowflake, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ActivitiesTabProps {
  tripPlan: ParsedTripPlan | null;
}

const ActivitiesTab = ({ tripPlan }: ActivitiesTabProps) => {
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  if (!tripPlan) {
    return <div>Loading activities...</div>;
  }

  const getWeatherIcon = (weather: string) => {
    if (weather.toLowerCase().includes('sunny')) return <Sun className="w-6 h-6 text-yellow-500" />;
    if (weather.toLowerCase().includes('cloudy')) return <Cloud className="w-6 h-6 text-gray-500" />;
    if (weather.toLowerCase().includes('rain')) return <CloudRain className="w-6 h-6 text-blue-500" />;
    if (weather.toLowerCase().includes('snow')) return <Snowflake className="w-6 h-6 text-blue-300" />;
    return <Calendar className="w-6 h-6 text-gray-400" />;
  };

  return (
    <ScrollArea className="h-[calc(100vh-20rem)]">
      <div className="space-y-6 p-6">
        {tripPlan.activities.map((day) => (
          <Card key={`day-${day.day}`} className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader 
              className="bg-primary text-white rounded-t-lg cursor-pointer"
              onClick={() => setExpandedDay(expandedDay === day.day ? null : day.day)}
            >
              <CardTitle className="flex justify-between items-center">
                <span>Day {day.day}</span>
                {getWeatherIcon(day.weather)}
              </CardTitle>
              <CardDescription className="text-primary-foreground">
                {day.date} - {day.weather}
              </CardDescription>
            </CardHeader>
            <AnimatePresence>
              {expandedDay === day.day && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CardContent className="pt-6">
                    <ul className="space-y-4">
                      {day.items.map((activity, actIndex) => (
                        <li key={`activity-${day.day}-${actIndex}`} className="flex items-start space-x-3">
                          <span className="font-semibold min-w-[80px]">{activity.time}:</span>
                          <span className="text-gray-800">{activity.description}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};

export default ActivitiesTab;