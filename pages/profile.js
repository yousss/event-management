import { withAuthSync } from '@context/auth'
import Head from 'next/head'
import React from 'react'

const profile = () => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div>Hello Profile</div>
    </>
  )
}

export default withAuthSync(profile)
