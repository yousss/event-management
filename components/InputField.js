import React, { useEffect, useState, memo } from 'react'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { InputAdornment, IconButton, TextField } from '@material-ui/core'
import styled from 'styled-components'

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
        ) : (
          <></>
        )}
      </InputAdornment>
    )
  }

  return (
    <InputFieldStyle>
      <TextField
        label={name}
        variant="outlined"
        fullWidth
        type={customType}
        value={value}
        onChange={handleChange}
        className="input_field"
        InputProps={{
          endAdornment: <FieldIcon />,
        }}
      />
      {meta.error && meta.touched && (
        <span className="error_list">{meta.error}</span>
      )}
    </InputFieldStyle>
  )
}

const InputFieldStyle = styled.div`
  width: 100%;
  padding: 9px 0px !important;
  .MuiOutlinedInput-root {
    border-radius: 10px !important;
  }

  .MuiOutlinedInput-input {
    padding: 15px 14px;
    height: 1.35em;
  }
  .input_field,
  label {
    width: 100%;
    top: -2px;
    text-transform: capitalize;
  }
  fieldset {
    border-radius: 10px !important;
  }
  .error_list {
    color: rgb(238, 30, 30);
    font-size: 0.8rem;
    font-style: italic;
  }
`

export default memo(InputField)
