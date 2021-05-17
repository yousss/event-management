import React, { useEffect, useState, memo } from 'react'
import styles from '@styles/input.field.module.scss'

import { Visibility, VisibilityOff } from '@material-ui/icons'
import {
  InputLabel,
  FormControl,
  InputAdornment,
  FilledInput,
  IconButton,
} from '@material-ui/core'

const InputField = ({ type, name, icon, onChange, value, meta }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [customType, setCustomType] = useState('text')

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleChange = (event) => {
    onChange(event.target.value)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  useEffect(() => {
    if (type === 'password' && !showPassword) {
      setCustomType('password')
    } else {
      setCustomType('text')
    }
  }, [type, showPassword])

  return (
    <>
      <FormControl className={styles.form_wrapper} variant="filled">
        <InputLabel htmlFor={`outlined-adornment-${name}`}>{name}</InputLabel>
        <FilledInput
          id={`outlined-adornment-${name}`}
          type={customType}
          value={value}
          onChange={handleChange}
          className={styles.input_field}
          endAdornment={
            <InputAdornment position="end">
              {type === 'password' ? (
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              ) : icon ? (
                icon
              ) : (
                <IconButton />
              )}
            </InputAdornment>
          }
        />
        {meta.error && meta.touched && (
          <span className={styles.error_list}>{meta.error}</span>
        )}
      </FormControl>
    </>
  )
}

export default memo(InputField)
