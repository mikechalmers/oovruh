import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

import styles from '../styles/navbar.module.css'

const Autth = () => {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <>Loading...</>
  }

  if (status === 'authenticated') {
    return (
      <>
      <div>
        Signed in as <span className={styles.loggedIn}>{session.user.email}</span>
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