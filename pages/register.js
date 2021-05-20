import RegisterComponent from '@components/auth/Register'
import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import _ from 'lodash'
import { BASE_URL_PRO } from 'config'
import Head from 'next/head'

const Authregister = () => {
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
    const { username, password, email, full_name, address, phone } = userInfo
    if (!username) return
    setState({ ...state, loading: true })
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
      const {
        data: { createUser },
        errors,
      } = await res.json()
      const err = errors && errors[0].message

      setState({ ...state, data: createUser, err: err, loading: false })
      if (createUser) router.push('/login')
    } catch (error) {
      const err = error && errors[0].message
      setState({ ...state, err: err, loading: false })
    }
  }

  useEffect(() => {
    userInfo && register()
  }, [userInfo])

  const onRegister = useCallback(
    ({ username, password, full_name, email, address, phone }) => {
      setUserInfo({ username, password, email, address, phone, full_name })
    },
  )
  const { loading, err } = state

  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <RegisterComponent loading={loading} err={err} onRegister={onRegister} />
    </>
  )
}

Authregister.layout = 'auth'
export default Authregister
