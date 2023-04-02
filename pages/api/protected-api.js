import { hasTokenMiddleware } from "../../middleware/checkUser"
import handler from '../../middleware/handler';

//change use to isAdminMiddleware to make admin-only
handler
  .use(hasTokenMiddleware)
  .get(protectedAPI)

async function protectedAPI(req, res, next) {
  res.status(200).send('Success!')
}

export default handler