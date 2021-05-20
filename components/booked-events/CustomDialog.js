import React, { memo } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import styles from '@styles/more.detail.module.scss'
import moment from '@helpers/moment'

import Paper from '@material-ui/core/Paper'
import Draggable from 'react-draggable'

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  )
}

const CustomDialog = ({ event, setOpen, open }) => {
  const handleClose = () => {
    setOpen()
  }

  const {
    title,
    description,
    date,
    price,
    creator: { username },
  } = event

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        className={styles.dialog_wrapper}
      >
        <DialogTitle
          style={{ cursor: 'move' }}
          id="draggable-dialog-title"
          className={styles.title}
        >
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            className={styles.description}
            id="alert-dialog-description"
          >
            {description}
            <br />
            <span className={styles.price}>Price: $ {price}</span> <br />
            <span>Created By {username}</span>
            <br />
            <span>Dated On {moment(date)}</span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default memo(CustomDialog)
