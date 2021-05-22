import React, { memo, useState, useCallback, useEffect } from 'react'
import useFetch from '@hooks/useFetch'
import EventItem from './Event'
import { Button, CircularProgress, Typography } from '@material-ui/core'
import CreateEventModal from './CreateEventModal'
import { Pagination } from '@material-ui/lab'
import { useRecoilValue } from 'recoil'
import { dispatchToEventListState } from 'store/events'
import styled from 'styled-components'

const EventList = () => {
  const [open, setOpen] = useState(false)
  const [{ cancel, save }, setIsCancel] = useState({
    cancel: false,
    save: false,
  })
  const [page, setPage] = useState(1)
  const [rowPerPage, setRowPerPage] = useState(10)
  const readDispatchingEventState = useRecoilValue(dispatchToEventListState)

  const openModal = useCallback(() => {
    setOpen(false)
  })

  const handlePaging = (e, page) => {
    setPage(page)
  }
  const setIsCancelCallback = useCallback((val) => {
    if (val === 'cancel') {
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
          isBooked
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
    const isValid = readDispatchingEventState?.dispatching
    if (!save && !isValid) {
      doFetch({ isAuth: true, url: requestBody })
    } else if (save || isValid) {
      doFetch({ isAuth: true, url: requestBody })
    }
    return () => {}
  }, [page, save, readDispatchingEventState])

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
    <EventListStyle>
      <Typography className="event_list_create_btn" component="div">
        <Button className="button" onClick={() => setOpen(true)}>
          Create Event
        </Button>
      </Typography>
      {response?.events?.events.map((event) => {
        return <EventItem key={event._id} myEvent={event} />
      })}
      <Pagination
        onChange={handlePaging}
        page={page}
        className="pagination_wrapper"
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
    </EventListStyle>
  )
}

const EventListStyle = styled.div`
  max-width: 600px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;

  .event_list_create_btn {
    text-align: right;
    margin-bottom: 10px;
  }

  .pagination_wrapper {
    margin: 10px 0px;
    .Mui-selected {
      background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
    }
  }

  .button {
    background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
    color: #fff;
    outline: none;
    font-size: 0.8rem;

    &:hover {
      background: linear-gradient(45deg, #ff8e53 30%, #fe6b8b 90%) !important;
      font-size: 0.8rem;
    }
  }
`

export default memo(EventList)
