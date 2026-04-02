const express = require("express")
const Task = require("../models/task")

const router = new express.Router()

router.post("/tasks", async (req,res)=>{
try {
const task = new Task(req.body)
await task.save()
res.send(task)
} catch(e) {
res.status(400).send({ error: e.message })
}
})

router.get("/tasks", async (req,res)=>{
try {
const tasks = await Task.find({})
res.send(tasks)
} catch(e) {
res.send([])
}
})

router.delete("/tasks/:id", async (req,res)=>{
try {
await Task.findByIdAndDelete(req.params.id)
res.send()
} catch(e) {
res.status(500).send()
}
})

router.patch("/tasks/:id", async (req,res)=>{
try {
const task = await Task.findById(req.params.id)
task.completed = true
await task.save()
res.send(task)
} catch(e) {
res.status(500).send()
}
})

module.exports = router

