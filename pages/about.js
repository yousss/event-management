import React from 'react'
import Head from 'next/head'
import styled from 'styled-components'

const about = (props) => (
  <>
    <Head>
      <title>About</title>
    </Head>
    <StyledAbout>Hello about page</StyledAbout>
  </>
)

const StyledAbout = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  color: #444;
`

export default about
