const mongoose = require('mongoose');

let TaskSchema = new mongoose.Schema(
    {
        name: String,
        description:String,
        isDone: Boolean,
        priority : Number
    },
    {
        strict:false
    }
)

const TaskModel = mongoose.model("TaskSchema",TaskSchema);

module.exports = TaskModel;