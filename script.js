var todoInput, addBtn, todoList, todoCount, clearBtn;
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
        clearBtn = document.getElementById('clear-completed');
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

    function addTodo(text) 
    {
        var todo = { id: todoId++, text: text, completed: false };
        todos.push(todo);
    }
