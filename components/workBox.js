import styles from '../styles/Work.module.css'

const Work = ({ data }) => {
  return (
    <div className={styles.gate}>
      <div className={styles.workitem}>
            {data.images && <img src={data.images.uri} width={data.images.width} height={data.images.height} alt={data.title} />}
      </div>
      <div>{data.title}</div>
      <div>{data.year}</div>
      <div>thr</div>
      <div>fou</div>
      <div>fiv</div>
      <div>six</div>
      <div>sev</div>
      <div>eig</div>
      <div>nin</div>
    </div>
  )
}

export default Work