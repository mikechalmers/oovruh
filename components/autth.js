import { signOut, useSession, getSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

import styles from '../styles/navbar.module.css'

const Autth = () => {
  const { data: session, status } = useSession()
  const getSesh = getSession()

  if (status === 'loading') {
    return <>Loading...</>
  }

  if (status === 'authenticated') {
    // console.log ("session.user is: ", session.user)
    return (
      <>
      <div>
        🥤 <span className={styles.loggedIn}>{session.user.name}</span>
      </div>
        <button className={ styles.navButton } onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  if (status === 'unauthenticated') {
    return (
      <div>
        Not signed in <Link href='/api/auth/signin'>Login</Link>
      </div>
    )
  }
}

export default Autth