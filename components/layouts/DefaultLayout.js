import Head from 'next/head'
import styles from '@styles/layout.module.scss'

import NavBar from '@components/NavBar'

const DefaultLayout = ({ children }) => (
  <>
    <Head>
      <title>Default layout</title>
    </Head>
    <NavBar />
    <div className={styles.container}>
      <main className={styles.main}>{children}</main>
    </div>
  </>
)

export default DefaultLayout
