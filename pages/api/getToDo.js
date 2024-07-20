import MongoDBConnect from '../../Utils/MongoDB';
import ToDoModel from '../../Model/AddNewToDo';
import JWTAuth from '../../Utils/JWTAut';


const GetToDoHandle = async (req, res) => {
    if (req.method !== 'GET') {
        res.json({ message: 'Only GET requests allowed' })
    }
    try {
        await MongoDBConnect();
        const searchTerm = req.query.search || '';
        const ToDo = await ToDoModel.find({
            email: req.user.email,
            title: { $regex: searchTerm, $options: 'i' }
        });
        if(ToDo.length > 0) {
            if(req.query.order == 'recent') {
                ToDo.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            }
            else {
                ToDo.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            }
        }
        res.json({ message: 'Success', data: ToDo})
    }
    catch (error) {
        res.json({ message: 'Error, Please try again...'})
    }
}


export default JWTAuth(GetToDoHandle);