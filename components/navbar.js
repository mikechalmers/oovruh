// components/navbar.js
import { useSession } from 'next-auth/react'

import Autth from '../components/autth'
import NavbarMenu from '../components/navbarMenu'

import Link from 'next/link'
import styles from '../styles/navbar.module.css'

export default function Navbar({ children }) {
  const { data: session, status } = useSession()

  return (
    <div className={styles.navbar}>
      <div className={styles.meta}>
      <Link href="/" className={styles.cleanLink}><h1 className={styles.logoHeading}>oovruh</h1></Link>
        { status === 'authenticated' && <NavbarMenu /> }
      </div>
      <div className={styles.meta}>
        <Autth />
      </div>
    </div>
  )
}