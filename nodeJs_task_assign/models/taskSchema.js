const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/todoCompletion")

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    task:{type:String,},
    is_completed:{type:Boolean}
})

const todos = mongoose.model("todos", taskSchema);

module.exports = todos;