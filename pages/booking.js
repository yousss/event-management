import EventList from '@components/booked-events/EventList'
import React from 'react'
import { withAuthSync } from '@context/auth'

import BookingEventProvider from '@context/bookingContext'
import Head from 'next/head'

const Booking = () => {
  return (
    <>
      <Head>
        <title>Booking Event</title>
      </Head>
      <BookingEventProvider>
        <EventList />
      </BookingEventProvider>
    </>
  )
}

export default withAuthSync(Booking)
