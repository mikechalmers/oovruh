import Image from 'next/image'
import Link from 'next/link'

import {useEffect, useState} from "react";
import axios from "axios";
import styles from '../styles/Home.module.css'

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
      <div className={styles.main}>
        {work.map(data => {
          return (
            <Work key={data._id} data={data} />
          )
        })}
      </div>
    </>
  )
};