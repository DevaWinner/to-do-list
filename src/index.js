import _ from 'lodash';
import './style.css';

const tasksKey = 'todoTasks';

let tasks = [];

const saveTasks = () => {
  localStorage.setItem(tasksKey, JSON.stringify(tasks));
};
