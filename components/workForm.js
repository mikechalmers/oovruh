 // based on https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/components/Form.js

import { useState } from 'react'
import { useRouter } from 'next/router'
import { mutate } from 'swr'

import { useSession } from 'next-auth/react';

import { useS3Upload, getImageData } from 'next-s3-upload';

import styles from '../styles/Form.module.css'

const Form = ({ formId, workForm, forNewWork = true }) => {
  const router = useRouter()
  const contentType = 'application/json'
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  let { uploadToS3 } = useS3Upload();

  const { data: session, status } = useSession()
  // console.log(session, status)

  const id = router.query._id;

  const [form, setForm] = useState({
    title: workForm.title,
    year: workForm.year,
    images: {
      alt: workForm.images.alt,
      uri: workForm.images.uri,
      width: workForm.images.width,
      height: workForm.images.height,
    },
    user: session?.user?._id
  })

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form) => {

    try {
      const res = await fetch(`http://192.168.0.18:9000/api/artworks/${id}`, {
        method: 'PUT',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status)
      }

      const { data } = await res.json()

      mutate(`/api/artworks/${id}`, data, false) // Update the local data without a revalidation
      router.push('/')
    } catch (error) {
      setMessage('Failed to update work')
    }
  }

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form) => {
    try {
      const res = await fetch(`http://192.168.0.18:9000/api/artworks`, {
        method: 'POST',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status)
      }

      router.push('/')
    } catch (error) {
      setMessage('Failed to add work')
    }
  }

  const handleChange = async(e) => {
    const target = e.target
    const value = target.value
    const name = target.name

    if (name === 'alt') {
      setForm({
        ...form,
        images: {
          ...form.images,
          [name]: value,
        },
      })
    } else if (name === 'image') {
      if (!e.target.files[0]) {
        setForm({
          ...form,
          images: {
            ...form.images,
            uri: '',
            height: '',
            width: '',
          },
        })
      } else {
        let file = e.target.files[0];
        let { url } = await uploadToS3(file);
        let { height, width } = await getImageData(file);
  
        setForm({
          ...form,
          images: {
            ...form.images,
            uri: url,
            height,
            width,
          },
        })
      }
    } else {
      setForm({
        ...form,
        [name]: value,
      })
    }

  }

  /* Makes sure necessary info is filled */
  const formValidate = () => {
    let err = {}
    if (!form.title) err.title = 'Title is required'
    if (!form.images.uri) err.title = 'Image is required'
    if (!session?.user?._id) err.title = 'You need to login'
    return err
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Artwork submitted: ', form);
    const errs = formValidate()
    if (Object.keys(errs).length === 0) {
      forNewWork ? postData(form) : putData(form)
    } else {
      setErrors(errs)
      console.log("Submission errors: ", errors)
    }
  }

  return (
    <div className={styles.formContainer}>
      <form id={formId} className={styles.uploadForm} onSubmit={handleSubmit}>
        <img src='/art.svg' alt='art' className={styles.uploadHero} />

        {form.images.uri && <img src={form.images.uri} className={styles.uploadedImage} />}

        <div className={styles.uploadContainer}>
          <label htmlFor="image">⬆️ Artwork Image Upload</label>
          <input type="file" id="image" name="image" value="" onChange={handleChange} />
        </div>
        
        <div className={styles.uploadField}>
          <label htmlFor="alt" className={styles.tabbedLabel}>Image Alt Tag</label>
          <input
            type="text"
            maxLength="250"
            name="alt"
            value={form.images.alt}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.uploadField}>
          <label htmlFor="title" className={styles.tabbedLabel}>Title</label>
          <input
            type="text"
            maxLength="20"
            name="title"
            value={form.title}
            onChange={handleChange}
            
          />
        </div>

        <div className={styles.uploadField}>
          <label htmlFor="year" className={styles.tabbedLabel}>Year</label>
          <input
            type="text"
            maxLength="20"
            name="year"
            value={form.year}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn">
          ⏭️ Submit
        </button>
      </form>
      <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div>
    </div>
  )
}

export default Form