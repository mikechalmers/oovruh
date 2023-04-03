import User from '../../../models/user';
import dbConnect from '../../../middleware/dbConnect';
import handler from '../../../middleware/handler';

handler
  .post(createUser)

async function createUser(req, res) {
  
  // const data = req.body;
  
  // const { email, password } = data;
  
  dbConnect();
  
  console.log("User.create submits: ", req.body)

  const user = await User.create(req.body)

  res.status(201).json({ message: 'Created user!' });

}

export default handler;