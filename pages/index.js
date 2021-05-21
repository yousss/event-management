import Head from 'next/head'
import Calendar from 'react-calendar'
import React, { useState, useEffect } from 'react'
import 'react-calendar/dist/Calendar.css'
import { withAuthSync } from '@context/auth'
import { Card, CircularProgress } from '@material-ui/core'
import cookie from 'js-cookie'
import { BASE_URL_PRO } from 'config'
import styled from 'styled-components'

const Home = function Home() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = useState(new Date())
  const [loading, setLoading] = useState(false)

  const handleClick = (e) => {
    setOpen(true)
    setValue(e)
  }
  const openHandler = (e) => {
    setOpen(false)
  }
  const activeDate = ({ active, date, view }) => {
    return date.getDate() === 8
  }
  const titleAactive = ({ active, date, view }) => {
    return view === 'month' && date.getDate() === 10 ? (
      <BookedStyle>Meeting</BookedStyle>
    ) : null
  }

  useEffect(async () => {
    setLoading(true)
    const requestBody = {
      query: `
      query {
        events {
        _id
        title
        description
        date
        price
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
      console.log(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
    return () => {}
  }, [])

  return (
    <HomeStyle>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Card>
        <Calendar
          className={'react_calendar'}
          onChange={handleClick}
          value={value}
          tileContent={titleAactive}
          tileDisabled={activeDate}
        ></Calendar>
      </Card>
      {loading && (
        <CircularProgress
          style={{ position: 'absolute', top: '50%', left: '50%' }}
          color="secondary"
        />
      )}
      {/* <TransitionsModal openHandler={openHandler} open={open} newDate={value} /> */}
    </HomeStyle>
  )
}

const HomeStyle = styled.div`
  .react_calendar {
    width: 100% !important;
    border: none !important;
    position: relative;

    button {
      position: relative;
      height: 50px;
    }
  }
  width: 100% !important;
  border: none !important;
  position: relative;

  button {
    position: relative;
    height: 50px;
  }
  .act-calendar__tile {
    position: relative;
  }
  .disabled {
    background-color: hotpink;
  }
`
const BookedStyle = styled.div`
  color: rgb(0, 255, 157);
  position: absolute;
  right: 0;
  top: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`
export default withAuthSync(Home)
