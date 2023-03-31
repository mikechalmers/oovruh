// components/footer.js

import Link from 'next/link'
import styles from '../styles/footer.module.css'

export default function Navbar({ children }) {
  return (
    <div  className={styles.footer}>
      <Link href="/">oovruh</Link> 2023
    </div>
  )
}