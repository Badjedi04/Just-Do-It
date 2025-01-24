document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.querySelector(".todo-input");
    const todoButton = document.querySelector(".todo-btn");
    const todoList = document.querySelector(".todo-list");
    const themeSelectors = document.querySelectorAll(".theme-selector");

    // Add task event listener
    todoButton.addEventListener("click", addTodo);
    todoList.addEventListener("click", deleteOrCheck);

    // Theme change functionality
    themeSelectors.forEach(theme => {
        theme.addEventListener("click", () => {
            document.body.className = "";
            if (theme.classList.contains("standard-theme")) {
                document.body.classList.add("standard-theme-bg");
            } else if (theme.classList.contains("light-theme")) {
                document.body.classList.add("light-theme-bg");
            } else if (theme.classList.contains("darker-theme")) {
                document.body.classList.add("darker-theme-bg");
            }
        });
    });

    // Add new task function
    function addTodo(event) {
        event.preventDefault();
        if (todoInput.value.trim() === "") return;

        // Create todo div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        // Create list item
        const newTodo = document.createElement("li");
        newTodo.innerText = todoInput.value;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        // Check button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        // Delete button
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        // Append to list
        todoList.appendChild(todoDiv);
        todoInput.value = "";
    }

    // Delete or check task function
    function deleteOrCheck(e) {
        const item = e.target;
        if (item.classList.contains("trash-btn")) {
            const todo = item.parentElement;
            todo.remove();
        } else if (item.classList.contains("complete-btn")) {
            const todo = item.parentElement;
            todo.classList.toggle("completed");
        }
    }
});
