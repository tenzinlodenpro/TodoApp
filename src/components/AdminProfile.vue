<script setup lang="ts">
    import { ref } from 'vue'
    import { useUserStore, type User } from '@/stores/UserStore'
    import { type QTableColumn } from 'quasar'

    const userStore = useUserStore()

    //q-table info
    const columns: QTableColumn<User>[] = [
        { name: 'id', field: 'id', required: true, label: 'ID', sortable: true, align: 'left' },
        { name: 'firstName', field: 'firstName', required: true, label: 'First Name', sortable: true, align: 'left' },
        { name: 'lastName', field: 'lastName', required: true, label: 'Last Name', sortable: true, align: 'left' },
        { name: 'email', field: 'email', required: true, label: 'Email', sortable: true, align: 'left' },
        { name: 'dob', field: 'dob', required: true, label: 'D.O.B', sortable: true, align: 'left' },
    ]
    const rows = userStore.users
    console.log(rows)

    const pwdColumns = [
        { name: 'id', field: 'id', required: true, label: 'ID', sortable: true, align: 'left' },
        { name: 'password', field: 'password', required: true, label: 'Password', sortable: true, align: 'left' },
    ]
    const pwdRows = Array.from(userStore.passwords, ([id, password]) => ({id, password}))
    console.log(pwdRows)

    //refs
    const userLookup = ref(-1)


</script>
<template>
    <div v-if="userStore.loggedIn && userStore.isAdmin">
        <div class="row justify-center text-h2" style="margin-top: -16px;">Welcome Admin</div>
        <div class="q-pa-md q-mt-lg">
            <q-table
                title="User Database"
                :rows="rows"
                :columns="columns"
                row-key="name"
            />    
        </div>
        <q-separator class="q-mt-xl"></q-separator>
        <div class="q-pa-md q-mt-lg">
            <q-table
                title="Password Database"
                :rows="pwdRows"
                :columns="pwdColumns"
                row-key="name"
            />
        </div>
    </div>
    <div v-else>
        Please login in first.
    </div>
</template>