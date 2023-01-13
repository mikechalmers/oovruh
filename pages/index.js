import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import {useEffect, useState} from "react";
import axios from "axios";
import styles from '../styles/Home.module.css'

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
        <Link href="/form">form</Link>
        {work.map(c => {
          return (
        <div key={c._id} className={styles.gate}>
          <div className={styles.workitem}>
                {c.images && <img src={c.images.uri} width={c.images.width} height={c.images.height} alt={c.title} />}
          </div>
          <div>{c.title}</div>
          <div>{c.year}</div>
          <div>thr</div>
          <div>fou</div>
          <div>fiv</div>
          <div>six</div>
          <div>sev</div>
          <div>eig</div>
          <div>nin</div>
        </div>
          )
        })}
      </main>
    </>
  )
};
