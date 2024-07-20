import MongoDBConnect from '../../Utils/MongoDB';
import RegisterModel from '../../Model/NewUser';
import bcrypt from 'bcryptjs';


const handler = async (req, res) => {
    if (req.method !== 'POST') {
        res.json({ message: 'Only POST requests allowed' })
    }
    try {
        if(!req.body.firstName){
            res.json({ message: 'First Name required' })
        }
        if(!req.body.lastName){
            res.json({ message: 'Last Name required' })
        }
        if(!req.body.email){
            res.json({ message: 'email required' })
        }
        if(!req.body.password){
            res.json({ message: 'Password required' })
        }
        if(req.body.password !== req.body.confirmPassword){
            res.json({ message: "Password doesn't matched" })
        }
        await MongoDBConnect();
        const responseData = await RegisterModel.findOne({ email: req.body.email })
        if (responseData) {
            res.json({ message: 'User already registered...' })
        }
        else {
            const createNewUser = new RegisterModel({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 1)
            })
            await createNewUser.save();
            res.json({ message: 'User successfully registered...' });
        }
    }
    catch (error) {
        console.log(error)
        res.json({ message: 'Error, Please try again...' })
    }
}


export default handler;