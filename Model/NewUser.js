import mongoose from "mongoose";

/* MongoBB Schema form user */
const Register = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    imgUrl: String
});

const RegisterModel = mongoose.models.UserData || mongoose.model('UserData', Register);

export default RegisterModel;