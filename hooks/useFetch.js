import { useState, useEffect, useCallback } from 'react'
import cookie from 'js-cookie'
import { BASE_URL_PRO } from 'config'
import { useRouter } from 'next/router'

const useFetch = () => {
  const router = useRouter()
  const [response, setResponse] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [options, setOptions] = useState({})
  const doFetch = useCallback((options = {}) => {
    setOptions(options)
    setIsLoading(true)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      return
    } else if (cookie.get('token') === null && isLoading) {
      router.push('/login')
    }
    const headers = {
      'Content-Type': 'application/json',
    }

    Object.entries(options).length > 0 && options.isAuth
      ? (headers.Authorization = 'Bearer ' + cookie.get('token'))
      : null

    let newOption = {
      method: 'POST',
      body: JSON.stringify(options?.url),
      headers: headers,
    }
    const fetchData = async () => {
      try {
        const res = await fetch(BASE_URL_PRO, newOption)
        const { data } = await res.json()
        setResponse(data)
      } catch (err) {
        const data = err.response ? err.response.data : 'Server error'
        setError(data)
      } finally {
        setIsLoading(false)
      }
    }

    options?.url && fetchData()
  }, [isLoading, options])

  return [{ response, error, isLoading }, doFetch]
}

export default useFetch
