import { defineStore } from 'pinia'

interface Task {
    id: number,
    text: string,
    done: boolean
}

export const useTaskListStore = defineStore('taskListStore', {
    state: () => ({
        task: '',
        taskList: [] as Task[], 
        hideList: false,
        showDetails: false
    }),
    actions: {
        addTask(id: number) {
            let newTask = {id: id, text: this.task, done: false}
            this.taskList.push(newTask)
            this.task = ''
        },
        removeTask(task: Task) {
            this.taskList = this.taskList.filter(t => t.id !== task.id)
        },
        toggleDone(index: number) {
            let current = this.taskList[index]
            current.done = !current.done
        },
        toggleTaskList() {
            this.hideList = !this.hideList
        },
        toggleDetails() {
            this.showDetails = !this.showDetails
        },
        clearDoneTasks() {
            this.taskList = this.taskList.filter(t => t.done !== true)
        },
    }
})