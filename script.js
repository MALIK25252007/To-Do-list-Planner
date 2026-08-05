const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const todoForm = document.querySelector('.todo-form');
const totalCount = document.getElementById('total-count');
const completedCount = document.getElementById('completed-count');
const emptyState = document.querySelector('.empty-state');
const clearBtn = document.querySelector('.clear-btn');

let tasks = [];

function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;

    totalCount.textContent = total;
    completedCount.textContent = completed;
    emptyState.style.display = total === 0 ? 'block' : 'none';
}

function renderTasks() {
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const item = document.createElement('li');
        item.className = `task-item${task.completed ? ' completed' : ''}`;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => {
            task.completed = checkbox.checked;
            item.classList.toggle('completed', task.completed);
            updateStats();
        });

        const label = document.createElement('label');
        label.textContent = task.text;
        label.htmlFor = `task-${task.id}`;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', () => {
            tasks = tasks.filter(current => current.id !== task.id);
            renderTasks();
            updateStats();
        });

        item.appendChild(checkbox);
        item.appendChild(label);
        item.appendChild(removeBtn);
        taskList.appendChild(item);
    });
}

function addTask(text) {
    const trimmedText = text.trim();
    if (!trimmedText) {
        taskInput.focus();
        return;
    }

    tasks.push({
        id: Date.now(),
        text: trimmedText,
        completed: false,
    });

    taskInput.value = '';
    renderTasks();
    updateStats();
}

todoForm.addEventListener('submit', event => {
    event.preventDefault();
    addTask(taskInput.value);
});

clearBtn.addEventListener('click', () => {
    tasks = tasks.filter(task => !task.completed);
    renderTasks();
    updateStats();
});

updateStats();
renderTasks();


