const app = {
    data() {
        return {
            title: 'To-Do List',
            hasWarning: true,
            maxInputLength: 15,
            placeHolder: `Input your task title (15 symbols max)`,
            tasksToDoTitle: 'Tasks To-Do',
            completedTasksTitle: 'Completed Tasks',
            inputValue: '',
            tasksToDo: loadFromLocalStorage('taskToDo'),
            completedTasks: loadFromLocalStorage('completedTasks'),
            editingTaskIndex: -1,
        }
    },
    methods: {
        addTaskToDo(value) {
            if (this.inputValue.trim() === '') return;
            this.tasksToDo.push(value);
            this.inputValue = '';
            saveToLocalStorage('taskToDo', this.tasksToDo);
        },
        deleteTask(arr, index) {
            arr.splice(index, 1);
            saveToLocalStorage('completedTasks', this.completedTasks);
            saveToLocalStorage('taskToDo', this.tasksToDo);
        },
        completeTask(value, index) {
            this.completedTasks.push(value);
            saveToLocalStorage('completedTasks', this.completedTasks);
            this.deleteTask(this.tasksToDo, index);
            saveToLocalStorage('taskToDo', this.tasksToDo);
        },
        editTask(value, index) {
            if (this.editingTaskIndex !== index) {
                this.inputValue = value;
                this.editingTaskIndex = index;
            } else {
                this.tasksToDo[this.editingTaskIndex] = this.inputValue;
                this.editingTaskIndex = -1;
                this.inputValue = '';
                saveToLocalStorage('taskToDo', this.tasksToDo);
            }
        }
    }
}

function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function loadFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}


Vue.createApp(app).mount('#app');