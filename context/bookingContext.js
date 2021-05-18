import { BASE_URL_PRO } from 'config'
import { createContext, useEffect, useState } from 'react'
import cookie from 'js-cookie'

export const BookingContext = createContext({
  events: [],
  totalEvents: 0,
  bookedEvents: [],
  totalBookedEvent: 0,
  bookingEvent: (eventId) => {},
  cancelBookingEvent: (eventId) => {},
  createEvent: (event) => {},
  fetchEvents: () => {},
  fetchBookedEvents: () => {},
})

export default function BookingEventProvider(props) {
  const [events, setEvents] = useState([])
  const [bookedEvents, setBookedEvents] = useState([])
  const [loading, setLoading] = useState(false)
  const { children } = props

  function addBookingEventHandler(eventId) {
    const eventBooked = events.map((event) => event.id === eventId)
    if (!eventBooked) {
      return
    }

    useEffect(() => {
      const bookEvent = async () => {
        try {
          const requestBody = {
            query: `
          mutation {
            bookEvent (
              eventId: "${eventId}") {
              _id
              user {
                username
              }
              event {
                _id
              }
              createdAt
              }
          }
          `,
          }
          const res = await fetch(BASE_URL_PRO, {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + cookie.get('token'),
            },
          })
          const { data } = await res.json()
          console.log(data)
          setEvents((events) => [{ events: data, error: null }])
        } catch (error) {
          setEvents((events) => [{ events: null, error: error }])
        } finally {
          setLoading(false)
        }
      }
      bookEvent()
    }, [eventId])
  }

  function cancelBookingEventHandler(bookedEventId) {
    useEffect(async () => {
      setLoading(true)
      try {
        const requestBody = {
          query: `
          mutation {
          cancellBookingEvent (
            bookingId: "${bookedEventId}") {
              _id
              title
              description
              creator {
                username
              }
              price
              date
            }
          }
          `,
        }
        const res = await fetch(BASE_URL_PRO, {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + cookie.get('token'),
          },
        })
        const { data } = await res.json()
        console.log(data)
        setBookedEvents((bookedEvents) => {
          return bookedEvents.concat(data)
        })
      } catch (error) {
        setEvents(() => [{ events: [], error: error }])
      } finally {
        setLoading(false)
      }
    }, [eventId])
  }

  function fetchEvents() {
    useEffect(async () => {
      setLoading(true)
      try {
        const requestBody = {
          query: `
          query {
            events {
              _id
              title
              description
              date
              price
              creator {
                username
              }
            }
          }
          `,
        }
        const res = await fetch(BASE_URL_PRO, {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + cookie.get('token'),
          },
        })
        const {
          data: { events },
        } = await res.json()
        console.log(events)
        setEvents(events)
      } catch (error) {
        setEvents([error])
      } finally {
        setLoading(false)
      }
    }, [])
  }

  function fetchBookedEvents() {
    useEffect(async () => {
      setLoading(true)
      try {
        const requestBody = {
          query: `
          query {
            bookings {
              _id
              event {
                _id
              }
              user {
                username
              }
              createdAt
            }
          }
          `,
        }
        const res = await fetch(BASE_URL_PRO, {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + cookie.get('token'),
          },
        })
        const { data } = await res.json()
        console.log(data)
        bookedEvents(() => [{ bookedEvents: data, error: null }])
      } catch (error) {
        setEvents(() => [{ bookedEvents: events, error: error }])
      } finally {
        setLoading(false)
      }
    }, [])
  }

  const context = {
    events: events,
    totalEvents: events.length,
    bookedEvents: bookedEvents,
    totalBookedEvent: bookedEvents.length,
    bookingEvent: addBookingEventHandler,
    cancelBookingEvent: cancelBookingEventHandler,
    fetchEvents: fetchEvents,
    fetchBookedEvent: fetchBookedEvents,
  }
  return (
    <BookingContext.Provider value={context}>
      {children}
    </BookingContext.Provider>
  )
}
