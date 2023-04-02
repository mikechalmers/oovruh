import styles from '../styles/Home.module.css'

import Work from '../components/workBox'

export default function Home(props) {

  let noWork;
  let work = props.artworks;

  if (work.length == 0) {
    noWork = <h1>No artworks found</h1>
  } else {
    noWork = <h1>All Works</h1>
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


async function getData() {
  const url = 'http://192.168.0.18:9000/api/artworks/';
  let fetched;
  await fetch(url)
    .then((response) => response.json())
    .then((data) => fetched = data);
  // console.log(fetched);
  return fetched;
}

export const getStaticProps = async (context) => {
  const data = await getData();

  if (!data) {
    return {
      props: { hasError: true },
    }
  }
  return {
    props: {
      artworks: data
    }
  }
}