// Task class to represent individual tasks
class Task {
    constructor(id, title, priority, dueDate) {
        this.id = id;
        this.title = title;
        this.priority = priority;
        this.dueData = dueDate;
        this.completed = false;
    }

    maskComplete() {
        this.completed = true;
        console.log(`Task "${this.title}" marked as complete.`);
    }
}

// TaskManager class to manage tasks
class TaskManager {
    constructor() {
        this.tasks = [];
    }

    addTask(title, priority, dueDate) {
        const taskId = this.tasks.length + 1;
        const newTask = new Task(taskId, title, priority, dueDate);
        this.tasks.push(newTask);
        console.log(`Task "${title}" added successfully.`);
    }

    displayTasks() {
        if (this.tasks.length === 0) {
            console.log('No tasks available.');
        } else {
            console.log('Task List:');
            this.tasks.forEach(task => {
                console.log(`#${task.id} - ${task.title} | Priority: ${task.priority} | Due Date: ${task.dueDate} | Completed: ${task.completed}`);
            });
        }
    }

    filterByPriority(priority) {
        const filteredTasks = this.tasks.filter(task => task.priority === priority && !task.completed);
        console.log(`Tasks with Priority ${priority}:`);
        filteredTasks.forEach(task => {
            console.log(`#${task.id} - ${task.title} | Due Date: ${task.dueDate}`);
        });
    }
}

// Creating a task manager instance
const taskManager = new TaskManager();

// Adding tasks
taskManager.addTask('Complete JavaScript Project', 'High', '2023-12-10');
taskManager.addTask('Read JavaScript Book', 'Medium', '2023-12-15');
taskManager.addTask('Exercise', 'Low', '2023-12-08');

// Displaying tasks
taskManager.displayTasks();

// Marking a task as complete
taskManager.tasks[0].markComplete();

// Displaying tasks after completion
taskManager.displayTasks();

// Filtering tasks by priority
taskManager.filterByPriority('High');