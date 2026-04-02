const mongoose = require("mongoose")

const Task = mongoose.model("Task",{

subject:{
type:String,
required:true
},

hours:{
type:Number,
required:true
},

deadline:{
type:String
},

completed:{
type:Boolean,
default:false
}

})

module.exports = Task
