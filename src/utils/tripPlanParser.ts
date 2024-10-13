import type { ParsedTripPlan } from '@/types';

export const parseTripPlan = (apiResponse: string): ParsedTripPlan => {
  const sections = apiResponse.split('\n## ').map(section => section.trim());
  
  const parsedPlan: ParsedTripPlan = {
    title: '',
    introduction: '',
    destination: '',
    flightDetails: {
      departure: '',
      return: '',
      airline: '',
      price: '',
      duration: '',
      bookingUrl: '',
    },
    accommodations: [],
    activities: [],
    packingList: [],
    budgetBreakdown: [],
    localCustoms: [],
    practicalTips: [],
    conclusion: '',
    packingImage: '',
    budgetImage: '',
    cultureImage: '',
    tipsImage: '',
    conclusionImage: '',
  };

  for (const section of sections) {
    const [sectionTitle, ...content] = section.split('\n');
    const sectionContent = content.join('\n');

    switch (sectionTitle.toLowerCase()) {
      case 'introduction':
        parsedPlan.introduction = sectionContent;
        parsedPlan.destination = sectionContent.split('to ')[1]?.split('!')[0] || '';
        parsedPlan.flightDetails = parseFlightDetails(sectionContent);
        break;
      case 'flight details':
        parsedPlan.flightDetails = parseFlightDetails(sectionContent);
        break;
      case 'accommodation options':
        parsedPlan.accommodations = parseAccommodations(sectionContent);
        break;
      case 'day-by-day itinerary':
        parsedPlan.activities = parseActivities(sectionContent);
        break;
      case 'packing list':
        parsedPlan.packingList = parseList(sectionContent);
        parsedPlan.packingImage = extractImage(sectionContent);
        break;
      case 'budget breakdown':
        parsedPlan.budgetBreakdown = parseList(sectionContent);
        parsedPlan.budgetImage = extractImage(sectionContent);
        break;
      case 'local customs and useful phrases':
        parsedPlan.localCustoms = parseList(sectionContent);
        parsedPlan.cultureImage = extractImage(sectionContent);
        break;
      case 'practical tips':
        parsedPlan.practicalTips = parseList(sectionContent);
        parsedPlan.tipsImage = extractImage(sectionContent);
        break;
      case 'conclusion':
        parsedPlan.conclusion = sectionContent;
        parsedPlan.conclusionImage = extractImage(sectionContent);
        break;
    }
  }

  return parsedPlan;
};

const parseFlightDetails = (content: string): ParsedTripPlan['flightDetails'] => {
  const details: ParsedTripPlan['flightDetails'] = {
    departure: '',
    return: '',
    airline: '',
    price: '',
    duration: '',
    bookingUrl: '',
  };

  const lines = content.split('\n');
  for (const line of lines) {
    if (line.startsWith('- **Departure**:')) details.departure = line.split(':')[1]?.trim() || '';
    if (line.startsWith('- **Return**:')) details.return = line.split(':')[1]?.trim() || '';
    if (line.startsWith('- **Airline**:')) {
      const airlineInfo = line.split(':')[1]?.trim() || '';
      details.airline = airlineInfo.split('![')[0].trim(); // Remove a parte da imagem
    }
    if (line.startsWith('- **Price**:')) details.price = line.split(':')[1]?.trim() || '';
    if (line.startsWith('- **Duration**:')) details.duration = line.split(':')[1]?.trim() || '';
    if (line.startsWith('[Book your flight here]')) {
      const match = line.match(/\((.*?)\)/);
      details.bookingUrl = match ? match[1] : '';
    }
  }

  return details;
};

const parseAccommodations = (content: string): ParsedTripPlan['accommodations'] => {
  const accommodations: ParsedTripPlan['accommodations'] = [];
  const accommodationSections = content.split('\n### ').slice(1);

  for (const section of accommodationSections) {
    const [name, ...details] = section.split('\n');
    const accommodation: ParsedTripPlan['accommodations'][0] = {
      name: name.trim(),
      image: '',
      price: '',
      description: '',
      rating: 0,
    };

    for (const line of details) {
      if (line.startsWith('![')) accommodation.image = line.match(/\((.*?)\)/)?.[1] || '';
      if (line.startsWith('- Price:')) accommodation.price = line.split(':')[1]?.trim() || '';
      if (line.startsWith('- ') && !line.startsWith('- Price:')) {
        accommodation.description += `${line.replace('- ', '').trim()} `;
      }
    }

    accommodation.description = accommodation.description.trim();
    accommodations.push(accommodation);
  }

  return accommodations;
};

const parseActivities = (content: string): ParsedTripPlan['activities'] => {
  const activities: ParsedTripPlan['activities'] = [];
  const daySections = content.split('\n### ').slice(1);

  for (const section of daySections) {
    const [dayTitle, ...dayContent] = section.split('\n');
    const activity: ParsedTripPlan['activities'][0] = {
      day: Number.parseInt(dayTitle.split(':')[0].replace('Day ', ''), 10),
      date: dayTitle.split(':')[1]?.trim() || '',
      weather: '',
      image: '',
      items: [],
    };

    for (const line of dayContent) {
      if (line.startsWith('![')) {
        activity.image = line.match(/\((.*?)\)/)?.[1] || '';
      } else if (line.startsWith('- **Weather**:')) {
        activity.weather = line.split(':')[1]?.trim() || '';
      } else if (line.startsWith('- **')) {
        const [time, description] = line.replace('- **', '').split('**: ');
        activity.items.push({ time, description });
      }
    }

    activities.push(activity);
  }

  return activities;
};

const parseList = (content: string): string[] => {
  return content.split('\n').filter(line => line.startsWith('- ')).map(line => line.replace('- ', ''));
};

const extractImage = (content: string): string => {
  const imageMatch = content.match(/!\[.*?\]\((.*?)\)/);
  return imageMatch ? imageMatch[1] : '';
};
