import React, { memo } from 'react'
import styles from '@styles/login.module.scss'
import { Paper } from '@material-ui/core'
import ButtonProgress from '@components/ButtonProgress'
import InputField from '@components/InputField'
import Link from 'next/link'
import { Form, Field } from 'react-final-form'
import { Person } from '@material-ui/icons'

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
    <Paper elevation={3} className={styles.login_wrapper}>
      <div className={styles.login_label}>Sign In</div>
      <Form
        onSubmit={handleButtonClick}
        initialValues={initialValues}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
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

      <div className={styles.noAccount}>
        No account yet ? <Link href="/register">Sign Up</Link>
      </div>
    </Paper>
  )
}

export default memo(Login)
