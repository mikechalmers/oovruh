// lib/mongodb.js

// this is used bu next-auth until we can use the mongoose connection at dbConnect

import { MongoClient } from 'mongodb'

const uri = process.env.ATLAS_URI
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true
}

let client
let clientPromise

if (!process.env.ATLAS_URI) {
  throw new Error('Please add your Mongo URI to .env.local')
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise

