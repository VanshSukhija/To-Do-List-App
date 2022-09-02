// console.log("Hello World");

let task = document.getElementsByClassName("task");
let taskContainer = document.getElementById("taskContainer");
let checkbtn = document.getElementsByClassName("checkbtn");
let addbtn = document.getElementsByClassName("addbtn");
let inpTask = document.getElementById("inpTask");

let tasks = [];
let checked = [];

for(let i=0; i<JSON.parse(localStorage.getItem("tasks")).length; i++){
    tasks.push(JSON.parse(localStorage.getItem("tasks") || "[]"));
    checked.push(JSON.parse(localStorage.getItem("checked")));
    console.log(tasks[i]);

    taskContainer.innerHTML += `<div class="task" onmouseenter="showicons(this)" onmouseleave="hideicons(this)">
    <input type="checkbox" class="checkbtn">
    <div>${tasks[i]}</div>
    <i class="fa-regular fa-pen-to-square"></i>
    <i class="fa-regular fa-trash-can"></i>
    </div>`
}

function showicons(index){
    // console.log(index.childNodes);
    index.childNodes[1].style.opacity = "100%";
    index.childNodes[5].style.opacity = "100%";
    index.childNodes[7].style.opacity = "100%";
};

function hideicons(index){
    // console.log(index.childNodes);
    index.childNodes[1].style.opacity = "50%";
    index.childNodes[5].style.opacity = "50%";
    index.childNodes[7].style.opacity = "50%";
};

function addtask(){
    if(inpTask.value){
        taskContainer.innerHTML += `<div class="task" onmouseenter="showicons(this)" onmouseleave="hideicons(this)">
        <input type="checkbox" class="checkbtn">
        <div>${inpTask.value}</div>
        <i class="fa-regular fa-pen-to-square"></i>
        <i class="fa-regular fa-trash-can"></i>
        </div>`
        localStorage.removeItem("tasks");
        tasks.push(inpTask.value);
        checked.push(0);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        localStorage.setItem("checked", JSON.stringify(checked));
        inpTask.value = "";
    }
    else{
        alert("You cannot enter an empty task");
    }
}