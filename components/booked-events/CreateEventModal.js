import React, { useEffect, useState, memo } from 'react'
import Button from '@material-ui/core/Button'
import InputField from '@components/InputField'
import { Form, Field } from 'react-final-form'
import InputDateField from '@components/InputDateField'
import { Dialog, DialogContent, DialogTitle, Modal } from '@material-ui/core'
import useFetch from '@hooks/useFetch'
import Paper from '@material-ui/core/Paper'
import Draggable from 'react-draggable'
import styled from 'styled-components'

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper style={{ width: '100%', borderRadius: '10px' }} {...props} />
    </Draggable>
  )
}

const CreateEventModal = ({ setIsCancel, setOpen, open }) => {
  const [data, setData] = useState({})
  let { title, description, price, date } = data && data
  date = date ? new Date(date).toISOString() : new Date().toISOString()
  const handleButtonClick = (props) => {
    setData(props)
  }

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

  const [{ response, error, isLoading }, doFetch] = useFetch()

  let initialValues = {
    title: '',
    description: '',
    date: '',
    price: '',
  }

  useEffect(() => {
    response && handleClose('save')
  }, [response])

  useEffect(() => {
    data &&
      Object.entries(data).length > 0 &&
      doFetch({ isAuth: true, url: requestBody })
  }, [data])

  const handleClose = (val) => {
    setIsCancel(val)
    setOpen()
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
    <CreateEventModalStyle
      open={open}
      onClose={handleClose}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
      disableBackdropClick
    >
      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        <div className="title" id="alert-dialog-title">
          {data?._id ? 'UPDATE EVENT' : 'CREATE EVENT'}
        </div>
      </DialogTitle>
      <DialogContent>
        <div className="description" id="alert-dialog-description">
          <Form
            onSubmit={handleButtonClick}
            initialValues={initialValues}
            render={({ handleSubmit, reset }) => (
              <form
                onSubmit={(event) => {
                  handleSubmit(event)
                }}
              >
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
                <div className="btn_wrapper">
                  <Button type="submit" color="primary">
                    Save
                  </Button>
                  <Button onClick={() => handleClose('cancel')} color="primary">
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          />
        </div>
      </DialogContent>
    </CreateEventModalStyle>
  )
}

export default memo(CreateEventModal)

const CreateEventModalStyle = styled(Dialog)`
  .btn_wrapper {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;

    button {
      border: 0.7px solid coral;
      margin: 0px 5px;
    }
  }

  .title {
    width: 100%;
  }
`
