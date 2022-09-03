// console.log("Hello World");

let task = document.getElementsByClassName("task");
let taskContainer = document.getElementById("taskContainer");
let checkbtn = document.getElementsByClassName("checkbtn");
let addbtn = document.getElementsByClassName("addbtn");
let inpTask = document.getElementById("inpTask");
let empty = document.getElementById("empty");
let msg = document.getElementById("msg");

let todos = [];
if(JSON.parse(localStorage.getItem("todos")).length){
    empty.style.display = "none";
    for(let i=0; i<JSON.parse(localStorage.getItem("todos")).length; i++){
        todos.push(JSON.parse(localStorage.getItem("todos"))[i]);
    }
    todos.forEach(element => {
        taskContainer.innerHTML += `<div class="task" onmouseenter="showicons(this)" onmouseleave="hideicons(this)">
        <input type="checkbox" class="checkbtn" onclick="check(this)">
        <div class="description">${element}</div>
        <i class="fa-regular fa-pen-to-square"></i>
        <i class="fa-regular fa-trash-can" onclick="deltask(this)"></i>
        </div>`;
    });
}

function showicons(index){
    index.childNodes[1].style.opacity = "100%";
    index.childNodes[5].style.opacity = "100%";
    index.childNodes[7].style.opacity = "100%";
};

function hideicons(index){
    index.childNodes[1].style.opacity = "50%";
    index.childNodes[5].style.opacity = "50%";
    index.childNodes[7].style.opacity = "50%";
};

function addtask(){
    if(inpTask.value){
        empty.style.display = "none";
        taskContainer.innerHTML += `<div class="task" onmouseenter="showicons(this)" onmouseleave="hideicons(this)">
        <input type="checkbox" class="checkbtn" onclick="check(this)">
        <div class="description">${inpTask.value}</div>
        <i class="fa-regular fa-pen-to-square"></i>
        <i class="fa-regular fa-trash-can" onclick="deltask(this)"></i>
        </div>`;
        todos.push(inpTask.value);
        localStorage.removeItem("todos");
        localStorage.setItem("todos", JSON.stringify(todos));
        inpTask.value = "";
        msganimate("Task Added");
    }
    else
        alert("You cannot enter an empty task");
}

function check(element){
    if(element.checked){
        element.parentNode.childNodes[3].style.textDecoration = "line-through red 3px";
    }
    else{
        element.parentNode.childNodes[3].style.textDecoration = "none";
    }
}

function deltask(element){
    let desc = String(element.parentNode.childNodes[3].innerHTML);
    let index = todos.indexOf(desc);
    todos.splice(index, 1);
    localStorage.removeItem("todos");
    localStorage.setItem("todos", JSON.stringify(todos));
    let list = element.parentNode.parentNode;
    list.removeChild(list.childNodes[1+index]);
    msganimate("Task Deleted");
    if(todos.length==0){
        empty.style.display = "block";
    }
}

function msganimate(str){
    let int = setInterval(opa, 20);
    msg.style.opacity = 1;
    function opa(){
        if(msg.style.opacity==0){
            clearInterval(int);
        }
        else{
            msg.style.opacity -= 0.01;
        }
    }
    msg.innerHTML = str;
}