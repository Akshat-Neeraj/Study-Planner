const express = require("express")
const path = require("path")

require("./db/mongoose")

const taskRouter = require("./routes/taskRoutes")

const app = express()

app.use(express.json())
const publicPath = path.join(__dirname,"..")

app.use(express.static(publicPath))

app.use(taskRouter)

const port = 3000

app.listen(port, () => {
console.log("Server running on port " + port)
})
