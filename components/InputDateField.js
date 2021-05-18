import React, { memo } from 'react'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import styles from '@styles/input.field.module.scss'

const InputDateField = ({ type, name, icon, onChange, value, meta }) => {
  const handleChange = (event) => {
    onChange(event)
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        className={styles.form_wrapper}
        name={name}
        autoOk
        inputVariant="outlined"
        type={type}
        label={name}
        format="MM/dd/yyyy"
        value={value}
        onChange={handleChange}
        fullWidth
        InputAdornmentProps={{ position: 'end' }}
      />
      {meta.error && meta.touched && (
        <span className={styles.error_list}>{meta.error}</span>
      )}
    </MuiPickersUtilsProvider>
  )
}

export default memo(InputDateField)
