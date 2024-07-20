import mongoose from "mongoose";

const ToDo = new mongoose.Schema({
    email: String,
    userId: String,
    title: String,
    desc: String,
    createdAt: String,
    taskCategory: Number
});

const ToDoModel = mongoose.models.ToDo || mongoose.model('ToDo', ToDo);

export default ToDoModel;