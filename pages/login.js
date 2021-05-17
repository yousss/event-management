import React, { useCallback, useState, useEffect } from 'react'
import Login from '@components/auth/Login'
import { userLoggedInState } from 'store/users'
import { useSetRecoilState } from 'recoil'
import { BASE_URL_PRO } from 'config'
import { login } from '@context/auth'

const Auth = () => {
  const [userInfo, setNewUserInfo] = useState({ username: '', password: '' })
  const setUserLoggedIn = useSetRecoilState(userLoggedInState)
  const [state, setState] = useState({ data: null, err: null, loading: false })

  const onLogin = useCallback(({ username, password }) => {
    setNewUserInfo({ username, password })
    setUserLoggedIn({
      isLoggedIn: true,
      username,
      userRole: { isAdmin: false },
    })
  })

  useEffect(async () => {
    const { username, password } = userInfo
    if (!username && !password) return

    const requestBody = {
      query: `
          mutation {
            login(username: "${username}", password: "${password}") {
            userId
            token
          }
        }
        `,
    }
    setState({ ...state, loading: true })

    try {
      const res = await fetch(BASE_URL_PRO, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const { data } = await res.json()
      const { token } = data.login
      setState({ data: token, ...state })
      login({ token })
    } catch (error) {
      setState({ data: null, err: error, ...state })
    } finally {
      setState({ ...state, loading: false })
    }
  }, [userInfo])

  const { loading } = state
  return <Login loading={loading} onLogin={onLogin} />
}
Auth.layout = 'auth'

export default Auth
