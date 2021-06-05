import Head from 'next/head'
import React from 'react'
import { withAuthSync } from '@context/auth'

const User = () => {
  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <div>Hello User</div>
    </>
  )
}

export default withAuthSync(User)
