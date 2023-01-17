import Link from 'next/link'
import { useRouter } from 'next/router';

import styles from '../../../styles/Home.module.css'

import Work from '../../../components/workBox'

export default function singleArtwork(props) {
  
  const router = useRouter();

  if (props.hasError) {
    return <h2>Artwork not found</h2>
  }

  if (router.isFallback) {
      return <h2>Loading...</h2>
  }

  let data = props.singleWork;

  return (
    <div className={styles.main}>
      <div className={styles.singleWork}>
        <h2>{data.title} ({ data.year })</h2>
        <Work key={data._id} data={data} deleteAble showLink />
      </div>
    </div>
  )
};

async function getData() {
  const url = 'http://192.168.0.18:8000/api';
  let fetched;
  await fetch(url)
    .then((response) => response.json())
    .then((data) => fetched = data);
  // console.log(fetched);
  return fetched;
}

export const getStaticProps = async (context) => {
  const itemID = context.params?._id;
  const data = await getData();
  const foundItem = data.find((item) => itemID === item._id);

  if (!foundItem) {
    return {
      props: { hasError: true },
    }
  }
  return {
    props: {
      singleWork: foundItem
    }
  }
}

export const getStaticPaths = async () => {
  const data = await getData();
  const pathsWithParams = data.map((item) => ({ params: { _id: item._id }}))

  return {
    paths: pathsWithParams,
    fallback: true
  }
}