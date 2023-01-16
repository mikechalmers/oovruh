// components/layout.js

import Navbar from './navbar'
// import Footer from './footer'
import Autth from '../components/autth'

import Link from 'next/link'
import Head from 'next/head'
import styles from '../styles/navbar.module.css'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>oovruh</title>
        <meta name="description" content="oovruh artwork archiving" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  )
}