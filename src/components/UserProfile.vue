<script setup lang="ts">
    import { ref } from 'vue'
    import { useUserStore } from '@/stores/UserStore'
    import { useRoute } from 'vue-router'

    const userStore = useUserStore()
    const route = useRoute()
    const user = userStore.users[userStore.currentUser]
</script>
<template>
    <div v-if="userStore.loggedIn && (Number(route.params.id) === userStore.currentUser)">
        <div class="text-h3 text-center">Welcome {{ userStore.users[Number(route.params.id)].firstName }}</div>
        <div class="text-h6 q-mt-xl text-center">
            <div>
                First Name: {{ user.firstName }}
            </div>
            <div>
                Last Name: {{ user.lastName }}
            </div>
            <div>
                Email: {{ user.email }}
            </div>
            <div>
                Date of Birth: {{ user.dob }}
            </div>
        </div>
    </div>
    <div v-else>
        Please login in first.
    </div>
</template>