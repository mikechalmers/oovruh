import { useState } from "react"
import { useSession } from "next-auth/react"
import useSWR from "swr"
import Link from 'next/link'

import Work from "../components/workBox"
import styles from '../styles/Home.module.css'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function ProtectedPage() {
  const { data: session } = useSession()
  const [content, setContent] = useState()

  // new SWR fetching - checking if causing bug
  const { artwork, isLoading, isError } = getData('http://192.168.0.18:9000/api/artwork');
  

  if (isError) return <h2>error finding data</h2>
  if (isLoading) return <h2>loading...!</h2>

  console.log(artwork);

  // If no session exists, display access denied message
  if (!session) {
    return (
      <>
        <h1>Please <Link href='/api/auth/signin'>sign in</Link>.</h1>
        <br />
        <img src="/casper.gif" />
      </>
    )
  }
  
  return (
    <>
      <div className={styles.main}>
        <h2>All Works</h2>
        {artwork.map(data => {
          return (
            <div key={data._id} className={styles.singleWork}>
              <Work data={data} showLink />
            </div>
          )
        })}
      </div>
    </>
  )
}

  // custom middleware to improve SWR functionality and provide user / loading / error responses
  const getData = (key) => {
    const {data, error} = useSWR(key, fetcher)

    return {
      artwork: data,
      isLoading: !error && !data,
      isError: error,
    }
  }