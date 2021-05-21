import React, { memo } from 'react'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import styled from 'styled-components'

const InputDateField = ({ type, name, icon, onChange, value, meta }) => {
  const handleChange = (event) => {
    onChange(event)
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePickerStyle>
        <DatePicker
          className={'input_wrapper'}
          name={name}
          autoOk
          inputVariant="outlined"
          type={type}
          label={name}
          format="MM/dd/yyyy"
          value={value}
          onChange={handleChange}
          fullWidth
          InputProps={{ position: 'end' }}
        />
        {meta.error && meta.touched && (
          <span className="error_list">{meta.error}</span>
        )}
      </DatePickerStyle>
    </MuiPickersUtilsProvider>
  )
}

const DatePickerStyle = styled.div`
  width: 100%;
  margin: 17px 0px !important;

  .input_field,
  label {
    width: 100%;
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

export default memo(InputDateField)
