import { useState } from 'react'
import { useRouter } from 'next/router'
import { mutate } from 'swr'
import { useSession } from "next-auth/react"

import styles from '../styles/User.module.css'

const UserForm = ({ formId, userData }) => {
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({})

  const [form, setForm] = useState({
    fullName: userData.fullName,
    email: userData.email,
  })

  const id = userData._id
  const contentType = 'application/json'

  const { data: session, status } = useSession()

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form, id) => {
    try {
      const res = await fetch(`http://192.168.0.18:9000/api/users/${id}`, {
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

      mutate(`/api/users/${id}`, data, false) // Update the local data without a revalidation
      setMessage('✅')
    } catch (error) {
      setMessage('Failed to update work')
    }
  }

  // If a user changes form inputs
  const handleChange = async(e) => {
    const target = e.target
    const value = target.value
    const name = target.name

    setForm({
      ...form,
      [name]: value,
    })
  }

  /* Makes sure necessary info is filled */
  const formValidate = () => {
    let err = {}
    if (!form.fullName) err.fullName = 'A name is required'
    if (!form.email) err.email = 'Email is required'
    if (!session?.user?._id) err.title = 'You need to login'
    return err
  }
  
  // SUBMIT form
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('User update submitted: ', form);
    const errs = formValidate()
    if (Object.keys(errs).length === 0) {
      putData(form, id)
    } else {
      setErrors(errs)
      console.log("Submission errors: ", errors)
    }
    // putData(form, id)
  }

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === "unauthenticated") {
    return <p>Access Denied</p>
  }

  // console.log("userData in userForm is: ", userData)

  return (
    <div className={styles.profileContainer}>
      <h1>Profile</h1>
      <form id={formId} className={styles.userForm} onSubmit={handleSubmit}>

        <div className={styles.userField}>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            maxLength="250"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.userField}>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            maxLength="250"
            name="email"
            value={form.email}
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
  );
}

export default UserForm