import MongoDBConnect from '../../Utils/MongoDB';
import RegisterModel from '../../Model/NewUser';
import bcrypt from 'bcryptjs';


const handler = async (req, res) => {
    if (req.method !== 'POST') {
        res.json({ message: 'Only POST requests allowed' })
    }
    try {
        await MongoDBConnect();
        const responseData = await RegisterModel.findOne({ email: req.body.email })
        if (responseData) {
            res.json({ message: 'User already registered...' })
        }
        else {
            const createNewUser = new RegisterModel({
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 1)
            })
            await createNewUser.save();
            res.json({ message: 'User successfully registered...' });
        }
    }
    catch (error) {
        res.json({ message: 'Error, Please try again...' })
    }
}


export default handler;