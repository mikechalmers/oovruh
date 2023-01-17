import Image from 'next/image'
import Link from 'next/link'

import {useEffect, useState} from "react";
import axios from "axios";
import styles from '../styles/Home.module.css'

import Work from '../components/workBox'

export default function Home() {
  const url = 'http://192.168.0.18:8000/api';
  const [work, setWork] = useState([]);

  let noWork;

  useEffect(() => {
    axios.get(url).then(res => {
      setWork(res.data);
    })
  }, [])

  // console.log(work)

  if (work.length == 0) {
    noWork = <h1>No artworks found</h1>
  } else {
    noWork = <h2>All Works</h2>
  }

  return (
    <>
      <div className={styles.main}>
        {noWork}
        {work.map(data => {
          return (
            <div key={data._id} className={styles.singleWork}>
              <Work data={data} showLink />
            </div>
          )
        })}
      </div>
    </>
  )
};