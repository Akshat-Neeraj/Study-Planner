async function loadTasks(){

const response = await fetch("/tasks")

const tasks = await response.json()

renderTasks(tasks)

}

function renderTasks(tasks){

const list=document.getElementById("taskList")

list.innerHTML=""

let completed=0
let totalHours=0

tasks.forEach((task)=>{

if(task.completed) completed++

totalHours+=Number(task.hours)

const div=document.createElement("div")

div.className="task"

div.innerHTML = `
<div class="taskHeader">${task.subject}</div>

<div class="taskInfo">
${task.hours} hours • Due: ${task.deadline}
</div>

<div class="taskStatus">
Status: ${task.completed ? "Completed" : "Pending"}
</div>
`

const completeBtn=document.createElement("button")

completeBtn.textContent="Complete"
completeBtn.className="completeBtn"

completeBtn.onclick = async function(){

await fetch("/tasks/"+task._id,{
method:"PATCH"
})

loadTasks()

}

const deleteBtn=document.createElement("button")

deleteBtn.textContent="Delete"
deleteBtn.className="deleteBtn"

deleteBtn.onclick = async function(){

await fetch("/tasks/"+task._id,{
method:"DELETE"
})

loadTasks()

}

div.appendChild(completeBtn)
div.appendChild(deleteBtn)

list.appendChild(div)

})

document.getElementById("totalTasks").textContent=tasks.length
document.getElementById("completedTasks").textContent=completed
document.getElementById("totalHours").textContent=totalHours

}

async function addTask(){

const subject=document.getElementById("subject").value
const hours=document.getElementById("hours").value
const deadline=document.getElementById("deadline").value

await fetch("/tasks",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
subject,
hours,
deadline
})

})

loadTasks()

}

loadTasks()
