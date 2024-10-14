import { useState } from 'react';
import type { ParsedTripPlan } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Luggage, Wallet, Globe, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
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
      image: tripPlan.packingImage
    },
    {
      title: 'Budget Breakdown',
      description: 'Save money on your trip',
      icon: Wallet,
      content: tripPlan.budgetBreakdown,
      image: tripPlan.budgetImage
    },
    {
      title: 'Local Customs',
      description: 'Respect the local culture',
      icon: Globe,
      content: tripPlan.localCustoms,
      image: tripPlan.cultureImage
    },
    {
      title: 'Practical Tips',
      description: 'Make the most of your trip',
      icon: MessageSquare,
      content: tripPlan.practicalTips,
      image: tripPlan.tipsImage
    }
  ];

  const toggleSection = (title: string) => {
    setExpandedSections((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const formatContent = (content: string) => {
    const parts = content.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={`strong-${index}-${part.slice(2, -2)}`}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <ScrollArea className="h-[calc(100vh-20rem)]">
      <div className="space-y-4 p-4">
        {tips.map((tip) => (
          <Card key={tip.title} className="overflow-hidden">
            <CardHeader
              className="cursor-pointer relative h-48"
              onClick={() => toggleSection(tip.title)}
            >
              {tip.image && (
                <div 
                  className="absolute inset-0 bg-cover bg-center" 
                  style={{ backgroundImage: `url(${tip.image})` }}
                />
              )}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4">
                <CardTitle className="text-white flex items-center justify-between">
                  <div className="flex items-center">
                    <tip.icon className="w-6 h-6 mr-2 text-primary-foreground" />
                    {tip.title}
                  </div>
                  {expandedSections.includes(tip.title) ? (
                    <ChevronUp className="w-5 h-5 text-primary-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-primary-foreground" />
                  )}
                </CardTitle>
                <CardDescription className="text-gray-200">{tip.description}</CardDescription>
              </div>
            </CardHeader>
            <AnimatePresence>
              {expandedSections.includes(tip.title) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CardContent className="bg-white p-4">
                    <ul className="list-disc pl-5 space-y-2">
                      {tip.content.map((item, index) => (
                        <motion.li
                          key={`${tip.title}-${index}`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="text-gray-700"
                        >
                          {formatContent(item)}
                        </motion.li>
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
