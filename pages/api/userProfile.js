import { hasTokenMiddleware } from "../../middleware/checkUser"
import handler from '../../middleware/handler';
import { getSession } from 'next-auth/react'
import dbConnect from '../../middleware/dbConnect';
import User from '../../models/user';

//change use to isAdminMiddleware to make admin-only
handler
  .use(hasTokenMiddleware)
  .get(protectedAPI)

async function protectedAPI(req, res, next) {
  const session = await getSession({ req })
  // console.log(session);
  
  await dbConnect()

  try {
    const user = await User.findById(session.user._id)
    console.log(user)
    if (!user) {
      return res.status(400).json({ success: false })
    }
    res.status(200).json( user )
  } catch (error) {
    res.status(400).json({ success: false })
  }

  // res.status(400).json({ success: false })

}

export default handler