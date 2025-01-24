document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const input = document.querySelector(".todo-input");
    const todoList = document.querySelector(".todo-list");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const taskText = input.value.trim();
        if (taskText === "") return;

        // Create new task element
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
            <span class="task-text">${taskText}</span>
            <button class="check-btn"><i class="fas fa-check"></i></button>
            <button class="delete-btn"><i class="fas fa-trash"></i></button>
        `;

        todoList.appendChild(taskItem);
        input.value = "";

        // Add event listener for completion
        taskItem.querySelector(".check-btn").addEventListener("click", () => {
            taskItem.classList.toggle("completed");
        });

        // Add event listener for deletion
        taskItem.querySelector(".delete-btn").addEventListener("click", () => {
            todoList.removeChild(taskItem);
        });
    });
});
