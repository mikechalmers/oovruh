import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>oovruh</title>
        <meta name="description" content="oovruh artwork archiving" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>oovruh</h1>
        <div className={styles.gate}>
          <div className={styles.workitem}>one</div>
          <div>two</div>
          <div>thr</div>
          <div>fou</div>
          <div>fiv</div>
          <div>six</div>
          <div>fou</div>
          <div>fiv</div>
          <div>six</div>
        </div>
      </main>
    </>
  )
}
