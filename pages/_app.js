import { useEffect } from 'react'
import { useRouter } from 'next/router'
import NProgress from 'nprogress' //nprogress module
import 'nprogress/nprogress.css' //styles of nprogress
import LayoutWrapper from '@components/layouts/LayoutWrapper'
import { RecoilRoot } from 'recoil'
import { ThemeProvider as SCThemeProvider } from 'styled-components'
import { useTheme } from '@material-ui/core/styles'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const muiTheme = useTheme()

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      NProgress.start()
    }

    const handleRouteChangeEnd = (url, { shallow }) => {
      NProgress.done()
    }

    router.events.on('routeChangeStart', handleRouteChange)
    router.events.on('routeChangeComplete', handleRouteChangeEnd)
    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
      router.events.off('routeChangeComplete', handleRouteChangeEnd)
    }
  }, [])
  return (
    <>
      <RecoilRoot>
        <SCThemeProvider theme={muiTheme}>
          <LayoutWrapper {...pageProps}>
            <Component {...pageProps} />
          </LayoutWrapper>
        </SCThemeProvider>
      </RecoilRoot>
    </>
  )
}

export async function getInitialProps({ Component, ctx }) {
  return {
    pageProps: {
      // Call page-level getInitialProps
      ...(Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}),
    },
  }
}
export default MyApp
