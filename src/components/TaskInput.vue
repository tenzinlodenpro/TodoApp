<script setup lang="ts">
    import { useTaskListStore } from '@/stores/TaskListStore'
    import { ref } from 'vue'
    let id = 0
    const tasks = useTaskListStore()
    const check = ref(true)

    const inputRule = (val: string) => (val !== '') || 'Field can not be empty'

</script>
<template>
    <div class="row justify-center items-start">
        <q-card style="width: 750px" square flat bordered>
            <q-card-section>
                <h2 class="text-center">Tasks</h2>
            </q-card-section>
            <q-card-actions>
                <q-btn color="primary" label="Hide Tasks" @click="tasks.toggleTaskList">
                    <q-tooltip class="bg-accent">Hide tasks in task list.</q-tooltip>
                </q-btn>
                <q-btn color="orange" @click="tasks.toggleDetails">
                    {{tasks.showDetails? "Hide Details":"Show Details"}}
                    <q-tooltip class="bg-accent">Toggle details about task list.</q-tooltip>
                </q-btn>
                <q-btn color="purple" label="Clear Done" @click="tasks.clearDoneTasks">
                    <q-tooltip class="bg-accent">Remove all tasks marked as done.</q-tooltip>
                </q-btn>
            </q-card-actions>
            <q-separator></q-separator>
            <q-card-section>
                <q-form @submit.prevent="tasks.addTask(++id)">
                    <q-input 
                        v-model="tasks.task" 
                        label="Enter Task" 
                        clearable 
                        fillable
                        :rules="[inputRule]"
                        lazy-loading
                        >
                        <template v-slot:append>
                            <q-btn icon="add" @click="tasks.addTask(++id)" flat/>
                        </template> 
                    </q-input>
                </q-form>
                <q-list v-if="!tasks.hideList" class="col items-center" separator>
                    <q-item 
                        v-for="(task, i) in tasks.taskList" 
                        :key="task.id" 
                        class="q-pa-lg"
                    >
                        <span class="row justify-between items-center">
                            <span class="row items-center">
                                <q-item-label v-if="!tasks.showDetails" class="text-h5" style="display: inline-block; padding-right: 8px;">
                                    <div :class="{done: task.done}">{{ task.text }}</div>
                                </q-item-label>
                                <q-item-label v-else style="display: inline-block; padding-right: 8px;"> 
                                    id: {{ task.id }}, task: {{ task.text }}, done: {{ task.done }}
                                </q-item-label>
                                <q-popup-edit v-model="task.text" v-slot="scope">
                                    <q-input v-model="scope.value" @keyup.enter="scope.set" dense>
                                    </q-input>
                                </q-popup-edit>
                                <q-btn type="button" icon="edit" autofocus flat rounded ></q-btn>
                                <q-checkbox v-model="task.done"></q-checkbox>
                                <q-btn @click="tasks.removeTask(task)" icon="delete" flat rounded/>
                            </span>
                        </span>
                    </q-item>
                </q-list>
                <h3 v-else>List Hidden</h3>
                <q-card></q-card>
            </q-card-section>
        </q-card>
    </div>
</template>

<style>
    .done{
        text-decoration: line-through;
    }
</style>