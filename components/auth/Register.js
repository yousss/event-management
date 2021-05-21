import React, { memo, useCallback, useEffect, useState } from 'react'
import InputField from '@components/InputField'
import { AccountCircle, LocationOn, PhoneIphone } from '@material-ui/icons'
import { Paper, Avatar } from '@material-ui/core'
import ButtonProgress from '@components/ButtonProgress'
import { Field, Form } from 'react-final-form'
import CustomizedSnackbar from '@components/CustomizedSnackbar'
import styled from 'styled-components'

const Register = ({ onRegister, loading, err }) => {
  const initialValue = {
    password: '',
    username: '',
    email: '',
    full_name: '',
    address: '',
    phone: '',
  }
  const onSumbitHandler = (values) => {
    const { password, username, email, address, full_name, phone } = values
    onRegister({
      username,
      password,
      email,
      address,
      full_name,
      phone,
    })
  }

  const [open, setOpen] = useState(false)

  const handleCloseCallback = useCallback(() => {
    setOpen(false)
  })

  useEffect(() => {
    setOpen(true)
  }, [err])

  const required = (value) => (value ? undefined : 'Required')
  const mustBeNumber = (value) =>
    isNaN(value) ? 'Must be a number' : undefined
  const minValue = (min) => (value) =>
    !isNaN(value) || value.length >= min
      ? undefined
      : `Should be greater than ${min}`

  const validateEmail = (value) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(value).toLowerCase()) ? undefined : 'Email is invalid'
  }
  const composeValidators = (...validators) => (value) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined,
    )

  return (
    <RegisterStyle elevation={3}>
      {err && (
        <CustomizedSnackbar
          msg={err}
          open={open}
          handleOpen={handleCloseCallback}
          tag="error"
        />
      )}
      <div className={'register_left'}>
        <Avatar
          className={'avatar'}
          alt="Travis Howard"
          src="/img/avatar-2.jpeg"
        />
      </div>
      <div className="register_right">
        <Form
          onSubmit={onSumbitHandler}
          initialValues={initialValue}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Field
                name="full_name"
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
              <Field name="username" validate={required}>
                {({ input, meta }) => (
                  <InputField
                    name={input.name}
                    onChange={input.onChange}
                    value={input.value}
                    meta={meta}
                    icon={<AccountCircle />}
                  />
                )}
              </Field>
              <Field name="password" validate={required}>
                {({ input, meta }) => (
                  <InputField
                    name={input.name}
                    onChange={input.onChange}
                    value={input.value}
                    meta={meta}
                    type="password"
                  />
                )}
              </Field>
              <Field
                name="email"
                validate={composeValidators(required, validateEmail)}
              >
                {({ input, meta }) => (
                  <InputField
                    name={input.name}
                    onChange={input.onChange}
                    value={input.value}
                    meta={meta}
                  />
                )}
              </Field>
              <Field
                name="phone"
                validate={composeValidators(
                  required,
                  minValue(10),
                  mustBeNumber,
                )}
              >
                {({ input, meta }) => (
                  <InputField
                    name={input.name}
                    onChange={input.onChange}
                    value={input.value}
                    meta={meta}
                    icon={<PhoneIphone />}
                  />
                )}
              </Field>
              <Field name="address" validate={required}>
                {({ input, meta }) => (
                  <InputField
                    name={input.name}
                    onChange={input.onChange}
                    value={input.value}
                    meta={meta}
                    icon={<LocationOn />}
                  />
                )}
              </Field>
              <ButtonProgress text="Register" loading={loading} />
            </form>
          )}
        />
      </div>
    </RegisterStyle>
  )
}

const RegisterStyle = styled(Paper)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #2181c2;
  max-width: 700px;
  width: 100%;
  margin: auto;
  padding: 20px;
  form {
    width: 100%;
  }
  .register_left {
    flex-basis: 30%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;

    .avatar {
      width: 125px !important;
      height: 125px !important;
    }
  }
  .register_right {
    flex-basis: 70%;
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  ${(props) => props.theme.breakpoints.down('sm')} {
    display: flex;
    flex-flow: column wrap;

    .register_right {
      flex-basis: 100%;
      width: 100%;
    }
  }
`

export default memo(Register)
