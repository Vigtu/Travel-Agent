import { TripDetails } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Luggage, Wallet, Globe, MessageSquare } from 'lucide-react';

interface TipsTabProps {
  tripDetails: TripDetails;
}

const TipsTab = ({ tripDetails }: TipsTabProps) => {
  const tips = [
    {
      title: 'Packing List',
      description: 'Essential items to bring',
      icon: Luggage,
      content: [
        'Comfortable walking shoes',
        'Weather-appropriate clothing',
        'Travel adapter',
        'Camera',
        'Passport and travel documents',
      ],
    },
    {
      title: 'Budget Breakdown',
      description: 'Estimated costs for your trip',
      icon: Wallet,
      content: [
        'Accommodation: €1000',
        'Food and Drinks: €500',
        'Activities and Attractions: €300',
        'Transportation: €200',
        'Miscellaneous: €200',
      ],
    },
    {
      title: 'Local Customs',
      description: 'Cultural tips for your destination',
      icon: Globe,
      content: [
        'Greet with "Bonjour" (Hello) or "Bonsoir" (Good evening)',
        'Tipping is not mandatory but appreciated (5-10%)',
        'Learn basic French phrases',
        'Dress modestly when visiting religious sites',
        'Respect quiet hours (usually after 10 PM)',
      ],
    },
    {
      title: 'Useful Phrases',
      description: 'Key French phrases for your trip',
      icon: MessageSquare,
      content: [
        'Merci - Thank you',
        'S\'il vous plaît - Please',
        'Parlez-vous anglais? - Do you speak English?',
        'Où est...? - Where is...?',
        'L\'addition, s\'il vous plaît - The bill, please',
      ],
    },
  ];

  return (
    <ScrollArea className="h-[calc(100vh-20rem)]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {tips.map((tip, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <tip.icon className="w-6 h-6 mr-2" />
                {tip.title}
              </CardTitle>
              <CardDescription>{tip.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                {tip.content.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
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