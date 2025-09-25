var todoInput, addBtn, todoList, todoCount;
var todos = [];
var todoId = 0;

initializeElements();
// Inicializar elementos del DOM
function initializeElements() 
{
    todoInput = document.getElementById('todo-input');
    addBtn = document.getElementById('add-btn');
        todoList = document.getElementById('todo-list');
        todoCount = document.getElementById('todo-count');
    }

    function TryAddTodo(text) 
    {
        if (text.trim() === '') {
            alert('Por favor, ingresa una tarea válida.');
            return;
        }
        addTodo(text);
        todoInput.value = '';
    }
    addBtn.addEventListener('click', function() {
        this.TryAddTodo(todoInput.value);
    }.bind(this));

    // Agregar evento para Enter en el input
    todoInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            TryAddTodo(todoInput.value);
        }
    });

    function addTodo(text) {
    var todo = { id: todoId++, text: text, completed: false };
    todos.push(todo);
    
    // Solo agregar el nuevo elemento
    appendTodoElement(todo);
    updateCounter();
}

function appendTodoElement(todo) {
    var li = document.createElement('li');
    li.setAttribute('data-id', todo.id);
    li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    
    li.innerHTML = `
        <div class="todo-content">
            <span class="todo-id">#${todo.id}</span>
            <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''} 
                   onchange="toggleTodo(${todo.id})">
            <span class="todo-text ${todo.completed ? 'completed-text' : ''}">${todo.text}</span>
            <button class="delete-btn" onclick="deleteTodo(${todo.id})">🗑️</button>
        </div>
    `;
    
    todoList.appendChild(li);
}

function toggleTodo(id) {
    var todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        
        // Actualizar solo el elemento específico
        var todoElement = document.querySelector(`[data-id="${id}"]`);
        var checkbox = todoElement.querySelector('.todo-checkbox');
        var text = todoElement.querySelector('.todo-text');
        
        checkbox.checked = todo.completed;
        
        if (todo.completed) {
            todoElement.classList.add('completed');
            text.classList.add('completed-text');
        } else {
            todoElement.classList.remove('completed');
            text.classList.remove('completed-text');
        }
        
        updateCounter();
    }
}

function deleteTodo(id) {
    if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
        // Eliminar del array
        todos = todos.filter(t => t.id !== id);
        
        // Eliminar del DOM
        var todoElement = document.querySelector(`[data-id="${id}"]`);
        if (todoElement) {
            todoElement.remove();
        }
        
        updateCounter();
    }
}

function updateCounter() {
    var pendingCount = todos.filter(t => !t.completed).length;
    var totalCount = todos.length;
    
    if (todoCount) {
        if (totalCount === 0) {
            todoCount.textContent = 'No hay tareas';
        } else if (pendingCount === 0) {
            todoCount.textContent = `${totalCount} tarea(s) completada(s) ✅`;
        } else {
            todoCount.textContent = `${pendingCount} de ${totalCount} pendiente(s)`;
        }
    }
}