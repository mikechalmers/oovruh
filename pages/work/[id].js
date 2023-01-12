import { useRouter } from 'next/router'

const Post = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <h1>Work Page</h1>
      <p>Reference: {id}</p>
    </>
  )
}

export default Post