import React, { memo, useState, useCallback, useEffect } from 'react'
import useFetch from '@hooks/useFetch'
import EventItem from './Event'
import { Button, CircularProgress, Typography } from '@material-ui/core'
import styles from '@styles/event.list.module.scss'
import CreateEventModal from './CreateEventModal'
import { Pagination } from '@material-ui/lab'

const EventList = () => {
  const [open, setOpen] = useState(false)
  const [{ cancel, save }, setIsCancel] = useState({
    cancel: false,
    save: false,
  })
  const [page, setPage] = useState(1)
  const [rowPerPage, setRowPerPage] = useState(10)

  const openModal = useCallback(() => {
    setOpen(false)
  })

  const handlePaging = (e, page) => {
    setPage(page)
  }
  const setIsCancelCallback = useCallback((val) => {
    if (val == 'cancel') {
      setIsCancel((preve) => {
        return { ...preve, cancel: true }
      })
    } else {
      setIsCancel((preve) => {
        return { ...preve, save: true }
      })
    }
  })

  const requestBody = {
    query: `
    query {
      events(rowPerPage:${rowPerPage}, page:${page}) {
        events {
          _id
          title
          description
          date
          price
          creator {
            username
          }
        },
        pageInfo {
          rowCount
        }
      }
    }
    `,
  }

  const [{ response, error, isLoading }, doFetch] = useFetch()

  useEffect(() => {
    doFetch({ isAuth: true, url: requestBody })
    return () => {}
  }, [page])

  useEffect(() => {
    save && response?.events?.events && doFetch({ isAuth: true })
  }, [save])

  const pageSize = response?.events?.pageInfo?.rowCount
  const size = Math.ceil(pageSize / rowPerPage)

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
      <Typography className={styles.event_list_create_btn} component="div">
        <Button className={styles.button} onClick={() => setOpen(true)}>
          Create Event
        </Button>
      </Typography>
      {response?.events?.events.map((event) => {
        return <EventItem key={event._id} myEvent={event} />
      })}
      <Pagination
        onChange={handlePaging}
        page={page}
        className={styles.pagination_wrapper}
        count={size}
        color="secondary"
      />
      {open && (
        <CreateEventModal
          open={open}
          setOpen={openModal}
          setIsCancel={setIsCancelCallback}
        />
      )}
    </Typography>
  )
}

export default memo(EventList)
