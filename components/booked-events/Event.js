import React, { memo, useCallback } from 'react'
import Typography from '@material-ui/core/Typography'
import { Card, CardActions, CardContent, Button } from '@material-ui/core'
import CustomDialog from '@components/booked-events/CustomDialog'
import EventModal from './EventModal'
import useFetch from '@hooks/useFetch'
import { useSetRecoilState } from 'recoil'
import { dispatchToEventListState } from 'store/events'
import styled from 'styled-components'

const Event = ({ myEvent }) => {
  const [open, setOpen] = React.useState(false)
  const [cancelModalOpen, setCancelModalOpen] = React.useState(false)
  const [bookedEventId, setBookedEvents] = React.useState('')
  const [bookedCancel, setBookedCancel] = React.useState({ isBooked: false })
  const setDispatchToEventList = useSetRecoilState(dispatchToEventListState)

  const handleClose = useCallback(() => {
    setOpen(false)
  })

  const handleCloseCancelModal = useCallback((val) => {
    setCancelModalOpen(val)
  })

  const requestBody = {
    query: `
    mutation {
    cancellBookingEvent (
      bookingId: "${bookedEventId}") {
        _id
        title
        isBooked
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
  const requestBodyBookedEvent = {
    query: `
    mutation {
      bookEvent (
        eventId: "${bookedEventId}") {
        _id
        user {
          username
        }
        event {
          _id
          isBooked
        }
        createdAt
        }
    }
    `,
  }
  const { isBooked } = bookedCancel
  const bodyRequest = isBooked ? requestBodyBookedEvent : requestBody

  const [{ response, error, isLoading }, doFetch] = useFetch()
  React.useEffect(() => {
    if (bookedEventId) {
      doFetch({ isAuth: true, url: bodyRequest })
      setDispatchToEventList({ dispatching: true })
    }
    return () => {}
  }, [bookedEventId])

  return (
    <CardStyleEvent>
      <CardContent>
        <Typography variant="h5" component="h2" className="title" gutterBottom>
          {myEvent.title}
        </Typography>

        <Typography variant="body2" className="description" component="p">
          {myEvent.description}
        </Typography>
      </CardContent>
      <CardActions className="btn_wrapper">
        {myEvent?.isBooked === 2 ? (
          <Button
            onClick={() => {
              handleCloseCancelModal(true)
              setBookedCancel({ isBooked: false })
            }}
            className="button"
            size="small"
          >
            Cancel
          </Button>
        ) : (
          <Button
            onClick={() => {
              handleCloseCancelModal(true)
              setBookedCancel({ isBooked: true })
            }}
            className="button"
            size="small"
          >
            Book
          </Button>
        )}
        <Button className="button" onClick={() => setOpen(true)} size="small">
          Detail
        </Button>
      </CardActions>
      <CustomDialog event={myEvent} open={open} setOpen={handleClose} />
      <EventModal
        eventId={myEvent._id}
        open={cancelModalOpen}
        setOpen={handleCloseCancelModal}
        onCancelEvent={setBookedEvents}
        isBooked={bookedCancel}
      />
    </CardStyleEvent>
  )
}

const CardStyleEvent = styled(Card)`
  flex-basis: 45%;
  text-align: left;
  color: inherit;
  text-decoration: none;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;
  max-width: 600px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 4px 0px;
  border-radius: 10px !important;

  .title {
    color: chocolate;
    font-size: 1.2rem;
  }

  .description {
    font-size: 0.9rem;
  }
  .btn_wrapper {
    display: flex;
    flex-flow: column wrap;
    justify-content: space-between;
    align-items: flex-end;

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
  }
  &:hover,
  &:focus,
  &:active {
    border-color: chocolate;
  }

  .card h3 {
    margin: 0 0 1rem 0;
    font-size: 1.5rem;
  }

  .card p {
    margin: 0;
    font-size: 1.25rem;
    line-height: 1.5;
  }

  .logo {
    height: 1em;
  }

  @media (max-width: 600px) {
    .grid {
      width: 100%;
      flex-direction: column;
    }
  }
`
export default memo(Event)
