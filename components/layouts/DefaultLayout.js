import Head from 'next/head'
import NavBar from '@components/NavBar'

const DefaultLayout = ({ children }) => (
  <>
    <Head>
      <title>Default layout</title>
    </Head>
    <NavBar />
    <div className="container">
      <main className="main">{children}</main>
    </div>
  </>
)

export default DefaultLayout
