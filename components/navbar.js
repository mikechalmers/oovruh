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
        <Link href="/form">form</Link>
      </div>
      <h1>oovruh</h1>
      <input tpe="text" name="nav" />
      <div className={styles.meta}>
        <Autth />
      </div>
    </div>
  )
}