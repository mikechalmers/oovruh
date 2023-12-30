import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession } from "next-auth/react"

import styles from '../styles/Work.module.css'

const Work = ({ data, showLink, deleteAble, isOwner }) => {
  const router = useRouter()
  const { data: session } = useSession()

  // console.log(data)

  const deleteWork = async (id) => {
    try {
      const res = await fetch(`http://192.168.0.24:9000/api/artworks/${id}`, {
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
    deleteWork(data._id);
  }

  // console.log(session?.user);
  // console.log(data);
  
  return (
    <div className={styles.gate}>
      <div className={styles.workitem}>
        {data.images && <Link href={`/artwork/${data._id}`}><img src={data.images.uri} width={data.images.width} height={data.images.height} alt={data.title} /></Link>}
      </div>
      <div>
        <span>Title</span>
        <strong>{data.title}</strong>
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
      <div>
        <span>Collection</span>
        fiv
      </div>
      <div>
        <span>Series</span>
        six
      </div>
      <div>
        <span>Artist</span>
        <div>
          {data?.user?._id ? <Link href={`/api/users/${data.user._id}`}>{data.user.fullName}</Link> : ''}
          
          {(data?.user?._id ===  session?.user?._id) || isOwner ? ' 🥤' : ''}
        </div>
      </div>
      <div>
      </div>
      <div>
      </div>
      <div className={styles.meta}>
        { showLink && data.user && <Link href={`/api/users/${data.user._id}` } className={styles.pill}>artist</Link> }
        { showLink && <Link href={`/artwork/${data._id}`} className={styles.pill}>permalink</Link> }
        { showLink && session?.user?._id === data?.user?._id && <Link href={`/artwork/${data._id}/edit/`} className={styles.pill}>edit</Link> }
        { deleteAble && session?.user?._id === data?.user?._id &&  <a href="#" onClick={handleDelete} className={styles.pill}>delete</a>}
      </div>
    </div>
  )
}

export default Work
