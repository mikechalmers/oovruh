import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const Autth = () => {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <>Loading...</>
  }

  if (status === 'authenticated') {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  if (status === 'unauthenticated') {
    return (
      <>
        Not signed in <br />
        <Link href='/api/auth/signin'>
          <a>Login</a>
        </Link>
      </>
    )
  }
}

export default Autth