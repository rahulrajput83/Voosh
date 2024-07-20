import mongoose from "mongoose";

const Register = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
});

const RegisterModel = mongoose.models.UserData || mongoose.model('UserData', Register);

export default RegisterModel;