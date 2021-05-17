import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import ButtonProgress from '@components/ButtonProgress'

const index = ({ card, user }) => {
  const [loading, setLoading] = React.useState(false)

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false)
      setLoading(true)
      timer.current = window.setTimeout(() => {
        setSuccess(true)
        setLoading(false)
      }, 2000)
    }
  }

  return (
    <Card style={{ maxWidth: 500 }}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {card.title}
        </Typography>
        <Typography color="textSecondary">Posted by {user.name}</Typography>
        <Typography variant="body2" component="p">
          {card.body}
        </Typography>
      </CardContent>
      <CardActions>
        <ButtonProgress />
      </CardActions>
    </Card>
  )
}
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  const posts = await res.json()

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export const getStaticProps = async (context) => {
  const { id } = context.params
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/posts/' + id,
  )
  const card = await response.json()
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${card.userId}`,
  )
  const user = await res.json()

  return {
    props: {
      card,
      user,
    },
  }
}

export default index
