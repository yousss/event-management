import React, { memo } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import moment from '@helpers/moment'

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
      <CustomDialogStyle
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
      >
        <DialogTitle
          style={{ cursor: 'move' }}
          id="draggable-dialog-title"
          className="title"
        >
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            className="description"
            id="alert-dialog-description"
          >
            {description}
            <br />
            <span className="price">Price: $ {price}</span> <br />
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
      </CustomDialogStyle>
    </>
  )
}

const CustomDialogStyle = styled(Dialog)`
  max-width: 700px;
  width: 100%;
  margin: auto;

  .title {
    color: chocolate;
  }
  .description {
    .price {
      color: rgb(190, 88, 44);
      font-size: 1rem;
      font-weight: 500;
    }
  }
  button {
    border: 0.7px solid coral;
    margin: 0px 5px;
  }
`
export default memo(CustomDialog)
