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
