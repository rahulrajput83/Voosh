import MongoDBConnect from '../../Utils/MongoDB';
import ToDoModel from '../../Model/AddNewToDo';
import JWTAuth from '../../Utils/JWTAut';

const editToDo = async (req, res) => {
    if (req.method !== 'POST') {
        res.json({ message: 'Only POST requests allowed' })
    }
    try {
        const data = JSON.parse(req.body)
        await MongoDBConnect();
        await ToDoModel.updateOne({ _id: data.id }, { $set: { title: data.title, desc: data.desc, lastUpdate: data.time } });
        res.json({ message: 'Success' })
    }
    catch (error) {
        res.json({ message: 'Error, Please try again...' })
    }
}


export default JWTAuth(editToDo);