import MongoDBConnect from '../../Utils/MongoDB';
import ToDoModel from '../../Model/AddNewToDo';
import JWTAuth from '../../Utils/JWTAut';

/* Update the category of task  */
const updateCategory = async (req, res) => {
    if (req.method !== 'PUT') {
        res.json({ message: 'Only PUT requests allowed' })
    }
    try {
        const data = JSON.parse(req.body)
        await MongoDBConnect();
        await ToDoModel.updateOne({ _id: data.id }, { $set: { taskCategory: data.category } });
        res.json({ message: 'Success' })
    }
    catch (error) {
        res.json({ message: 'Error, Please try again...' })
    }
}


export default JWTAuth(updateCategory);