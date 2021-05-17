import EventList from '@components/booked-events/EventList'
import React from 'react'
import BookingEventProvider from '@context/bookingContext'

const Booking = () => {
  return (
    <BookingEventProvider>
      <EventList />
    </BookingEventProvider>
  )
}

export default Booking
