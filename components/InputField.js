import React, { useEffect, useState, memo } from 'react'
import styles from '@styles/input.field.module.scss'

import { Visibility, VisibilityOff } from '@material-ui/icons'
import { InputAdornment, IconButton, TextField } from '@material-ui/core'

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

  const FieldIcon = () => {
    return (
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
        ) : null}
      </InputAdornment>
    )
  }

  return (
    <div className={styles.input_wrapper}>
      <TextField
        label={name}
        variant="outlined"
        fullWidth
        type={customType}
        value={value}
        onChange={handleChange}
        className={styles.input_field}
        InputProps={{
          endAdornment: <FieldIcon />,
        }}
      />
      {meta.error && meta.touched && (
        <span className={styles.error_list}>{meta.error}</span>
      )}
    </div>
  )
}

export default memo(InputField)
