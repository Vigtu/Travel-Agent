import axios from 'axios';
import type { TripDetails } from '@/types';

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

interface ApiResponse {
  outputs: Array<{
    outputs: Array<{
      results: {
        message: {
          data: {
            text: string;
          };
        };
      };
    }>;
  }>;
}

export const getTravelPlan = async (tripDetails: TripDetails, destinations: string[]): Promise<string> => {
  try {
    const response = await axios.post<ApiResponse>(
      API_URL,
      {
        output_type: "chat",
        input_type: "text",
        tweaks: {
          "TravelForm-IfdnK": {
            budget: tripDetails.budget,
            date_flexibility: `+/- ${tripDetails.dateFlexibility} days`,
            departure_date: tripDetails.startDate ? tripDetails.startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Not specified',
            destinations: destinations.join(', '),
            flight_preferences: tripDetails.flightPreferences,
            num_adults: tripDetails.numAdults,
            num_children: tripDetails.numChildren,
            origin: tripDetails.origin,
            return_date: tripDetails.endDate ? tripDetails.endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Not specified'
          }
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY
        },
        params: {
          stream: false
        }
      }
    );

    return response.data.outputs[0].outputs[0].results.message.data.text;
  } catch (error) {
    console.error('Error fetching travel plan:', error);
    throw error;
  }
};