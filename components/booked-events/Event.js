import React, { memo, useCallback } from 'react'
import Typography from '@material-ui/core/Typography'
import styles from '@styles/card.event.module.scss'
import { Card, CardActions, CardContent, Button } from '@material-ui/core'
import CustomDialog from '@components/booked-events/CustomDialog'
import CancelEventModal from './CancelEventModal'
import useFetch from '@hooks/useFetch'
import { useSetRecoilState } from 'recoil'
import { dispatchToEventListState } from 'store/events'

const Event = ({ myEvent }) => {
  const [open, setOpen] = React.useState(false)
  const [cancelModalOpen, setCancelModalOpen] = React.useState(false)
  const [bookedEventId, setBookedEvents] = React.useState('')
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
  const [{ response, error, isLoading }, doFetch] = useFetch()

  React.useEffect(() => {
    if (bookedEventId) {
      doFetch({ isAuth: true, url: requestBody })

      setDispatchToEventList({ dispatching: true })
    }
    return () => {}
  }, [bookedEventId])

  return (
    <Card className={styles.card}>
      <CardContent>
        <Typography
          variant="h5"
          component="h2"
          className={styles.title}
          gutterBottom
        >
          {myEvent.title}
        </Typography>

        <Typography
          variant="body2"
          className={styles.description}
          component="p"
        >
          {myEvent.description}
        </Typography>
      </CardContent>
      <CardActions className={styles.btn_wrapper}>
        <Button
          onClick={() => handleCloseCancelModal(true)}
          className={styles.button}
          size="small"
        >
          Cancel
        </Button>
        <Button
          className={styles.button}
          onClick={() => setOpen(true)}
          size="small"
        >
          Detail
        </Button>
      </CardActions>
      <CustomDialog event={myEvent} open={open} setOpen={handleClose} />
      <CancelEventModal
        eventId={myEvent._id}
        open={cancelModalOpen}
        setOpen={handleCloseCancelModal}
        onCancelEvent={setBookedEvents}
      />
    </Card>
  )
}

export default memo(Event)
