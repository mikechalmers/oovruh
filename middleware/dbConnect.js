// /lib/dbConnect.js
import mongoose from 'mongoose'

/**
Source: https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/utils/dbConnect.js 
**/

const ATLAS_URI = process.env.ATLAS_URI

if (!ATLAS_URI) {
  throw new Error(
    'Please define the ATLAS_URI environment variable inside .env.local'
  )
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect () {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      strictQuery: true
    }

    cached.promise = mongoose.connect(ATLAS_URI, opts).then(mongoose => {
      return mongoose
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect