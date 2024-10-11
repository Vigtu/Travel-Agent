'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronLeft, ChevronRight, MapPin, Info, Plane } from 'lucide-react'

interface ResponsiveSidebarProps {
  children: React.ReactNode;
  className?: string;
}

export default function ResponsiveSidebar({ children, className }: ResponsiveSidebarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className={`relative transition-all duration-300 ${isSidebarOpen ? 'w-80' : 'w-16'} bg-white border-r ${className}`}>
      <div className="flex items-center justify-between p-4 border-b">
        {isSidebarOpen ? (
          <h3 className="text-lg font-semibold">Your Destinations</h3>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <MapPin className="h-6 w-6 text-green-500" />
            <Info className="h-6 w-6 text-green-500" />
            <Plane className="h-6 w-6 text-green-500" />
          </div>
        )}
        <Button
          onClick={toggleSidebar}
          variant="ghost"
          size="icon"
          className="rounded-full"
        >
          {isSidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>
      {isSidebarOpen && (
        <ScrollArea className="h-[calc(100vh-12rem)]">
          <div className="p-4 space-y-4">
            {children}
          </div>
        </ScrollArea>
      )}
    </div>
  )
}