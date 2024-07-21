import MongoDBConnect from '../../Utils/MongoDB';
import RegisterModel from '../../Model/NewUser';
import bcrypt from 'bcryptjs';

/* Register new user endpoint */
const handler = async (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Only POST requests allowed' })
    }
    try {
        if (!req.body.firstName) {
            res.json({ message: 'First Name required' })
        }
        if (!req.body.lastName) {
            res.json({ message: 'Last Name required' })
        }
        if (!req.body.email) {
            res.json({ message: 'email required' })
        }
        if (!req.body.password) {
            res.json({ message: 'Password required' })
        }
        if (req.body.password !== req.body.confirmPassword) {
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
            res.status(200).json({ message: 'User successfully registered...' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error, Please try again...' })
    }
}


export default handler;