import type { TripDetails } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Luggage, Wallet, Globe, MessageSquare } from 'lucide-react';

interface TipsTabProps {
  tripDetails: TripDetails;
}

const TipsTab = ({ tripDetails }: TipsTabProps) => {
  const tips = [
    {
      title: 'Packing Essentials',
      description: 'Don\'t forget these items',
      icon: Luggage,
      content: [
        'Comfortable walking shoes',
        'Weather-appropriate clothing',
        'Travel adapter',
        'Passport and travel documents',
        'Medications and first-aid kit',
      ],
    },
    {
      title: 'Budget Tips',
      description: 'Save money on your trip',
      icon: Wallet,
      content: [
        'Use public transportation',
        'Eat at local restaurants',
        'Look for free attractions and events',
        'Book accommodations in advance',
        'Use a travel rewards credit card',
      ],
    },
    {
      title: 'Local Customs',
      description: 'Respect the local culture',
      icon: Globe,
      content: [
        'Learn basic phrases in the local language',
        'Dress appropriately for religious sites',
        'Be aware of tipping customs',
        'Respect local traditions and customs',
        'Ask permission before taking photos of people',
      ],
    },
    {
      title: 'Communication',
      description: 'Stay connected during your trip',
      icon: MessageSquare,
      content: [
        'Get an international data plan',
        'Download offline maps',
        'Use translation apps',
        'Keep emergency contact information handy',
        'Join local social media groups for travelers',
      ],
    },
  ];

  return (
    <ScrollArea className="h-[calc(100vh-20rem)]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {tips.map((tip) => (
          <Card key={tip.title}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <tip.icon className="w-6 h-6 mr-2" />
                {tip.title}
              </CardTitle>
              <CardDescription>{tip.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                {tip.content.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};

export default TipsTab;