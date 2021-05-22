import { BASE_URL_PRO } from 'config'
import cookie from 'js-cookie'
import { useRouter } from 'next/router'

function updateOptions(url) {
  const router = useRouter()
  const update = {
    'Content-Type': 'application/json',
    method: 'POST',
    body: JSON.stringify(url),
  }
  if (cookie.get('token')) {
    update.headers = {
      ...update.headers,
      Authorization: `Bearer ${cookie.get('token')}`,
    }
  } else {
    // router.push('/login')
  }
  return update
}

export default async function fetcher(url) {
  const res = await fetch(BASE_URL_PRO, updateOptions(url))
  console.log(res, url)
  return res
}
