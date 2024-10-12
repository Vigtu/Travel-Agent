import type { ParsedTripPlan } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle } from 'lucide-react';

interface ConclusionTabProps {
  tripPlan: ParsedTripPlan | null;
}

const ConclusionTab = ({ tripPlan }: ConclusionTabProps) => {
  if (!tripPlan) {
    return <div>Loading conclusion...</div>;
  }

  return (
    <ScrollArea className="h-[calc(100vh-20rem)]">
      <div className="p-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="w-6 h-6 mr-2 text-green-500" />
              Trip Planning Complete
            </CardTitle>
            <CardDescription>
              Congratulations on planning your trip to {tripPlan.destination}!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              {tripPlan.conclusion}
            </p>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
};

export default ConclusionTab;
