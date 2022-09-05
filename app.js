// console.log("Hello World");
// function getData(){
//     url = 'https://api.unsplash.com/photos/random?page=1&query=nature&orientation=landscape&client_id=AM7OQGSHBU6vRpq32_eZve8Z62b767qv3Rrczf8ppZw'
//     fetch(url).then((response)=>{
//         // console.log(response);
//         return response.json();
//     }).then((data)=>{
//         console.log(JSON.stringify(data['urls']['raw']));
//         return JSON.stringify(data['urls']['raw']);
//     })
// }
// document.querySelector('body').style.backgroundImage = `url('${getData()}')`;

let task = document.getElementsByClassName("task");
let taskContainer = document.getElementById("taskContainer");
let checkbtn = document.getElementsByClassName("checkbtn");
let updatebtn = document.getElementsByClassName("updatebtn");
let addbtn = document.getElementsByClassName("addbtn");
let clrbtn = document.getElementsByClassName("clrbtn");
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
        <i class="fa-regular fa-pen-to-square" onclick="updatetask(this)"></i>
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
        clrbtn.disable = false;
        // clrbtn.style.backgroundColor = "white";
        empty.style.display = "none";
        taskContainer.innerHTML += `<div class="task" onmouseenter="showicons(this)" onmouseleave="hideicons(this)">
        <input type="checkbox" class="checkbtn" onclick="check(this)">
        <div class="description">${inpTask.value}</div>
        <i class="fa-regular fa-pen-to-square" onclick="updatetask(this)"></i>
        <i class="fa-regular fa-trash-can" onclick="deltask(this)"></i>
        </div>`;
        todos.push(inpTask.value);
        localStorage.removeItem("todos");
        localStorage.setItem("todos", JSON.stringify(todos));
        inpTask.value = "";
        msganimate("Task Added");
    }
    else
        alert("Cannot enter an empty task");
}

function cleartask(){
    clrbtn.disable = true;
    // clrbtn.style.backgroundColor = "grey";
    if(todos.length==0)
        msganimate("There is no task to be cleared");
        else
        msganimate("Cleared all tasks");
    localStorage.clear();
    todos = [];
    empty.style.display = "block";
    taskContainer.innerHTML = '';
}

function check(element){
    if(element.checked){
        element.parentNode.childNodes[3].style.textDecoration = "line-through #00ADB5 3px";
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
    list.removeChild(list.childNodes[index]);
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

let prevtext;
function updatetask(index){
    inpTask.value = index.parentNode.childNodes[3].innerHTML;
    prevtext = inpTask.value;
    inpTask.focus();
}

function update(){
    let index = todos.indexOf(prevtext);
    taskContainer.childNodes[index].childNodes[3].innerHTML = inpTask.value;    
    todos[todos.indexOf(prevtext)] = inpTask.value;
    localStorage.removeItem("todos");
    localStorage.setItem("todos", JSON.stringify(todos));
    inpTask.value = '';
    msganimate("Task Updated");
}