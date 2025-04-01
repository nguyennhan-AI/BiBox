"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import useEmail from "../zustand/folderEmailStore"

export function CalendarDemo({ userEmail, userDate }: { userEmail: string, userDate: string }) {
  const [date, setDate] = React.useState<Date | undefined>(new Date(userDate))
  const { updateUserDate } = useEmail()

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate)
      updateUserDate(userEmail, newDate.toISOString()) 
    }
  }

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={handleDateChange}
      className="rounded-md border-none"
    />
  )
}