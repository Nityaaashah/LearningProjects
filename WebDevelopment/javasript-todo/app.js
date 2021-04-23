 //Selectors//
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filteroption = document.querySelector(".filter-todos");
//Event Listeners
document.addEventListener("DOMContentLoaded",getTodos); //if every thing is loaded then load the function of gte todos//
todoButton.addEventListener("click",addtodo);
todoList.addEventListener("click",deleteCheck);
filteroption.addEventListener("click",filtertodo);
//Functioms

function addtodo(event){
    event.preventDefault();
    //TODO DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //create LI//
    
    const newTodo = document.createElement("li");
    newTodo.innerText=  todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //ADD TODO TO LOCALHOST//
    saveLocalTodo(todoInput.value);

    //Check Mark Button //
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("completed-btn");
    todoDiv.appendChild(completedButton);

    //Check trash Button //
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //Append To List //
    todoList.appendChild(todoDiv);

    //clear input value//
    todoInput.value = "";
}

function deleteCheck(e){
    const item = e.target;
    //Delete Todo//
    if(item.classList[0] === "trash-btn")
    {
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodo(todo);
        todo.addEventListener("transitionend",function(){
        todo.remove();
        });
        
    }

    if(item.classList[0] === "completed-btn")
    {
        const todo=item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filtertodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value)
        {
            case "all":
                todo.style.display = "flex";
                break;            
            case "completed":
                if(todo.classList.contains("completed"))
                {
                    todo.style.display="flex";
                }
                else{
                    todo.style.display="none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed'))
                {
                    todo.style.display="flex";
                }
            else{
                    todo.style.display="none";
                }
                break;
        }
    });
}
function saveLocalTodo(todo)
{
    //check-- Do i already have things in there//
    let todos;
    if(localStorage.getItem('todos') === null)
    {
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    //grab the todos and push into todos//
    todos.push(todo); 
    localStorage.setItem("todos",JSON.stringify(todos));
}

function getTodos( )
{
     //check-- Do i already have things in there//
     let todos;
     if(localStorage.getItem('todos') === null)
     {
         todos = [];
     }
     else
     {
         todos = JSON.parse(localStorage.getItem("todos"));
     }           
     todos.forEach(function(todo)
    {
        //TODO DIV
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        //create LI//
        
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        //Check Mark Button //
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("completed-btn");
        todoDiv.appendChild(completedButton);
    });
}        

function removeLocalTodo(todo){
     //check-- Do i already have things in there//
     let todos;
     if(localStorage.getItem('todos') === null)
     {
         todos = [];
     }
     else
     {
         todos = JSON.parse(localStorage.getItem("todos"));
     }           
     const todoIndex = todo.children[0].innerText;
     todos.splice(todos.indexOf(todoIndex),1); //1 indicate how many to remove//This remove form array only but we have toset these array to Localstorage//
    localStorage.setItem('todos',JSON.stringify(todos));
}