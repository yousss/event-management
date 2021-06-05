import ProfileAccount from '@components/users/account'
import Head from 'next/head'
import React from 'react'

const account = () => {
  return (
    <React.Fragment>
      <Head>
        <title>My Account</title>
      </Head>
      <ProfileAccount />
    </React.Fragment>
  )
}

export default account
