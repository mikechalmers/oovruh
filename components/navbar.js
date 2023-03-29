// components/navbar.js

import Autth from '../components/autth'

import Link from 'next/link'
import styles from '../styles/navbar.module.css'

export default function Navbar({ children }) {
  return (
    <div className={styles.navbar}>
      <div className={styles.meta}>
        <Link href="/">home</Link>
        <Link href="/add">add work</Link>
        <Link href="/protected">members area</Link>
      </div>
      <Link href="/" className={styles.cleanLink}><h1 className={styles.logoHeading}>oovruh</h1></Link>
      <div className={styles.meta}>
        <Autth />
      </div>
    </div>
  )
}