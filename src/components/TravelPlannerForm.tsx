'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { format } from 'date-fns'
import { CalendarIcon, Minus, Plus } from 'lucide-react'
import type { TripDetails } from '@/types'

interface TravelPlannerFormProps {
  onSubmit: (formData: TripDetails) => void
}

export default function TravelPlannerForm({ onSubmit }: TravelPlannerFormProps) {
  const [formData, setFormData] = useState<TripDetails>({
    name: '',
    destinations: '',
    startDate: null,
    endDate: null,
    budget: 0,
    dateFlexibility: 3,
    flightPreferences: '',
    numAdults: 1,
    numChildren: 0,
    origin: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleDateChange = (date: Date | null, field: 'startDate' | 'endDate') => {
    setFormData(prevData => ({ ...prevData, [field]: date }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isFormValid()) {
      onSubmit(formData)
    } else {
      alert('Please fill in all required fields.')
    }
  }

  const isFormValid = () => {
    return (
      formData.name.trim() !== '' &&
      formData.destinations.trim() !== '' &&
      formData.startDate !== null &&
      formData.endDate !== null &&
      formData.budget >= 0 && // Alterado para permitir 0
      formData.flightPreferences !== '' &&
      formData.origin.trim() !== ''
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">* Trip Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="e.g., Mountain Adventure"
            className="mt-1"
            required
          />
        </div>
        <div>
          <Label htmlFor="destinations">* Destinations</Label>
          <Input
            id="destinations"
            name="destinations"
            value={formData.destinations}
            onChange={handleInputChange}
            placeholder="e.g., Rocky Mountains, USA"
            className="mt-1"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="origin">* Origin</Label>
          <Input
            id="origin"
            name="origin"
            value={formData.origin}
            onChange={handleInputChange}
            placeholder="e.g., Santa Clara, California"
            className="mt-1"
            required
          />
        </div>
        <div>
          <Label>* Flight Preferences</Label>
          <Select
            value={formData.flightPreferences}
            onValueChange={(value) => setFormData(prevData => ({ ...prevData, flightPreferences: value }))}
            required
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select preference" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="non stop flights">Non-stop flights</SelectItem>
              <SelectItem value="one stop">One stop</SelectItem>
              <SelectItem value="any">Any</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>* Start Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal mt-1">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.startDate ? format(formData.startDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.startDate || undefined}
                onSelect={(date: Date | undefined) => handleDateChange(date ?? null, 'startDate')}
                disabled={(date) =>
                  date < new Date() || date > new Date("2030-01-01")
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label>* End Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal mt-1">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.endDate ? format(formData.endDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.endDate || undefined}
                onSelect={(date: Date | undefined) => handleDateChange(date ?? null, 'endDate')}
                disabled={(date) =>
                  date <= (formData.startDate || new Date()) || date > new Date("2030-01-01")
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div>
        <Label>Date Flexibility (±{formData.dateFlexibility} days)</Label>
        <Slider
          value={[formData.dateFlexibility]}
          onValueChange={(value) => setFormData(prevData => ({ ...prevData, dateFlexibility: value[0] }))}
          max={7}
          step={1}
          className="mt-2"
        />
      </div>

      <div>
        <Label htmlFor="budget">Budget (USD)</Label>
        <Input
          type="number"
          id="budget"
          name="budget"
          value={formData.budget}
          onChange={handleInputChange}
          placeholder="Enter your budget (0 for no limit)"
          className="mt-1"
          min="0"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Number of Adults</Label>
          <div className="flex items-center mt-1">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setFormData(prevData => ({ ...prevData, numAdults: Math.max(1, prevData.numAdults - 1) }))}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="mx-4">{formData.numAdults}</span>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setFormData(prevData => ({ ...prevData, numAdults: prevData.numAdults + 1 }))}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div>
          <Label>Number of Children</Label>
          <div className="flex items-center mt-1">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setFormData(prevData => ({ ...prevData, numChildren: Math.max(0, prevData.numChildren - 1) }))}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="mx-4">{formData.numChildren}</span>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setFormData(prevData => ({ ...prevData, numChildren: prevData.numChildren + 1 }))}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full bg-green-500 text-white hover:bg-green-600">
        Start Planning
      </Button>
    </form>
  )
}
