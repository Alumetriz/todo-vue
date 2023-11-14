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
            editingTaskIndex: -1,
            tasks: loadFromLocalStorage('tasks') || [],
            filterType: 'all',
        }
    },
    methods: {
        addTaskToDo(value) {
            if (this.inputValue.trim() === '') return;
            this.tasks.push({id: this.tasksCount, value, completed: false});
            this.inputValue = '';
            saveToLocalStorage('tasks', this.tasks);
        },
        deleteTask(index) {
            this.tasks.splice(index, 1);
            saveToLocalStorage('tasks', this.tasks);
        },
        completeTask(index) {
            this.tasks[index].completed = !this.tasks[index].completed;
            saveToLocalStorage('tasks', this.tasks);
        },
        editTask(value, index) {
            if (this.editingTaskIndex !== index) {
                this.inputValue = value;
                this.editingTaskIndex = index;
            } else {
                this.tasks[this.editingTaskIndex].value = this.inputValue;
                this.editingTaskIndex = -1;
                this.inputValue = '';
                saveToLocalStorage('tasks', this.tasks);
            }
        }
    },
    computed: {
        titleClass() {
            return {
                'title': this.inputValue.length <= 10,
                'warning': this.inputValue.length > 10
            }
        },
        filteredTasks() {
            if (this.filterType === 'completed') {
                return this.tasks.filter((task) => task.completed);
            } else if (this.filterType === 'uncompleted') {
                return this.tasks.filter((task) => !task.completed);
            } else {
                return this.tasks;
            }
        },
        taskTitleClass() {
            return this.tasks.reduce((classes, task) => {
                classes[task.id] = {
                    'task-info': true,
                    'completed': task.completed && this.filterType !== 'uncompleted',
                    'not-completed': !task.completed && this.filterType !== 'completed'
                };
                return classes;
            }, {});
        },
        tasksCount() {
            return this.tasks.length;
        },
        completedTasksCount() {
            return this.tasks.filter((task) => task.completed).length;
        },
        activeTasksCount() {
            return this.tasks.filter((task) => !task.completed).length;
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