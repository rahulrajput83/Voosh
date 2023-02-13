// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import MongoDBConnect from '../../Utils/MongoDB';
import ToDoModel from '../../Model/AddNewToDo';
const jwt = require('jsonwebtoken');


const AddToDoHandle = async (req, res) => {
  await MongoDBConnect();
  const verifyToken = req.headers.accessToken;
  if(!verifyToken) {
    res.json({message: 'Unauthorized'});
  }else {
    jwt.verify(verifyToken, 'secretKey', (err, decoded) => {
        if (err) {
            res.json({message: 'Unauthorized'});
        }
        else {
            res.json({decoded: decoded})
        }
    })
  }
    const addNewToDo = new ToDoModel({
        email: 'rahulra1dkjgf@gmail.com',
        userId: 'jkgg3285a1f8gg',
        title: 'This is the title of new ToDo list.'
    })
    addNewToDo.save()
    .then((value) => {
        res.json({message: 'Successfully Added'})
    })
    .catch((err) => {
        res.json({message: 'Error, please try again.'})
    })
}


export default AddToDoHandle;