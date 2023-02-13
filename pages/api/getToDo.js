// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import MongoDBConnect from '../../Utils/MongoDB';
import ToDoModel from '../../Model/AddNewToDo';
const jwt = require('jsonwebtoken');


const GetToDoHandle = async (req, res) => {
    await MongoDBConnect();
    const verifyToken = req.headers.accessToken;
    if (!verifyToken) {
        res.json({ message: 'Unauthorized' });
    } else {
        jwt.verify(verifyToken, 'secretKey', (err, decoded) => {
            if (err) {
                res.json({ message: 'Unauthorized' });
            }
            else {
                res.json({ decoded: decoded })
                ToDoModel.find({ email: req.body.email })
                    .then((value) => {
                        res.json({ message: 'Successfully Added' })
                    })
                    .catch((err) => {
                        res.json({ message: 'Error, please try again.' })
                    })
            }
        })
    }

}

export default GetToDoHandle;