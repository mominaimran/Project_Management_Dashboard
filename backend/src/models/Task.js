import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    status: {
        type: String,
        enum: ["todo", "in-progress", "done"],
        default: "todo"
    },
    project: { // Task kis project se belong karta hai
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true
    }
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);

export default Task;
