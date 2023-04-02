import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const Post = (props) => {
  const router = useRouter()
  const { data: session, status } = useSession()

  console.log(router);

  if (props.hasError) {
    return <h2>Artwork not found</h2>
  }

  if (router.isFallback) {
      return <h2>Loading...</h2>
  }

  return (
    <>
      <h1>Artist Page</h1>
      <p>Account: {session.user.email}</p>
    </>
  )
}

export default Post