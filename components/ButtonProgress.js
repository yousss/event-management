import React from 'react'
import { Button, CircularProgress } from '@material-ui/core'
import styled from 'styled-components'

const ButtonProgress = ({ text, loading, handleButtonClick, size }) => {
  return (
    <ButtonStyle>
      <Button
        variant="contained"
        disabled={loading}
        size={size ? size : 'large'}
        onClick={handleButtonClick}
        className={'btnColor'}
        type="submit"
      >
        {text}
      </Button>
      {loading && <CircularProgress size={24} className={'buttonProgress'} />}
    </ButtonStyle>
  )
}

const ButtonStyle = styled.div`
  .buttonProgress {
    color: green;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -12px;
    margin-left: -12px;
  }
  .default_button_style {
    padding: 13px 52px;
    margin: 10px;
  }
  margin: 2px;
  position: relative;
  display: flex;
  justify-content: center;

  .btnColor {
    background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  }
`
export default ButtonProgress
