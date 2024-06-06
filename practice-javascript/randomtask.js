function createTaskExecutor() {
    let taskQueue = [];

    function executeTask(task) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const result = task();
                resolve(result);
            }, Math.random() * 1000);
        });
    }

    function scheduleTask(task) {
        taskQueue.push(task);
        processTasks();
    }

    async function processTasks() {
        if (taskQueue.length > 0) {
            const currentTask = taskQueue.shift();
            try {
                console.log(`Executing task: ${currentTask.name}`);
                const result = await executeTask(currentTask);
                console.log(`Task completed: ${currentTask.name}, Result: ${result}`);
            } catch (error) {
                console.error(`Error executing task: ${currentTask.name}, ${error}`);
            } finally {
                processTasks();
            }
        }
    }

    return {
        scheduleTask,
    };
}

// Example usage:

const taskExecutor = createTaskExecutor();

function createTask(name) {
    return () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log(`${name} is done!`);
                resolve(`${name} result`);
            }, Math.random() * 1000);
        });
    };
}

taskExecutor.scheduleTask(createTask('Task 1'));
taskExecutor.scheduleTask(createTask('Task 2'));
taskExecutor.scheduleTask(createTask('Task 3'));
taskExecutor.scheduleTask(createTask('Task 4'));
taskExecutor.scheduleTask(createTask('Task 5'));