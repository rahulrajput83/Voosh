import MongoDBConnect from '../../Utils/MongoDB';
import ToDoModel from '../../Model/AddNewToDo';
import JWTAuth from '../../Utils/JWTAut';


const AddToDoHandle = async (req, res) => {
    const data = JSON.parse(req.body);
    if (req.method !== 'POST') {
        res.json({ message: 'Only POST requests allowed' })
    }
    try {
        await MongoDBConnect();
        let date = new Date();
        date = await date.toLocaleString();
        const addNewToDo = await new ToDoModel({
            email: req.user.email,
            userId: req.user.id,
            title: data.title,
            desc: data.desc,
            lastUpdate: date
        })
        await addNewToDo.save();
        res.json({ message: 'Successfully Added' })
    }
    catch (error) {
        res.json({ message: 'Error, Please try again...'})
    }
}


export default JWTAuth(AddToDoHandle);