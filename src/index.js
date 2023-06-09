import _ from 'lodash';
import './style.css';

const tasks = [
  { description: 'wash the dishes', completed: false, index: 1 },
  { description: 'complete to do list', completed: true, index: 2 },
  { description: 'learn Javascript', completed: false, index: 3 },
];

const renderTasks = () => {
  const todoList = document.getElementById('todo-list');

  tasks.sort((a, b) => a.index - b.index);

  tasks.forEach(task => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
    });

    const listItem = document.createElement('li');
    listItem.innerText = task.description;
    if (task.completed) {
      listItem.classList.add('completed');
    }
    
    listItem.appendChild(checkbox);
    todoList.appendChild(listItem);
  });
}

document.addEventListener('DOMContentLoaded', renderTasks);
