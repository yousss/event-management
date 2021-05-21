import React, { memo } from 'react'
import { Paper } from '@material-ui/core'
import ButtonProgress from '@components/ButtonProgress'
import InputField from '@components/InputField'
import Link from 'next/link'
import { Form, Field } from 'react-final-form'
import { Person } from '@material-ui/icons'
import styled from 'styled-components'

const LoginStyle = styled(Paper)`
  display: flex;
  align-items: flex-start;
  flex-flow: column wrap;
  max-width: 400px;
  width: 100%;
  padding: 20px;
  border-radius: 0px 0px 10px 10px !important;
  margin: auto;
  position: absolute;
  top: 0;
  left: 33%;
  transform: translateX(-10%);

  ${(props) => props.theme.breakpoints.down('sm')} {
    box-shadow: none !important;
    left: initial;
    transform: initial;
  }

  .login_label {
    font-size: 1.3rem;
    font-weight: 700;
    text-align: center;
    width: 100%;
    padding-bottom: 10px;
    text-transform: uppercase;
  }

  form {
    width: 100%;
  }
  .noAccount {
    margin-top: 10px;
    text-align: right;
    width: 100%;

    a {
      color: sandybrown;
      &:hover {
        text-decoration: yellowgreen;
        text-transform: uppercase;
      }
    }
  }
`

function Login({ onLogin, loading }) {
  const initialValues = { password: '', username: '' }

  const handleButtonClick = ({ username, password }) => {
    onLogin({
      username,
      password,
    })
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
    <LoginStyle elevation={3}>
      <div className="login_label">Sign In</div>
      <Form
        onSubmit={handleButtonClick}
        initialValues={initialValues}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field
              name="username"
              validate={composeValidators(required, minValue(3))}
            >
              {({ input, meta }) => (
                <InputField
                  name={input.name}
                  value={input.value}
                  type="text"
                  onChange={input.onChange}
                  meta={meta}
                  icon={<Person />}
                />
              )}
            </Field>
            <Field name="password" validate={required}>
              {({ input, meta }) => (
                <InputField
                  name={input.name}
                  type="password"
                  onChange={input.onChange}
                  value={input.value}
                  meta={meta}
                />
              )}
            </Field>
            <ButtonProgress text="login" loading={loading} />
          </form>
        )}
      />

      <div className={'noAccount'}>
        No account yet ? <Link href="/register">Sign Up</Link>
      </div>
    </LoginStyle>
  )
}

export default memo(Login)
