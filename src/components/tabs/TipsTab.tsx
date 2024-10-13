import { useState } from 'react';
import type { ParsedTripPlan } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Luggage, Wallet, Globe, MessageSquare, Volume2, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TipsTabProps {
  tripPlan: ParsedTripPlan | null;
}

const TipsTab = ({ tripPlan }: TipsTabProps) => {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

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
    {
      title: 'Useful Phrases',
      description: 'Learn these local phrases',
      icon: Volume2,
      content: tripPlan.localCustoms,
    },
  ];

  const toggleSection = (title: string) => {
    setExpandedSections((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  return (
    <ScrollArea className="h-[calc(100vh-20rem)]">
      <div className="space-y-4 p-4">
        {tips.map((tip) => (
          <Card key={tip.title}>
            <CardHeader
              className="cursor-pointer"
              onClick={() => toggleSection(tip.title)}
            >
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <tip.icon className="w-6 h-6 mr-2" />
                  {tip.title}
                </div>
                {expandedSections.includes(tip.title) ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </CardTitle>
              <CardDescription>{tip.description}</CardDescription>
            </CardHeader>
            <AnimatePresence>
              {expandedSections.includes(tip.title) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2">
                      {tip.content.map((item, index) => (
                        <li key={`${tip.title}-${index}`}>{item}</li>
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

export default TipsTab;