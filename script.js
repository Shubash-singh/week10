const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", addTask);
taskList.addEventListener("click", handleTaskActions);

loadTasks();

function addTask() {
    if (taskInput.value === '') return;
    const task = {
        id: Date.now(),
        name: taskInput.value,
        completed: false
    };
    displayTask(task);
    saveToLocalStorage(task);
    taskInput.value = '';
}

function displayTask(task) {
    const li = document.createElement("li");
    li.innerHTML = `
        <input type="checkbox" ${task.completed ? 'checked' : ''}>
        <span contenteditable="true">${task.name}</span>
        <button>Delete</button>
    `;
    li.setAttribute('data-id', task.id);
    if (task.completed) li.classList.add('completed');
    taskList.appendChild(li);
}

function handleTaskActions(e) {
    const li = e.target.parentElement;
    const taskId = li.getAttribute('data-id');

    if (e.target.tagName === 'BUTTON') {
        removeFromLocalStorage(taskId);
        li.remove();
    } else if (e.target.tagName === 'INPUT') {
        toggleTaskCompletedInLocalStorage(taskId, e.target.checked);
        li.classList.toggle('completed', e.target.checked);
    }
}

function loadTasks() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(task => displayTask(task));
}

function getTasksFromLocalStorage() {
    let tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function saveToLocalStorage(task) {
    const tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeFromLocalStorage(taskId) {
    const tasks = getTasksFromLocalStorage();
    const updatedTasks = tasks.filter(task => task.id !== Number(taskId));
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

function toggleTaskCompletedInLocalStorage(taskId, completed) {
    const tasks = getTasksFromLocalStorage();
    const task = tasks.find(task => task.id === Number(taskId));
    task.completed = completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
