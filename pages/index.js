import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import {useEffect, useState} from "react";
import axios from "axios";
import styles from '../styles/Home.module.css'

import Autth from '../components/autth'
import Work from '../components/workBox'

export default function Home() {
  const url = 'http://192.168.0.18:8000/api';
  const [work, setWork] = useState([]);

  useEffect(() => {
    axios.get(url).then(res => {
      setWork(res.data);
    })
  }, [])

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
        <div className={styles.meta}>
          <Autth />
          <Link href="/form">form</Link>
        </div>
        {work.map(data => {
          return (
            <Work key={data._id} data={data} />
          )
        })}
      </main>
    </>
  )
};

// if the user data is publically available
// export async function getStaticProps() {
//   const res = await fetch('http://192.168.0.18:8000/api');
//   const work = await res.json()
//   console.log(work)
//   return (
//     props: {
//      work,
//     }
//   )
// }