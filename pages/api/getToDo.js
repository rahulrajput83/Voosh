import MongoDBConnect from '../../Utils/MongoDB';
import ToDoModel from '../../Model/AddNewToDo';
import JWTAuth from '../../Utils/JWTAut';

/* Get all task endpoint */
const GetToDoHandle = async (req, res) => {
    if (req.method !== 'GET') {
        res.status(405).json({ message: 'Only GET requests allowed' })
    }
    try {
        /* Connect to mongodb */
        await MongoDBConnect();
        const searchTerm = req.query.search || '';
        /* Find with user email and add filter also */
        const ToDo = await ToDoModel.find({
            email: req.user.email,
            title: { $regex: searchTerm, $options: 'i' }
        });
        if (ToDo.length > 0) {
            if (req.query.order == 'recent') {
                ToDo.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            }
            else {
                ToDo.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            }
        }
        const tasksByCategory = {
            category1: [],
            category2: [],
            category3: []
        };

        ToDo.forEach(task => {
            switch (task.taskCategory) {
                case 1:
                    tasksByCategory.category1.push(task);
                    break;
                case 2:
                    tasksByCategory.category2.push(task);
                    break;
                case 3:
                    tasksByCategory.category3.push(task);
                    break;
            }
        });

        let modifiedData = [
            {
                id: '1',
                title: 'To Do',
                components: tasksByCategory.category1
            },
            {
                id: '2',
                title: 'IN PROGRESS',
                components: tasksByCategory.category2
            },
            {
                id: '3',
                title: 'DONE',
                components: tasksByCategory.category3
            }
        ]
        res.status(200).json({ message: 'Success', data: modifiedData })
    }
    catch (error) {
        res.status(500).json({ message: 'Error, Please try again...' })
    }
}


export default JWTAuth(GetToDoHandle);