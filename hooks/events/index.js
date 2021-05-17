import { useState, useEffect } from 'react'

export function useCreateEvent(event) {
  const [events, setEvents] = useState({
    events: [],
    error: null,
    loading: false,
  })
  const { title, description, date, price } = event
  const createEvent = async () => {
    setEvents((event) => ({ ...event, loading: true }))
    try {
      const requestBody = {
        query: `
          mutation {
          createEvent (
            eventInput:
                { title:"${title}",
                description:"${description}",
                price:"${price}",
                date: "${date}"
              }) {
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
      setEvents((prevEvents) => {
        return { events: prevEvents.events.concat(data) }
      })
    } catch (error) {
      setEvents((prevEvents) => {
        return { ...prevEvents, events: [], error: error }
      })
    } finally {
      setEvents((prevEvents) => {
        return { ...prevEvents, loading: false }
      })
    }
  }
  useEffect(() => {
    createEvent()
  }, [])
  return events
}
