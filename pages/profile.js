import { withAuthSync } from '@context/auth'
import React from 'react'

const profile = () => {
  return <div>Hello Profile</div>
}

export default withAuthSync(profile)
