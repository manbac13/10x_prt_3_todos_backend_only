const express = require("express");
const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/todoCompletion")
const bodyParser = require("body-parser")
const todos = require("./models/taskSchema")

const app = express()
app.use(bodyParser())


//get list of all the tasks
app.get("/v1/task", async(req,res)=>{
    try {
        const listOfTasks = await todos.find()
        res.status(200).json({
            status:"success",
            listOfTasks
        })
    } catch (error) {
        res.status(400).json({
            status:"failed",
            message:error.message
        })
    }
})

//get a specific task
app.get("/v1/task/:id", async(req,res)=>{
    try {
        const taskFound = await todos.findOne({_id:req.params.id})
        console.log(taskFound)
        if(!taskFound){
            return res.status(404).json({
                error: "There is no task at that id"
            })

        }
        res.status(200).json({
            status:"success",
            taskFound
        })
    } catch (error) {
        
    }
})


//create a single task
app.post("/v1/task" , async(req,res)=>{
    try {
        const task = await todos.create(req.body)
        res.status(201).json({
            status:"success",
            message:"task has been successfully created",
            task
        })
    } catch (error) {
        res.status(400).json({
            status:"failed",
            message:error.message
        })
    }
    
})

//update a task
app.put("/v1/task/:id", async(req,res)=>{
    try {
        const singleTask = await todos.findOne({_id:req.params.id})
        if(singleTask){
            await todos.updateOne(singleTask, {task:req.body.task, is_completed:req.body.is_completed})
            res.status(200).json({
                status:"success",
                message:"Task is updated successfully"
            })
        }
        else{
            res.status(404).json({
                error:"There is no task at that id"
            })
        }

    } 
    catch(error){
        res.status(400).json({
            status:"failed",
            message:error.message
        })
    }
})

//delete a task

app.delete("/v1/task/:id", async(req,res)=>{
    try {
        const singleTask = await todos.findOne({_id:req.params.id})
        if(singleTask){
            await todos.deleteOne(singleTask._id)
            res.status(204).json({
                status:"success",
                message:"task successfully deleted"
            })
        }
        else{
            res.status(404).json({
                error: "There is no task at that id"
            })
        }
    } catch (error) {
        res.status(400).json({
            status:"failed",
            message:error.message
        })
    }
})

//deleteMany


app.listen(8080, ()=>{
    console.log("Server is up at port 8080")
})