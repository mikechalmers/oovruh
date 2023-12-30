import dbConnect from '../../../middleware/dbConnect';
import Artwork from '../../../models/artwork';
import User from '../../../models/user';

export default async function handler (req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const artworks = await Artwork.find({}).populate('user')
        console.log("Artworks: ", artworks)
        res.status(200).json( artworks )
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try { 
        const artwork = await Artwork.create(req.body)

        // console.log("artwork: ", artwork)
        const userID = artwork.user;
        // console.log("user: ", userID)

        await User.findByIdAndUpdate(
          userID,
          { $push: { artworks: artwork._id } },
          { new: true }
        )

        res.status(201).json({ success: true, data: artwork })
      }
      catch (error) { 
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}