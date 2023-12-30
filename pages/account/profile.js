// adapted from chatgpt conversation 5.4.23

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import UserForm from '../../components/userForm'

export default function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter()

  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await getUserData();
        setUserData(userData);
      } catch (error) {
        setError(error.message);
      }
    }
    fetchData();
  }, []);
  

  if (error) {
    // return <div>Error: {error}</div>;
    router.push('/login');
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  const id = userData._id;

  // console.log("userData on profile", userData)

  return <UserForm formId="edit-user-profile" userData={userData}/>
}

// GET the user's data from the API (database)
async function getUserData() {
  try {
    const res = await fetch('http://192.168.0.24:9000/api/userProfile/');
    if (!res.ok) {
      throw new Error('User probably not logged in')
    }
    const userData = await res.json();
    return userData;
  } catch (error) {
    console.error(error);
    throw error;
  }

}

