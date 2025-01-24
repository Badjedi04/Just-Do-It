document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.querySelector('.todo-input');
    const todoButton = document.querySelector('.todo-btn');
    const todoList = document.querySelector('.todo-list');
    const themeSelectors = document.querySelectorAll('.theme-selector');

    // Load existing tasks from localStorage
    loadTodos();

    // Add new task event
    todoButton.addEventListener('click', (e) => {
        e.preventDefault();
        addTodo(todoInput.value);
        saveTodos();
        todoInput.value = '';
    });

    // Delete or check task
    todoList.addEventListener('click', (e) => {
        const item = e.target;
        if (item.classList.contains('check-btn')) {
            const todo = item.parentElement;
            todo.classList.toggle('completed');
        } else if (item.classList.contains('delete-btn')) {
            const todo = item.parentElement;
            todo.remove();
            saveTodos();
        }
    });

    // Theme selection event
    themeSelectors.forEach(theme => {
        theme.addEventListener('click', () => {
            document.body.className = theme.classList[0];
            localStorage.setItem('theme', theme.classList[0]);
        });
    });

    // Load theme from localStorage
    function loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.body.className = savedTheme;
        }
    }
    loadTheme();

    // Add a new task
    function addTodo(task) {
        if (task.trim() === '') return;
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        const newTodo = document.createElement('li');
        newTodo.innerText = task;
        todoDiv.appendChild(newTodo);
        const checkButton = document.createElement('button');
        checkButton.innerHTML = '✔';
        checkButton.classList.add('check-btn');
        todoDiv.appendChild(checkButton);
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '🗑';
        deleteButton.classList.add('delete-btn');
        todoDiv.appendChild(deleteButton);
        todoList.appendChild(todoDiv);
        saveTodos();
    }

    // Save tasks to localStorage
    function saveTodos() {
        const todos = [];
        document.querySelectorAll('.todo').forEach(todo => {
            todos.push({
                text: todo.firstChild.innerText,
                completed: todo.classList.contains('completed')
            });
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    // Load tasks from localStorage
    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.forEach(todo => addTodo(todo.text));
        document.querySelectorAll('.todo').forEach((todoDiv, index) => {
            if (todos[index].completed) {
                todoDiv.classList.add('completed');
            }
        });
    }
});
