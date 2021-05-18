import React, { memo, useState, useCallback, useEffect } from 'react'
import useFetch from '@hooks/useFetch'
import EventItem from './Event'
import { Button, CircularProgress, Typography } from '@material-ui/core'
import styles from '@styles/event.list.module.scss'
import CreateEventModal from './CreateEventModal'
import { Pagination } from '@material-ui/lab'

const EventList = () => {
  const [open, setOpen] = useState(false)

  const openModal = useCallback(() => {
    setOpen(false)
  })

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

  const [{ response, error, isLoading }, doFetch] = useFetch(requestBody)

  useEffect(() => {
    doFetch({ isAuth: true })
    return () => {}
  }, [])

  useEffect(() => {
    !open && response?.events && doFetch({ isAuth: true })
  }, [open])

  if (isLoading) {
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
      {response?.events.map((event) => {
        return <EventItem key={event._id} myEvent={event} />
      })}
      <Pagination className={styles.pagination_wrapper} count={10} />
      {open && <CreateEventModal open={open} setOpen={openModal} />}
    </Typography>
  )
}

export default memo(EventList)
