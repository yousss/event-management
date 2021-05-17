import React from 'react'
import styles from '@styles/button.progress.module.scss'
import { Button, CircularProgress } from '@material-ui/core'

const ButtonProgress = ({ text, loading, handleButtonClick, size }) => {
  return (
    <div className={styles.wrapper}>
      <Button
        variant="contained"
        disabled={loading}
        size={size ? size : 'large'}
        onClick={handleButtonClick}
        className={styles.btnColor}
        type="submit"
      >
        {text}
      </Button>
      {loading && (
        <CircularProgress size={24} className={styles.buttonProgress} />
      )}
    </div>
  )
}

export default ButtonProgress
