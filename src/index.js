import _ from 'lodash';
import './style.css';

const tasksKey = 'todoTasks';

let tasks = [];

const saveTasks = () => {
  localStorage.setItem(tasksKey, JSON.stringify(tasks));
};

const loadTasks = () => {
  const storedTasks = localStorage.getItem(tasksKey);
  tasks = storedTasks ? JSON.parse(storedTasks) : [];
};

const renderTasks = () => {
  const todoList = document.getElementById('todo-list');

  todoList.innerHTML = ''; // Clear existing list

  tasks.sort((a, b) => a.index - b.index);

  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.innerText = task.description;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
      tasks[index].completed = checkbox.checked;
      if (checkbox.checked) {
        listItem.classList.add('completed');
      } else {
        listItem.classList.remove('completed');
      }
      saveTasks();
    });
    listItem.prepend(checkbox);

    const kebabMenu = document.createElement('i');
    kebabMenu.className = 'fas fa-ellipsis-v kebab-menu';
    listItem.appendChild(kebabMenu);

    todoList.appendChild(listItem);
  });
};

const addTask = () => {
  const taskInput = document.getElementById('task-input');
  const newTaskDescription = taskInput.value.trim();
  if (newTaskDescription !== '') {
    const newTask = {
      description: newTaskDescription,
      completed: false,
      index: tasks.length + 1,
    };
    tasks.push(newTask);
    saveTasks();
    renderTasks();
    taskInput.value = '';
  }
};

const clearTasks = () => {
  tasks.length = 0; // Clear tasks array
  saveTasks();
  renderTasks();
};
