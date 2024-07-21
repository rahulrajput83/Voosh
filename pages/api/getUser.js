import MongoDBConnect from '../../Utils/MongoDB';
import RegisterModel from '../../Model/NewUser';
import JWTAuth from '../../Utils/JWTAut';

/* Get all task endpoint */
const GetToDoHandle = async (req, res) => {
    if (req.method !== 'GET') {
        res.status(405).json({ message: 'Only GET requests allowed' })
    }
    try {
        /* Connect to mongodb */
        await MongoDBConnect();
        /* Find with user and return user image */
        const user = await RegisterModel.findOne(
            { email: req.user.email },
            'imgUrl'
        );
        
        res.status(200).json({ message: 'Success', data: user })
    }
    catch (error) {
        res.status(500).json({ message: 'Error, Please try again...' })
    }
}


export default JWTAuth(GetToDoHandle);