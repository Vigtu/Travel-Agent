export interface TripDetails {
  name: string;
  destinations: string;
  startDate: Date | null;
  endDate: Date | null;
  budget: number;
  dateFlexibility: number;
  flightPreferences: string;
  numAdults: number;
  numChildren: number;
  origin: string;
}

export interface ParsedTripPlan {
  title: string;
  introduction: string;
  destination: string;
  flightDetails: {
    departure: string;
    return: string;
    airline: string;
    price: string;
    duration: string;
    bookingUrl: string; // Este campo está presente na interface
  };
  accommodations: Array<{
    name: string;
    image: string;
    price: string;
    description: string;
    rating: number;
  }>;
  activities: Array<{
    day: number;
    date: string;
    weather: string;
    image?: string;
    items: Array<{
      time: string;
      description: string;
    }>;
  }>;
  packingList: string[];
  budgetBreakdown: string[];
  localCustoms: string[];
  practicalTips: string[];
  conclusion: string;
  packingImage: string;
  budgetImage: string;
  cultureImage: string;
  tipsImage: string;
  conclusionImage: string;
}
