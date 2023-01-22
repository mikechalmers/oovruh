import dbConnect from '../../../middleware/dbConnect';
import Artwork from '../../../models/artwork';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const artwork = await Artwork.findById(id)
        if (!artwork) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: artwork })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT' /* Edit a model by its ID */:
      try {
        const artwork = await Artwork.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (!Artwork) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: artwork })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deleteWork = await Artwork.deleteOne({ _id: id })
        if (!deleteWork) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: {} })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}