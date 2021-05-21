import Head from 'next/head'
import { GlobalStyle } from './AuthLayout'
import NavBar from '@components/NavBar'

const DefaultLayout = ({ children }) => (
  <>
    <Head>
      <title>Default layout</title>
    </Head>
    <NavBar />
    <GlobalStyle>
      <div className="container">
        <main className="main">{children}</main>
      </div>
    </GlobalStyle>
  </>
)

export default DefaultLayout
