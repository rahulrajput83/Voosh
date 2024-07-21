import MongoDBConnect from '../../Utils/MongoDB';
import RegisterModel from '../../Model/NewUser';
import bcrypt from 'bcryptjs';
const jwt = require('jsonwebtoken');

/* Login with email and password endpoint */
const LoginHandle = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Only POST requests allowed' })
  }
  try {
    await MongoDBConnect();
    const responseData = await RegisterModel.findOne({ email: req.body.email })
    if (responseData) {
      const checkPassword = await bcrypt.compareSync(req.body.password, responseData.password)
      if (!checkPassword) {
        res.status(401).json({ message: 'Invalid email or password...' })
      }
      else {
        const token = await jwt.sign({ id: responseData._id, email: responseData.email, }, process.env.JWT);
        res.status(200).json({ message: 'User Login...', acccessToken: token })
      }
    }
    else {
      res.status(401).json({ message: 'User not registered...' })
    }

  } catch (error) {
    res.status(500).json({ message: 'Error, Please try again...' })
  }
}


export default LoginHandle;