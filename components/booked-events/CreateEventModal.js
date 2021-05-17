import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import styles from '@styles/event.modal.module.scss'
import InputField from '@components/InputField'
import { Form, Field } from 'react-final-form'
import { useCreateEvent } from '@hooks/events'
import InputDateField from '@components/InputDateField'

const CreateEventModal = ({ event, setOpen, open }) => {
  const [eventState, setEventState] = useState(event)
  const initialValues = { title: '', description: '', date: '', price: '' }
  const { loading, events, error } = useCreateEvent(eventState | initialValues)
  const handleClose = () => {
    setOpen()
  }

  const { _id } = eventState

  const handleButtonClick = (props) => {
    setEventState(props)
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
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className={styles.dialog_wrapper}
    >
      <DialogTitle className={styles.title} id="alert-dialog-title">
        {_id ? 'UPDATE EVENT' : 'CREATE EVENT'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          className={styles.description}
          id="alert-dialog-description"
        >
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
                <Field name="price" validate={required}>
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
        </DialogContentText>
      </DialogContent>
    </Dialog>
  )
}

export default CreateEventModal
