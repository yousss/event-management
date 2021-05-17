import Register from '@components/auth/Register'
import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import _ from 'lodash'
import { BASE_URL_PRO } from 'config'

const register = () => {
  const router = useRouter()
  const [state, setState] = useState({ data: null, err: null, loading: false })

  const [userInfo, setUserInfo] = useState({
    username: '',
    phone: '',
    password: '',
    full_name: '',
    email: '',
    address: '',
  })

  const register = async () => {
    if (Object.entries(userInfo).length === 0) return

    setState((state) => ({ ...state, loading: true }))
    const { username, password, email, full_name, address, phone } = userInfo

    const requestBody = {
      query: `
      mutation {
        createUser(userInput:{ 
          username: "${username}", 
          password: "${password}", 
          email: "${email}", 
          address: "${address}", 
          full_name: "${full_name}"
          phone: "${phone}"
        }) {
        username
        email
        address
        full_name
        phone
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
        },
      })
      const { data } = await res.json()

      setState({ ...state, data: data })
      if (data) router.push('/login')
    } catch (error) {
      setState({ ...state, err: error })
    } finally {
      setState({ ...state, loading: false })
    }
  }

  useEffect(() => {
    register()
  }, [userInfo])

  const onRegister = useCallback(
    ({ username, password, full_name, email, address, phone }) => {
      setUserInfo({ username, password, email, address, phone, full_name })
    },
  )
  return (
    <>
      <Register loading={false} onRegister={onRegister} />
    </>
  )
}

export default register
