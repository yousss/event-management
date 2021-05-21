import React, { memo } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Paper from '@material-ui/core/Paper'
import Draggable from 'react-draggable'
import styled from 'styled-components'

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

const CancelEventModal = ({ open, setOpen, eventId, onCancelEvent }) => {
  const handleClose = () => {
    setOpen(false)
  }

  const agreeDelete = () => {
    setOpen(true)
    onCancelEvent(eventId)
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          {eventId}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure to cancel this events ?
          </DialogContentText>
        </DialogContent>
        <CancelStyleDialogActions>
          <Button onClick={agreeDelete} color="primary">
            Yes
          </Button>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
        </CancelStyleDialogActions>
      </Dialog>
    </>
  )
}

const CancelStyleDialogActions = styled(DialogActions)`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;

  button {
    border: 0.7px solid coral;
    margin: 0px 5px;
  }

  .title {
    width: 100%;
  }
`
export default memo(CancelEventModal)
