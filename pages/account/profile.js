import { useState, useEffect } from 'react';

async function getUserData() {
  try {
    const res = await fetch('http://192.168.0.18:9000/api/userProfile/');
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

const handleChange = async(e) => {


}

export default function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

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
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  console.log(userData)

  return (
    <div>
      <form>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            maxLength="250"
            name="alt"
            value={userData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            maxLength="250"
            name="alt"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>
      </form>
      
      
    </div>
  );
}