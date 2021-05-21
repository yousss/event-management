import React, { useCallback, useState, useEffect } from 'react'
import { userLoggedInState } from 'store/users'
import { useSetRecoilState } from 'recoil'
import { login } from '@context/auth'
import Head from 'next/head'
import Login from '@components/auth/Login'
import styled, { keyframes } from 'styled-components'
import { useMediaQuery, useTheme } from '@material-ui/core'
import useFetch from '@hooks/useFetch'

const Auth = () => {
  const [userInfo, setNewUserInfo] = useState({ username: '', password: '' })
  const setUserLoggedIn = useSetRecoilState(userLoggedInState)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [{ response, error, isLoading }, doFetch] = useFetch()

  const onLogin = useCallback(({ username, password }) => {
    setNewUserInfo({ username, password })
    setUserLoggedIn({
      isLoggedIn: true,
      username,
      userRole: { isAdmin: false },
    })
  })
  const { username, password } = userInfo
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

  useEffect(() => {
    if (!username && !password) return

    !response && doFetch({ isAuth: true, url: requestBody })
    const token = response?.login?.token
    token && login({ token })
    return () => {}
  }, [userInfo, response])

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <LoginPageStyle>
        {!isMobile && <Rotate>&lt; 💅🏾 &gt;</Rotate>}
        <Login loading={isLoading} onLogin={onLogin} />
      </LoginPageStyle>
    </>
  )
}
Auth.layout = 'auth'

const LoginPageStyle = styled.div`
  background-image: url('/img/login-bg.jpg');
  background-size: 100% 100%;
  max-width: 909px;
  margin: auto;
  height: 500px;
  background-position: bottom;
  width: 100%;
  border-radius: 10px;
  position: relative;

  ${(props) => props.theme.breakpoints.down('md')} {
    height: 580px;
  }

  ${(props) => props.theme.breakpoints.down('sm')} {
    background-image: none;
    max-width: initial;
    height: initial;
    justify-content: center;
    align-items: center;
    display: flex;
  }
`

// Create the keyframes
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

// Here we create a component that will rotate everything we pass in over two seconds
const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate} 2s linear infinite;
  padding: 2rem 1rem;
  font-size: 1.2rem;
`

export default Auth
