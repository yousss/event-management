import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'

const CustomizedSnackbar = ({ handleOpen, open, msg, tag = 'success' }) => {
  const tags = {
    success: 'success',
    error: 'error',
    warning: 'warning',
    info: 'info',
  }

  const vertical = 'top'
  const horizontal = 'right'

  const anchorOrigin = { vertical, horizontal }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    handleOpen()
  }

  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      anchorOrigin={anchorOrigin}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={tags[tag]}>
        {msg}
      </Alert>
    </Snackbar>
  )
}

export default CustomizedSnackbar
