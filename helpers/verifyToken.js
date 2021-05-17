import { BASE_URL_PRO } from 'config'
import { useEffect, useState } from 'react'

export default (accessToken = '') => {
  const [verified, setVerified] = useState(false)
  useEffect(async () => {
    if (accessToken) {
      const { verified } = await fetch(BASE_URL_PRO, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      console.log(verified, 'verifyTokenvv')
      if (verified) {
        setVerified(verified)
      } else {
        setVerified(false)
      }
    }
  }, [accessToken])

  return verified
}
