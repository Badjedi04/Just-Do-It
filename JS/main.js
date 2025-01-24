document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.querySelector(".todo-input");
    const todoButton = document.querySelector(".todo-btn");
    const todoList = document.querySelector(".todo-list");
    const themeSelectors = document.querySelectorAll(".theme-selector");

    // Load saved tasks from local storage
    loadTodos();

    todoButton.addEventListener("click", (e) => {
        e.preventDefault();
        if (todoInput.value.trim() !== "") {
            addTodo(todoInput.value);
            saveTodo(todoInput.value);
            todoInput.value = "";
        }
    });

    todoList.addEventListener("click", (e) => {
        if (e.target.classList.contains("complete-btn")) {
            const todo = e.target.parentElement;
            todo.classList.toggle("completed");
            updateTodoStatus(todo.firstChild.textContent);
        }
        if (e.target.classList.contains("delete-btn")) {
            const todo = e.target.parentElement;
            removeTodo(todo);
        }
    });

    themeSelectors.forEach(selector => {
        selector.addEventListener("click", () => {
            document.body.style.backgroundColor = getComputedStyle(selector).backgroundColor;
            localStorage.setItem("theme", selector.classList[0]);
        });
    });

    function addTodo(todoText) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        const newTodo = document.createElement("li");
        newTodo.textContent = todoText;
        todoDiv.appendChild(newTodo);

        const completeButton = document.createElement("button");
        completeButton.innerHTML = "✓";
        completeButton.classList.add("complete-btn");
        todoDiv.appendChild(completeButton);

        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "🛥";
        deleteButton.classList.add("delete-btn");
        todoDiv.appendChild(deleteButton);

        todoList.appendChild(todoDiv);
    }

    function saveTodo(todo) {
        let todos = JSON.parse(localStorage.getItem("todos")) || [];
        todos.push({ text: todo, completed: false });
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    function loadTodos() {
        let todos = JSON.parse(localStorage.getItem("todos")) || [];
        todos.forEach(todo => {
            addTodo(todo.text);
            if (todo.completed) {
                todoList.lastChild.classList.add("completed");
            }
        });

        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            document.body.style.backgroundColor = getComputedStyle(document.querySelector(`.${savedTheme}`)).backgroundColor;
        }
    }

    function updateTodoStatus(todoText) {
        let todos = JSON.parse(localStorage.getItem("todos")) || [];
        todos = todos.map(todo => todo.text === todoText ? { text: todo.text, completed: !todo.completed } : todo);
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    function removeTodo(todoElement) {
        let todos = JSON.parse(localStorage.getItem("todos")) || [];
        todos = todos.filter(todo => todo.text !== todoElement.firstChild.textContent);
        localStorage.setItem("todos", JSON.stringify(todos));
        todoElement.remove();
    }
});
