import { useState } from 'react';
import type { ParsedTripPlan } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sun, Cloud, CloudRain, Snowflake, Calendar, MapPin, Coffee, Utensils, Bed, Sunrise, Sunset, Moon, Bus } from 'lucide-react';
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
    const iconClass = "w-8 h-8";
    if (weather.toLowerCase().includes('sunny')) return <Sun className={`${iconClass} text-yellow-400`} />;
    if (weather.toLowerCase().includes('cloudy')) return <Cloud className={`${iconClass} text-gray-400`} />;
    if (weather.toLowerCase().includes('rain')) return <CloudRain className={`${iconClass} text-blue-400`} />;
    if (weather.toLowerCase().includes('snow')) return <Snowflake className={`${iconClass} text-blue-200`} />;
    return <Calendar className={`${iconClass} text-green-400`} />;
  };

  const getActivityIcon = (activity: string) => {
    const iconClass = "w-6 h-6 text-white";
    const lowerActivity = activity.toLowerCase();

    if (lowerActivity.includes('transportation')) return <Bus className={iconClass} />;
    if (lowerActivity.includes('activities')) return <MapPin className={iconClass} />;
    if (lowerActivity.includes('dinner')) return <Utensils className={iconClass} />;
    if (lowerActivity.includes('lunch')) return <Utensils className={iconClass} />;
    if (lowerActivity.includes('breakfast')) return <Coffee className={iconClass} />;
    if (lowerActivity.includes('morning')) return <Sunrise className={iconClass} />;
    if (lowerActivity.includes('afternoon')) return <Sunset className={iconClass} />;
    if (lowerActivity.includes('evening')) return <Moon className={iconClass} />;
    if (lowerActivity.includes('hotel') || lowerActivity.includes('accommodation')) return <Bed className={iconClass} />;

    return <Calendar className={iconClass} />;
  };

  const getActivityIconBackground = (activity: string) => {
    const lowerActivity = activity.toLowerCase();
    if (lowerActivity.includes('transportation')) return 'bg-blue-500';
    if (lowerActivity.includes('activities')) return 'bg-red-500';
    if (lowerActivity.includes('dinner')) return 'bg-purple-500';
    if (lowerActivity.includes('lunch')) return 'bg-orange-500';
    if (lowerActivity.includes('breakfast')) return 'bg-yellow-500';
    if (lowerActivity.includes('morning')) return 'bg-yellow-400';
    if (lowerActivity.includes('afternoon')) return 'bg-orange-400';
    if (lowerActivity.includes('evening')) return 'bg-indigo-500';
    if (lowerActivity.includes('hotel') || lowerActivity.includes('accommodation')) return 'bg-teal-500';
    return 'bg-green-500';
  };

  const formatDescription = (description: string) => {
    const parts = description.split(/(\*\*.*?\*\*)/g);
    return parts.map((part) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={`strong-${part}`}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <ScrollArea className="h-full">
      <div className="space-y-8 p-6">
        {tripPlan.activities.map((day) => (
          <Card key={`day-${day.day}`} className="bg-gradient-to-br from-green-50 to-blue-50 shadow-lg hover:shadow-xl transition-shadow duration-300 border-none overflow-hidden">
            <CardHeader 
              className="bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-t-lg cursor-pointer"
              onClick={() => setExpandedDay(expandedDay === day.day ? null : day.day)}
            >
              <div className="flex flex-col items-center space-y-2">
                <CardTitle className="text-3xl font-bold">Day {day.day}</CardTitle>
                <p className="text-xl font-semibold">{day.date}</p>
                <div className="flex items-center space-x-2 bg-white bg-opacity-20 rounded-full px-4 py-2">
                  <span className="text-sm font-medium">{day.weather}</span>
                  <div className="bg-white rounded-full p-1">
                    {getWeatherIcon(day.weather)}
                  </div>
                </div>
              </div>
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
                    {day.image && (
                      <div className="mb-6 flex justify-center">
                        <div className="relative w-64 h-64 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                          <img
                            src={day.image}
                            alt={`Day ${day.day} activities`}
                            className="w-full h-full object-cover rounded-lg shadow-md"
                          />
                          <div className="absolute inset-0 border-8 border-white rounded-lg pointer-events-none" />
                          <div className="absolute top-2 right-2 bg-white bg-opacity-80 px-2 py-1 rounded text-sm font-semibold text-gray-700">
                            Day {day.day}
                          </div>
                          <div className="absolute bottom-2 left-2 bg-white bg-opacity-80 px-2 py-1 rounded text-xs font-medium text-gray-600">
                            {day.date}
                          </div>
                          <div className="absolute inset-0 bg-black opacity-0 hover:opacity-10 transition-opacity duration-300 rounded-lg" />
                        </div>
                      </div>
                    )}
                    <ul className="space-y-4">
                      {day.items.map((activity, actIndex) => (
                        <li key={`activity-${day.day}-${actIndex}`} className="flex items-center space-x-3 bg-white bg-opacity-60 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                          <div className={`p-2 rounded-full ${getActivityIconBackground(activity.time)}`}>
                            {getActivityIcon(activity.time)}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-800">{activity.time}</p>
                            <p className="text-gray-600">{formatDescription(activity.description)}</p>
                          </div>
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
