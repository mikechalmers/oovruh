import { useSession } from "next-auth/react"
import useSWR from "swr"
import Link from 'next/link'

import Work from "../components/workBox"
import styles from '../styles/Home.module.css'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function ProtectedPage() {
  const { data: session } = useSession()

  // console.log(session);
  // new SWR fetching
  const { artwork, isLoading, isError } = getData(`http://192.168.0.18:9000/api/userArtworks`);
  let usersArt;

  if (session && isError) return <h2>error finding data</h2>
  if (isLoading) return <h2>loading...!</h2>

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

  if (artwork) {
    // console.log(artwork.artworks);
    usersArt = artwork.artworks;
  }
  
  return (
    <div className={styles.main}>
      <h1>{session.user.name} / All Works</h1>
      {usersArt.map(data => {
        return (
          <div key={data._id} className={styles.singleWork}>
            <Work data={data} deleteAble showLink isOwner />
          </div>
        )
      })}
    </div>
  )
}

  // custom middleware to improve SWR functionality and provide user / loading / error responses
  const getData = (key) => {
    const { data, error } = useSWR(key, fetcher)
    // console.log("data:", data)
    return {
      artwork: data,
      isLoading: !error && !data,
      isError: error,
    }
  }