import { Fade, Modal, Backdrop, Card } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import InputField from '@components/InputField'
import ButtonProgress from './ButtonProgress'
import { BASE_URL_PRO } from 'config'
import cookie from 'js-cookie'
import CustomizedSnackbar from './CustomizedSnackbar'
import { AccountCircle } from '@material-ui/icons'
import styled from 'styled-components'

export default function TransitionsModal({ open, openHandler, newDate = '' }) {
  const [loading, setLoading] = React.useState(false)
  const [enableSnarkBar, setEnableSnarkBar] = React.useState(false)

  const handleClose = () => {
    openHandler(false)
  }

  const handleOpen = (e) => {
    setEnableSnarkBar(e)
  }

  const convertedDate = convertDate(newDate)

  const [values, setValues] = useState({
    title: '',
    description: '',
    price: '',
    date: convertedDate,
  })

  useEffect(() => {
    setValues({ ...values, date: convertedDate })
  }, [newDate])

  const { title, description, price, date } = values

  const handleButtonClick = async () => {
    setLoading(true)
    const requestBody = {
      query: `
        mutation {
            createEvent(
                eventInput:{
                    title: "${title}",
                    description: "${description}",
                    price:${price},
                    date:"${date}"
            }) {
          _id
          title
          description
          price
          date
          creator {
              username
          }
        }
      }
      `,
    }
    try {
      const res = await fetch(BASE_URL_PRO, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + cookie.get('token'),
        },
      })
      const { data } = await res.json()
      setEnableSnarkBar(true)
      openHandler(false)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const onChange = (event) => {
    setValues(event)
  }

  return (
    <>
      <TransitionsModalStyle
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className="modal_wrapper"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className="paper">
            <Card className="card_wrapper">
              <h2 id="transition-modal-title">CREAE EVENT</h2>
              <InputField
                name="title"
                type="text"
                onChange={onChange}
                value={values}
                icon={<AccountCircle />}
              />
              <InputField
                name="description"
                type="text"
                placeholder="description"
                onChange={onChange}
                values={values}
              />
              <InputField
                name="price"
                type="text"
                placeholder="price"
                onChange={onChange}
                values={values}
              />
              <InputField
                name="date"
                type="text"
                placeholder="date"
                onChange={onChange}
                values={values}
              />
              <ButtonProgress
                text="Save"
                loading={loading}
                handleButtonClick={handleButtonClick}
              />
            </Card>
          </div>
        </Fade>
      </TransitionsModalStyle>
      <CustomizedSnackbar
        msg="Event has been succesfully created."
        handleOpen={handleOpen}
        open={enableSnarkBar}
      />
    </>
  )
}

export const convertDate = function (str) {
  var date = new Date(str),
    mnth = ('0' + (date.getMonth() + 1)).slice(-2),
    day = ('0' + date.getDate()).slice(-2)
  return [date.getFullYear(), mnth, day].join('-')
}

const TransitionsModalStyle = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 600px;
  margin: auto;
  width: 100%;

  .paper {
    display: flex;
    width: 100%;
    text-align: center;

    .card_wrapper {
      padding: 10px;
      width: 100%;
      justify-content: center;
    }

    .text_field {
      width: 100%;
    }
  }
`
