import { useState } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

interface TripData {
  introduction: string
  introImage: string
  flightDetails: {
    departure: string
    return: string
    airline: string
    price: string
    duration: string
  }
  flightImage: string
}

interface AnimatedAccordionProps {
  tripData: TripData
  showNewFeatures: boolean
}

export default function AnimatedAccordion({ tripData, showNewFeatures }: AnimatedAccordionProps) {
  const [expandedItem, setExpandedItem] = useState<string | undefined>(undefined)

  return (
    <div className={`transition-all duration-500 ease-in-out ${showNewFeatures ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
      <Accordion
        type="single"
        collapsible
        value={expandedItem}
        onValueChange={setExpandedItem}
        className="w-full"
      >
        <AccordionItem value="introduction" className="overflow-visible">
          <AccordionTrigger className="h-10">
            <div className={`transition-transform duration-300 ${expandedItem === "introduction" ? 'scale-100' : 'scale-110'}`}>
              Introduction
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <img
              src={tripData.introImage}
              alt="Trip introduction"
              className="w-full h-auto max-w-[300px] rounded-lg mb-4"
            />
            <p className="text-sm text-gray-600">{tripData.introduction}</p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="book-flight" className="overflow-visible">
          <AccordionTrigger className="h-10">
            <div className={`transition-transform duration-300 ${expandedItem === "book-flight" ? 'scale-100' : 'scale-110'}`}>
              Book Flight
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <img
              src={tripData.flightImage}
              alt="Airline logo"
              className="w-auto h-[50px] mb-4"
            />
            <div className="space-y-2">
              <p><strong>Departure:</strong> {tripData.flightDetails.departure}</p>
              <p><strong>Return:</strong> {tripData.flightDetails.return}</p>
              <p><strong>Airline:</strong> {tripData.flightDetails.airline}</p>
              <p><strong>Price:</strong> {tripData.flightDetails.price}</p>
              <p><strong>Duration:</strong> {tripData.flightDetails.duration}</p>
            </div>
            <Button className="mt-4 w-full bg-green-500 text-white hover:bg-green-600">
              Book Flight
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
