import Head from 'next/head'
import styled from 'styled-components'

export const GlobalStyle = styled.div`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  .main {
    padding: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .footer {
    width: 100%;
    height: 100px;
    border-top: 1px solid #eaeaea;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .footer img {
    margin-left: 0.5rem;
  }

  .footer a {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`
const AuthLayout = ({ children }) => (
  <>
    <Head>
      <title>Auth</title>
    </Head>
    <GlobalStyle>
      <div className="container">{children}</div>
    </GlobalStyle>
  </>
)

export default AuthLayout
