// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import MongoDBConnect from '../../Utils/MongoDB';
import RegisterModel from '../../Model/NewUser';
import bcrypt from 'bcryptjs';
const jwt = require('jsonwebtoken');


const LoginHandle = async (req, res) => {
  if (req.method !== 'POST') {
    res.send({ message: 'Only POST requests allowed' })
  }
  try {
    await MongoDBConnect();
    const responseData = await RegisterModel.findOne({ email: req.body.email })
    if (responseData) {
      const checkPassword = bcrypt.compareSync(req.body.password, responseData.password)
      if (!checkPassword) {
        res.json({ message: 'Invalid email or password...' })
      }
      else {
        const token = jwt.sign({ id: responseData._id, email: responseData.email, hello: 'dujvgb' }, 'kjxzchdvifdaslkgfygdf', { expiresIn: '1h' });
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