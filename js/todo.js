let elForm = document.querySelector(".todo-form");
let inputValue = document.querySelector(".todo-input");
let elTodoList = document.querySelector(".todo-list");

let todos = [];
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
                <button class="update-btn p-[6px] rounded-lg bg-blue-500 text-white border-[2px] border-transparent font-semibold hover:bg-transparent hover:text-blue-500 hover:border-blue-500 duration-300" type="button">Update</button>
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
    });
}
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
