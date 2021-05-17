import React, { useContext, memo, useState, useCallback } from 'react'
import EventItem from './Event'
import { BookingContext } from '@context/bookingContext'
import { Button, CircularProgress, Typography } from '@material-ui/core'
import styles from '@styles/event.list.module.scss'
import CreateEventModal from './CreateEventModal'

const EventList = () => {
  const [open, setOpen] = useState(false)
  const bookedContext = useContext(BookingContext)

  const openModal = useCallback(() => {
    setOpen(false)
  })

  bookedContext.fetchEvents()

  const events = bookedContext.events
  const totalLength = bookedContext.totalEvents

  if (totalLength === 0) {
    return (
      <CircularProgress
        style={{ position: 'absolute', top: '50%', left: '50%' }}
        color="secondary"
      />
    )
  }

  return (
    <Typography component="div" className={styles.event_list_wrapper}>
      <Typography component="div">
        <Button onClick={() => setOpen(true)}>Create Event</Button>
      </Typography>
      {events.map((event) => {
        return <EventItem key={event._id} myEvent={event} />
      })}
      {open && <CreateEventModal event={{}} open={open} setOpen={openModal} />}
    </Typography>
  )
}

export default memo(EventList)
