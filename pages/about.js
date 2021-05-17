import React from 'react'
import Head from 'next/head'
import styles from '@styles/about.module.scss'

const about = (props) => (
  <>
    <Head>
      <title>About</title>
    </Head>
    <h1 className={styles.h1}>Hello about page</h1>
  </>
)

export default about
