import MongoDBConnect from '../../Utils/MongoDB';
import ToDoModel from '../../Model/AddNewToDo';
import JWTAuth from '../../Utils/JWTAut';

const deleteToDo = async (req, res) => {
    const {post} = req.query;
    if (req.method !== 'GET') {
        res.json({ message: 'Only GET requests allowed' })
    }
    try {
        await MongoDBConnect();
        await ToDoModel.findOneAndDelete({ _id: post });
        res.json({message: 'Success'})
    }
    catch (error) {
        res.json({ message: 'Error, Please try again...' })
    }
}


export default JWTAuth(deleteToDo);