import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import styles from '@styles/event.modal.module.scss'
import InputField from '@components/InputField'
import { Form, Field } from 'react-final-form'
import InputDateField from '@components/InputDateField'
import { CircularProgress, Modal } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import useFetch from '@hooks/useFetch'

function rand() {
  return Math.round(Math.random() * 20) - 10
}

function getModalStyle() {
  const top = 50 + rand()
  const left = 50 + rand()

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 600,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 10,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))
const CreateEventModal = ({ event, setOpen, open }) => {
  const [data, setData] = useState({})
  let { title, description, price, date } = data && data
  date = date ? new Date(date).toISOString() : new Date().toISOString()
  const requestBody = {
    query: `
      mutation {
      createEvent (
        eventInput:
            { title:"${title}",
            description:"${description}",
            price:${Number(price)},
            date: "${date}"
          }) {
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
  const [{ response, error, isLoading }, doFetch] = useFetch(requestBody)

  const classes = useStyles()
  const [modalStyle] = React.useState(getModalStyle)

  let initialValues = {
    title: '',
    description: '',
    date: '',
    price: '',
  }

  useEffect(() => {
    response && handleClose()
  }, [response])

  useEffect(() => {
    data && Object.entries(data).length > 0 && doFetch({ isAuth: true })
  }, [data])

  const handleClose = () => {
    setOpen()
  }

  const handleButtonClick = (props) => {
    setData(props)
  }

  const required = (value) => (value ? undefined : 'Required')
  const mustBeNumber = (value) =>
    isNaN(value) ? 'Must be a number' : undefined
  const minValue = (min) => (value) =>
    !isNaN(value) || value.length >= min
      ? undefined
      : `Should be greater than ${min}`
  const composeValidators = (...validators) => (value) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined,
    )

  return (
    <Modal open={open} onClose={handleClose} className={styles.dialog_wrapper}>
      <div style={modalStyle} className={classes.paper}>
        <div className={styles.title} id="alert-dialog-title">
          {data?._id ? 'UPDATE EVENT' : 'CREATE EVENT'}
        </div>
        <div className={styles.description} id="alert-dialog-description">
          <Form
            onSubmit={handleButtonClick}
            initialValues={initialValues}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Field
                  name="title"
                  validate={composeValidators(required, minValue(3))}
                >
                  {({ input, meta }) => (
                    <InputField
                      name={input.name}
                      value={input.value}
                      type="text"
                      onChange={input.onChange}
                      meta={meta}
                    />
                  )}
                </Field>
                <Field name="description" validate={required}>
                  {({ input, meta }) => (
                    <InputField
                      name={input.name}
                      type="text"
                      onChange={input.onChange}
                      value={input.value}
                      meta={meta}
                    />
                  )}
                </Field>
                <Field
                  name="price"
                  validate={composeValidators(required, mustBeNumber)}
                >
                  {({ input, meta }) => (
                    <InputField
                      name={input.name}
                      type="text"
                      onChange={input.onChange}
                      value={input.value}
                      meta={meta}
                    />
                  )}
                </Field>
                <Field name="date">
                  {({ input, meta }) => (
                    <InputDateField
                      name={input.name}
                      type="text"
                      onChange={input.onChange}
                      value={input.value || new Date()}
                      meta={meta}
                      fullWidth
                    />
                  )}
                </Field>
                <div className={styles.btn_wrapper}>
                  <Button type="submit" color="primary">
                    Save
                  </Button>
                  <Button onClick={handleClose} color="primary">
                    Close
                  </Button>
                </div>
              </form>
            )}
          />
        </div>
      </div>
    </Modal>
  )
}

export default CreateEventModal
