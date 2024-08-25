let elForm = document.querySelector(".todo-form");
let inputValue = document.querySelector(".todo-input");
let elTodoList = document.querySelector(".todo-list");

let elModalWrapper = document.querySelector(".modal-wrapper")
let elModalInner = document.querySelector(".modal-inner")

let elAllCount = document.querySelector(".all-count")
let elComplatedCount = document.querySelector(".complated-count")
let elUnComplatedCount = document.querySelector(".uncomplated-count")

let elCountBtnWrapper = elAllCount.parentElement.parentElement

let todos = [];

elCountBtnWrapper.addEventListener("click", function(e){
    if(e.target.matches(".all-count-btn")){
        renderTodos(todos)
    }
    else if(e.target.matches(".complated-count-btn")){
        const filteredArr = todos.filter(item => item.isCompleted == true)
        renderTodos(filteredArr)
    }
    else if(e.target.matches(".uncomplated-count-btn")){
        const filteredArr = todos.filter(item => item.isCompleted != true)
        renderTodos(filteredArr)
    }
})
elForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const data = {
        id: todos.length + 1,
        todoValue: inputValue.value,
        isCompleted: false
    };
    e.target.reset();
    todos.push(data);
    renderTodos(todos);
    localStorage.setItem("todos", JSON.stringify(todos))
});
function renderTodos(arr) {
    elTodoList.innerHTML = null;
    arr.forEach(item => {
        let elTodoItem = document.createElement("li");
        elTodoItem.className = "flex bg-white p-2 rounded-lg items-center justify-between";
        elTodoItem.innerHTML = `
            <div>
                <span>${item.id}.</span>
                <strong class="${item.isCompleted ? 'line-through' : ''}">${item.todoValue}</strong>
            </div>
            <div class="flex items-center space-x-1">
                <div class="select-btn w-[20px] h-[20px] cursor-pointer rounded-full border-[2px] border-black ${item.isCompleted ? 'bg-blue-500' : ''}"></div>
                <button onclick="handleUpdateTodo(${item.id})"  class="update-btn p-[6px] rounded-lg bg-blue-500 text-white border-[2px] border-transparent font-semibold hover:bg-transparent hover:text-blue-500 hover:border-blue-500 duration-300" type="button">Update</button>
                <button class="delete-btn p-[6px] rounded-lg bg-red-500 text-white border-[2px] border-transparent font-semibold hover:bg-transparent hover:text-red-500 hover:border-red-500 duration-300" type="button">Delete</button>
            </div>
        `;
        elTodoList.append(elTodoItem);

        elTodoItem.querySelector(".select-btn").addEventListener("click", function() {
            item.isCompleted = !item.isCompleted;
            renderTodos(todos);
        });
        elTodoItem.querySelector(".delete-btn").addEventListener("click", function() {
            todos = todos.filter(t => t.id !== item.id);
            renderTodos(todos);
        });
        // Update button
        elTodoItem.querySelector(".update-btn").addEventListener("click", function() {
            const newTask = prompt("Update your task", item.todoValue);
            if (newTask !== null && newTask.trim() !== '') {
                item.todoValue = newTask.trim();
                renderTodos(todos);
            }
        });
    })
    elAllCount.textContent = todos.length
    elComplatedCount.textContent = todos.filter(item => item.isCompleted == true).length
    elUnComplatedCount.textContent = todos.filter(item => item.isCompleted != true).length
}
renderTodos()
//-------------------------------------------- Soat (qoshimcha) -----------------------------------
function showCurrentTime() {
    const dateElement = document.querySelector(".current-time");
    function updateTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        dateElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
    updateTime(); 
    setInterval(updateTime, 1000); 
}
showCurrentTime();
// ---------------------------------------------------------------------
function handleUpdateTodo(id){
    elModalWrapper.classList.remove("scale-0")
    const findedObj = todos.find(item => item.id ==id)
    elModalInner.innerHTML=`
    <form  class="update-form flex justify-between">
    <input value="${findedObj.todoValue}" type="text" class="w-[80%] pl-2 rounded-lg" name="updateTodovalue" placeholder="Update todo">
    <button id="${id}" class="update-btn p-[6px] rounded-lg bg-blue-500 text-white border-[2px] border-transparent font-semibold hover:bg-transparent hover:text-blue-500 hover:border-blue-500 duration-300" type="submit">Update</button>
    </form>
    `
    let elUpdateForm = document.querySelector(".update-form")
    elUpdateForm.addEventListener("submit", (e) => {
        e.preventDefault()
        findedObj.todoValue = e.target[0].value
        elModalWrapper.classList.add("scale-0")
        renderTodos(todos)
    })
}
elModalWrapper.addEventListener("click", function(e){
    if(e.target.id =="wrapper") elModalWrapper.classList.add("scale-0")
})


