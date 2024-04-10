<script setup lang="ts">
    import { useUserStore } from '@/stores/UserStore';

    const userStore = useUserStore()
</script>
<template>
    <div class="column items-center q-pa-md">
        <div class=" text-h1">Welcome to the MARS Todo App!</div>
        <div class="q-mt-xl">
            <p class="text-h5 q-mt-xl">
                You can use this app to create and track tasks that you want to complete. 
            </p>
            <p class="text-h5 q-mt-xl">
                Login or signup for additional functionality like: user settings, task grouping, and saving tasks.
            </p>
            <p class="text-h5 q-mt-xl text-center">
                <b>Current amount of users: {{ userStore.users.length }}</b>
            </p>
        </div>
    </div>
</template>