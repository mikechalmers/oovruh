import Link from 'next/link'
import { useRouter } from 'next/router'

import styles from '../styles/Work.module.css'

const Work = ({ data, showLink, deleteAble }) => {
  const router = useRouter()

  const deleteWork = async (id) => {
    try {
      const res = await fetch(`http://192.168.0.18:9000/api/artworks/${id}`, {
        method: 'DELETE',
      })
      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status)
      }

      router.push('/')
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = (e) => {
    e.preventDefault()
    console.log(e.target);
    deleteWork(data._id);
  }

  let deleter;
  if (deleteAble) {
    deleter = (
      <a href="#" onClick={handleDelete}>delete</a>
    )
  } else {
    deleter = "No delete on this here route!";
  }
  
  return (
    <div className={styles.gate}>
      <div className={styles.workitem}>
        {data.images && <Link href={`/artwork/${data._id}`}><img src={data.images.uri} width={data.images.width} height={data.images.height} alt={data.title} /></Link>}
      </div>
      <div>
        <span>Title</span>
        {data.title}
      </div>
      <div>
        <span>Year</span>
        {data.year}
      </div>
      <div>
        <span>Artwork ID</span>
        {data._id}
      </div>
      <div>
        <span>Image Alt Text</span>
        {data.images.alt}
      </div>
      <div>fiv</div>
      <div>six</div>
      <div>sev</div>
      <div>
        { deleter }
      </div>
      <div>
        { showLink && <Link href={`/artwork/${data._id}/edit/`}>edit</Link> }
      </div>
      <div>
        { showLink && <Link href={`/artwork/${data._id}`}>permalink</Link> }
      </div>
    </div>
  )
}

export default Work
