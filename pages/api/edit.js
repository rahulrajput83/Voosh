import MongoDBConnect from '../../Utils/MongoDB';
import ToDoModel from '../../Model/AddNewToDo';
import JWTAuth from '../../Utils/JWTAut';

/* Edit task endpoint */
const editToDo = async (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Only POST requests allowed' })
    }
    try {
        const data = JSON.parse(req.body)
        /* connect to mongodb */
        await MongoDBConnect();
        /* Update with id */
        await ToDoModel.updateOne({ _id: data.id }, { $set: { title: data.title, desc: data.desc } });
        res.status(200).json({ message: 'Success' })
    }
    catch (error) {
        res.status(500).json({ message: 'Error, Please try again...' })
    }
}


export default JWTAuth(editToDo);