import _ from 'lodash';
import './style.css';

const tasksKey = 'todoTasks';

let tasks = [
  { description: 'Task 1', completed: false, index: 1 },
  { description: 'Task 2', completed: true, index: 2 },
  { description: 'Task 3', completed: false, index: 3 },
];

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
    listItem.className = 'task-item';

    const taskWrapper = document.createElement('div');
    taskWrapper.className = 'task-wrapper';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.className = 'checkbox';
    checkbox.addEventListener('change', () => {
      tasks[index].completed = checkbox.checked;
      if (checkbox.checked) {
        taskText.classList.add('completed');
      } else {
        taskText.classList.remove('completed');
      }
      saveTasks();
    });
    taskWrapper.appendChild(checkbox);

    const taskText = document.createElement('p');
    taskText.innerText = task.description;
    taskText.className = 'task-text';
    if (task.completed) {
      taskText.classList.add('completed');
    }
    taskWrapper.appendChild(taskText);

    const kebabMenu = document.createElement('i');
    kebabMenu.className = 'bx bx-dots-vertical-rounded';
    taskWrapper.appendChild(kebabMenu);

    listItem.appendChild(taskWrapper);
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
  tasks = [];
  saveTasks();
  renderTasks();
};

document.addEventListener('DOMContentLoaded', () => {
  loadTasks();
  renderTasks();

  const addTaskButton = document.getElementById('add-task-button');
  addTaskButton.addEventListener('click', addTask);

  const taskInput = document.getElementById('task-input');
  taskInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      addTask();
    }
  });

  const clearButton = document.getElementById('clear-button');
  clearButton.addEventListener('click', clearTasks);
});