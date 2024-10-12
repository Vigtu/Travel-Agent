import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

interface TripPlanDisplayProps {
  planData: string;
}

export interface ParsedTripPlan {
  title: string;
  introduction: string;
  flightDetails: string;
  accommodations: string;
  activities: string;
  packingList: string;
  budgetBreakdown: string;
  localCustoms: string;
  practicalTips: string;
  conclusion: string;
}

export const parseTripPlan = (planData: string): ParsedTripPlan => {
  const sections = planData.split('\n## ').map(section => section.trim());
  
  const parsedPlan: ParsedTripPlan = {
    title: '',
    introduction: '',
    flightDetails: '',
    accommodations: '',
    activities: '',
    packingList: '',
    budgetBreakdown: '',
    localCustoms: '',
    practicalTips: '',
    conclusion: ''
  };

  parsedPlan.title = sections[0].split('\n')[0];
  parsedPlan.introduction = sections[0].split('\n').slice(1).join('\n');

  sections.slice(1).forEach(section => {
    if (section.startsWith('Introduction')) {
      parsedPlan.introduction += '\n## ' + section;
    } else if (section.startsWith('Flight Details')) {
      parsedPlan.flightDetails = '## ' + section;
    } else if (section.startsWith('Accommodation Options')) {
      parsedPlan.accommodations = '## ' + section;
    } else if (section.startsWith('Day-by-Day Itinerary')) {
      parsedPlan.activities = '## ' + section;
    } else if (section.startsWith('Packing List')) {
      parsedPlan.packingList = '## ' + section;
    } else if (section.startsWith('Budget Breakdown')) {
      parsedPlan.budgetBreakdown = '## ' + section;
    } else if (section.startsWith('Local Customs and Useful Phrases')) {
      parsedPlan.localCustoms = '## ' + section;
    } else if (section.startsWith('Practical Tips')) {
      parsedPlan.practicalTips = '## ' + section;
    } else if (section.startsWith('Conclusion')) {
      parsedPlan.conclusion = '## ' + section;
    }
  });

  return parsedPlan;
};

const TripPlanDisplay: React.FC<TripPlanDisplayProps> = ({ planData }) => {
  const parsedPlan = parseTripPlan(planData);

  return (
    <div className="trip-plan-display">
      <h1>{parsedPlan.title}</h1>
      <ReactMarkdown rehypePlugins={[rehypeRaw]} className="markdown-content">
        {parsedPlan.introduction}
      </ReactMarkdown>
    </div>
  );
};

export default TripPlanDisplay;
