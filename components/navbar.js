// components/navbar.js

// import Navbar from './navbar'
// import Footer from './footer'
import Autth from '../components/autth'

import Link from 'next/link'
import styles from '../styles/navbar.module.css'

export default function Navbar({ children }) {
  return (
    <div className={styles.navbar}>
      <div className={styles.meta}>
        <Link href="/">home</Link>
        <Link href="/form">add work</Link>
        <Link href="/protected">members area</Link>
      </div>
      <h1>oovruh</h1>
      <div className={styles.meta}>
        <Autth />
      </div>
    </div>
  )
}