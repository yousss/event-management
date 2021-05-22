import Head from 'next/head'

const AuthLayout = ({ children }) => (
  <>
    <Head>
      <title>Auth</title>
    </Head>
    <div className="container">{children}</div>
  </>
)

export default AuthLayout
