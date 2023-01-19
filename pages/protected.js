import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import Layout from "../components/layout"

export default function ProtectedPage() {
  const { data: session } = useSession()
  const [content, setContent] = useState()

  // Fetch content from protected route
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/examples/protected")
      const json = await res.json()
      if (json.content) {
        setContent(json.content)
      }
    }
    fetchData()
  }, [session])
 

  // If no session exists, display access denied message
  if (!session) {
    return (
      <h1>Please <Link href='/api/auth/signin'>sign in</Link>.</h1>
    )
  }

  // If session exists, display content
  return (
    <>
      <h1>Protected Page</h1>
      <img src="/casper.gif" />
    </>
  )
}