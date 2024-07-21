import MongoDBConnect from '../../Utils/MongoDB';
import ToDoModel from '../../Model/AddNewToDo';
import JWTAuth from '../../Utils/JWTAut';

/* Get one task with id endpoint */
const oneToDo = async (req, res) => {
    const { post } = req.query;
    if (req.method !== 'GET') {
        res.status(405).json({ message: 'Only GET requests allowed' })
    }
    try {
        await MongoDBConnect();
        const ToDo = await ToDoModel.findOne({ _id: post });
        res.status(200).json({ message: 'Success', data: ToDo })
    }
    catch (error) {
        res.status(500).json({ message: 'Error, Please try again...' })
    }
}


export default JWTAuth(oneToDo);