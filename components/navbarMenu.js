// components/navbar.js
import Link from 'next/link'
import styles from '../styles/navbar.module.css'

export default function NavbarMenu() {

  return (
    <>
      <Link href="/add" className={styles.navMenuItem}>add work</Link>
      <Link href="/protected" className={styles.navMenuItem}>your work</Link>
      <Link href="/account/profile" className={styles.navMenuItem}>profile</Link>
    </>
  )
}