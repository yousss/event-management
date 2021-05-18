import React, { memo, useCallback } from 'react'
import Typography from '@material-ui/core/Typography'
import styles from '@styles/card.event.module.scss'
import Link from 'next/link'
import { Card, CardActions, CardContent, Button } from '@material-ui/core'
import CustomDialog from '@components/CustomDialog'

const Event = ({ myEvent }) => {
  const [open, setOpen] = React.useState(false)

  const handleClose = useCallback(() => {
    setOpen(false)
  })

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
        <Button size="small">Cancel </Button>
        <Button onClick={() => setOpen(true)} size="small">
          Detail
        </Button>
      </CardActions>
      <CustomDialog event={myEvent} open={open} setOpen={handleClose} />
    </Card>
  )
}

export default memo(Event)
