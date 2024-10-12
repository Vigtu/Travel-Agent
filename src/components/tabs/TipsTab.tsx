import type { ParsedTripPlan } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Luggage, Wallet, Globe, MessageSquare, Volume2 } from 'lucide-react';

interface TipsTabProps {
  tripPlan: ParsedTripPlan | null;
}

const TipsTab = ({ tripPlan }: TipsTabProps) => {
  if (!tripPlan) {
    return <div>Loading tips...</div>;
  }

  const tips = [
    {
      title: 'Packing Essentials',
      description: 'Don\'t forget these items',
      icon: Luggage,
      content: tripPlan.packingList,
    },
    {
      title: 'Budget Tips',
      description: 'Save money on your trip',
      icon: Wallet,
      content: tripPlan.budgetBreakdown,
    },
    {
      title: 'Local Customs',
      description: 'Respect the local culture',
      icon: Globe,
      content: tripPlan.localCustoms,
    },
    {
      title: 'Practical Tips',
      description: 'Make the most of your trip',
      icon: MessageSquare,
      content: tripPlan.practicalTips,
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
                {tip.content.map((item, index) => (
                  <li key={`tip-${tip.title}-${index}`}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Volume2 className="w-6 h-6 mr-2" />
              Useful Phrases
            </CardTitle>
            <CardDescription>Learn these local phrases</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              {tripPlan.localCustoms.map((phrase, index) => (
                <li key={`phrase-${index}`}>{phrase}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
};

export default TipsTab;
