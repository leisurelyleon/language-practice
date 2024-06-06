// Import necessary React modules
import React, { useState } from 'react';

// Task component representing an individual task
const Task = ({ task, onToggle }) => {
  return (
    <div>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
        {task.text}
      </span>
    </div>
  );
};

// TaskList component to display a list of tasks
const TaskList = ({ tasks, onToggle }) => {
  return (
    <div>
      {tasks.map((task) => (
        <Task key={task.id} task={task} onToggle={onToggle} />
      ))}
    </div>
  );
};

// FilterButtons component to filter tasks based on completion status
const FilterButtons = ({ filter, onFilterChange }) => {
  return (
    <div>
      <button onClick={() => onFilterChange('all')} disabled={filter === 'all'}>
        All
      </button>
      <button
        onClick={() => onFilterChange('active')}
        disabled={filter === 'active'}
      >
        Active
      </button>
      <button
        onClick={() => onFilterChange('completed')}
        disabled={filter === 'completed'}
      >
        Completed
      </button>
    </div>
  );
};

// App component representing the main application
const App = () => {
  // State to manage tasks
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a React app', completed: false },
    { id: 3, text: 'Deploy React app', completed: false },
  ]);

  // State to manage the filter status
  const [filter, setFilter] = useState('all');

  // Function to add a new task
  const addTask = (text) => {
    setTasks([...tasks, { id: tasks.length + 1, text, completed: false }]);
  };

  // Function to toggle the completion status of a task
  const toggleTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Function to filter tasks based on completion status
  const filterTasks = () => {
    switch (filter) {
      case 'active':
        return tasks.filter((task) => !task.completed);
      case 'completed':
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  };

  return (
    <div>
      <h1>Task Management App</h1>
      {/* Task input form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const text = e.target.taskInput.value;
          addTask(text);
          e.target.taskInput.value = '';
        }}
      >
        <input type="text" name="taskInput" />
        <button type="submit">Add Task</button>
      </form>
      
      {/* Display TaskList component */}
      <TaskList tasks={filterTasks()} onToggle={toggleTask} />

      {/* Display FilterButtons component */}
      <FilterButtons filter={filter} onFilterChange={setFilter} />
    </div>
  );
};

export default App;