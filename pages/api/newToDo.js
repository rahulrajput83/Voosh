import MongoDBConnect from '../../Utils/MongoDB';
import ToDoModel from '../../Model/AddNewToDo';
import JWTAuth from '../../Utils/JWTAut';

/* Add new task endpoint */
const AddToDoHandle = async (req, res) => {
    const data = JSON.parse(req.body);
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Only POST requests allowed' })
    }
    try {
        await MongoDBConnect();
        const addNewToDo = await new ToDoModel({
            email: req.user.email,
            userId: req.user.id,
            title: data.title,
            desc: data.desc,
            createdAt: data.time,
            taskCategory: 1
        })
        await addNewToDo.save();
        res.status(200).json({ message: 'Successfully Added' })
    }
    catch (error) {
        res.status(500).json({ message: 'Error, Please try again...' })
    }
}


export default JWTAuth(AddToDoHandle);