// based on https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/components/Form.js

import { useState } from 'react'
import { useRouter } from 'next/router'
import { mutate } from 'swr'

import { useS3Upload, getImageData } from 'next-s3-upload';
import Image from 'next/image';

import styles from '../styles/Form.module.css'

const Form = ({ formId, workForm, forNewWork = true }) => {
  const router = useRouter()
  const contentType = 'application/json'
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  let [imageUrl, setImageUrl] = useState();
  let [height, setHeight] = useState();
  let [width, setWidth] = useState();
  // let { FileInput, openFileDialog, uploadToS3 } = useS3Upload();
  let { uploadToS3 } = useS3Upload();

  const [form, setForm] = useState({
    title: workForm.title,
    year: workForm.year,
    images: {
      alt: workForm.alt,
      uri: imageUrl,
      width: width,
      height: height,
    },
  })

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form) => {
    const { id } = router.query

    try {
      const res = await fetch(`http://192.168.0.18:8000/api/${id}`, {
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

      mutate(`/api/${id}`, data, false) // Update the local data without a revalidation
      router.push('/')
    } catch (error) {
      setMessage('Failed to update work')
    }
  }

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form) => {
    try {
      const res = await fetch('http://192.168.0.18:8000/api/add', {
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
  
        setImageUrl(url);
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

  // let handleFileChange = async file => {
  //   let { url } = await uploadToS3(file);
  //   let { height, width } = await getImageData(file);
  //   setWidth(width);
  //   setHeight(height);
  //   setImageUrl(url);

  //   console.log(`uri: ${url}`);
  //   console.log(`width: ${width}`);
  //   console.log(`height: ${height}`);

  //   setForm({
  //     ...form,
  //     images: {
  //       ...form.images,
  //       uri: url,
  //       height,
  //       width,
  //     }
  //   });

  //   console.log(form);
  // };

  /* Makes sure pet info is filled for pet name, owner name, species, and image url*/
  const formValidate = () => {
    let err = {}
    if (!form.title) err.title = 'Title is required'
    if (!imageUrl) err.image = 'Image is required'
    return err
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(form);
    const errs = formValidate()
    if (Object.keys(errs).length === 0) {
      forNewWork ? postData(form) : putData(form)
    } else {
      setErrors({ errs })
    }
  }

  return (
    <>
      <form id={formId} className={styles.uploadForm} onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          maxLength="20"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="year">Year</label>
        <input
          type="text"
          maxLength="20"
          name="year"
          value={form.year}
          onChange={handleChange}
          required
        />

        <label htmlFor="alt">Alt</label>
        <input
          type="text"
          maxLength="20"
          name="alt"
          value={form.alt}
          onChange={handleChange}
          required
        />

        <input type="file" name="image" onChange={handleChange} required />
        {imageUrl && <img src={imageUrl} />}

        <button type="submit" className="btn">
          Submit
        </button>
      </form>
      <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div>
    </>
  )
}

export default Form