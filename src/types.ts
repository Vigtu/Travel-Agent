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