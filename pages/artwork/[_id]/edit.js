import { useRouter } from 'next/router'
import Form from '../../../components/workForm'

export default function EditWork(props) {
  
  const router = useRouter();

  if (props.hasError) {
    return <h2>Artwork not found</h2>
  }

  if (router.isFallback) {
      return <h2>Loading...</h2>
  }

  let data = props.singleWork;

  return <Form formId="edit-artwork-form" workForm={data} forNewWork={false} />
}

async function getData() {
  const url = 'http://192.168.0.24:9000/api/artworks/';
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