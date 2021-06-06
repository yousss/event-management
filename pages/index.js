import Head from 'next/head'
import Calendar from 'react-calendar'
import React, { useState, useEffect } from 'react'
import 'react-calendar/dist/Calendar.css'
import { withAuthSync } from '@context/auth'
import { Card, CircularProgress } from '@material-ui/core'
import styled from 'styled-components'
import useFetch from '@hooks/useFetch'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'

const Home = function Home() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = useState(new Date())

  const handleClick = (e) => {
    setOpen(true)
    setValue(e)
  }
  const openHandler = (e) => {
    setOpen(false)
  }

  const requestBody = {
    query: `
    query {
      bookings {
        _id
        event {
          _id
        }
        user {
          username
        }
        createdAt
      }
    }
    `,
  }

  const [{ response, error, isLoading }, doFetch] = useFetch()

  useEffect(async () => {
    doFetch({ isAuth: true, url: requestBody })
  }, [])

  let bookedDate = response?.bookings?.map((x) => {
    return new Date(x.createdAt).getDate()
  }, [])

  let bookedMonth = response?.bookings?.map((x) => {
    return new Date(x.createdAt).getMonth()
  }, [])
  console.log(bookedMonth, bookedDate)
  const activeDate = ({ active, date, view }) => {
    if (
      bookedDate &&
      bookedMonth &&
      bookedMonth.includes(date.getMonth()) &&
      Object.keys(bookedDate).length > 0 &&
      bookedDate.includes(date.getDate())
    )
      return true
    return false
  }
  const titleAactive = ({ active, date, view }) => {
    return view === 'month' && date.getDate() === 10 ? (
      <BookedStyle>Meeting</BookedStyle>
    ) : null
  }

  const onViewChange = ({ activeStartDate, value, view }) =>
    alert('New view is: ', view)

  return (
    <HomeStyle>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Card>
        <Calendar
          nextLabel={<NavigateNextIcon onClick={onViewChange} />}
          prevLabel={<NavigateBeforeIcon onClick={onViewChange} />}
          className={'react_calendar'}
          onChange={handleClick}
          value={value}
          tileContent={titleAactive}
          tileDisabled={activeDate}
          onViewChange={onViewChange}
        ></Calendar>
      </Card>
      {isLoading && (
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
