import Head from 'next/head'
import styles from '@styles/layout.module.scss'

const AuthLayout = ({ children }) => (
  <>
    <Head>
      <title>Auth</title>
    </Head>
    <div className={styles.container}>{children}</div>
  </>
)

export default AuthLayout
