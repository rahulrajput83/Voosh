import MongoDBConnect from '../../Utils/MongoDB';
import ToDoModel from '../../Model/AddNewToDo';
import JWTAuth from '../../Utils/JWTAut';


const AddToDoHandle = async (req, res) => {
    if (req.method !== 'POST') {
        res.send({ message: 'Only POST requests allowed' })
    }
    try {
        await MongoDBConnect();
        let date = new Date();
        date = await date.toLocaleString();
        const addNewToDo = new ToDoModel({
            email: req.user.email,
            userId: req.user.id,
            title: req.body.title,
            desc: req.body.desc,
            lastUpdate: date
        })
        await addNewToDo.save();
        res.json({ message: 'Successfully Added' })
    }
    catch (error) {
        res.json({ message: 'Error, Please try again...', err: error })
    }
}


export default JWTAuth(AddToDoHandle);