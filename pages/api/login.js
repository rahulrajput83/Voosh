import MongoDBConnect from '../../Utils/MongoDB';
import RegisterModel from '../../Model/NewUser';
import bcrypt from 'bcryptjs';
const jwt = require('jsonwebtoken');

/* function verify(handler) {
  return async (req, res) => {
    const token = req.headers['access'];
    jwt.verify(token, 'kjxzchdvifdaslkgfygdf', (err, decoded) => {
      if (err) {
        console.log('Token Expired')
      }
      else{
        console.log(decoded.id)
      }
      
      return handler(req, res);
    })

  }
} */

const LoginHandle = async (req, res) => {
  if (req.method !== 'POST') {
    res.send({ message: 'Only POST requests allowed' })
  }
  try {
    await MongoDBConnect();
    const responseData = await RegisterModel.findOne({ email: req.body.email })
    if (responseData) {
      const checkPassword = await bcrypt.compareSync(req.body.password, responseData.password)
      if (!checkPassword) {
        res.json({ message: 'Invalid email or password...' })
      }
      else {
        const token = await jwt.sign({ id: responseData._id, email: responseData.email, }, process.env.JWT);
        res.json({ message: 'User Login...', acccessToken: token })
      }
    }
    else {
      res.json({ message: 'User not registered...' })
    }

  } catch (error) {
    res.json({ message: 'Error, Please try again...' })
  }
}


export default LoginHandle;