document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('.todo-input');
    const button = document.querySelector('.todo-btn');
    const todoList = document.querySelector('.todo-list');

    button.addEventListener('click', (event) => {
        event.preventDefault();

        if (input.value.trim() === "") {
            alert("Please enter a task.");
            return;
        }

        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        const newTodo = document.createElement('li');
        newTodo.innerText = input.value;
        todoDiv.appendChild(newTodo);

        const checkButton = document.createElement('button');
        checkButton.innerHTML = '<i class="fas fa-check"></i>';
        checkButton.addEventListener('click', () => {
            newTodo.classList.toggle('done');
        });
        todoDiv.appendChild(checkButton);

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.addEventListener('click', () => {
            todoDiv.remove();
        });
        todoDiv.appendChild(deleteButton);

        todoList.appendChild(todoDiv);
        input.value = "";
    });
});
