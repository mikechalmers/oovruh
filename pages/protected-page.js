// this page uses tokens from the checkUser middleware to check user status

import { hasToken } from '../middleware/checkUser'

const ProtectedPage = () => {
  return (
    <div>
      This page is protected.
    </div>
  )
}

export default ProtectedPage


export async function getServerSideProps(context) {

  const token = await hasToken(context.req)

  if(!token){
      return {
          redirect: {
              destination: '/',
              permanent: false
          }
      }
  }

  return { props: {}}
}