import dbConnect from '../../middleware/dbConnect';
import Artwork from '../../models/artwork';

export default async function handler (req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const artworks = await Artwork.find({})
        res.status(200).json( artworks )
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}