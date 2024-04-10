<script setup lang="ts">
    import { useUserStore } from '@/stores/UserStore'
    
    const userStore = useUserStore()
</script>
<template>
    <div class="q-pa-md">
        <q-layout view="lHh lpr lFf" >
            <q-header elevated>
                <q-toolbar>
                    <q-toolbar-title class="text-h3">MARS TODO</q-toolbar-title>
                    <q-space />
                    <q-tabs inline-label>
                        <q-route-tab name="home" icon="home" label="Home" to="/" exact/>
                        <q-route-tab name="about" icon="people" label="About" to="/about" exact/>
                        <q-route-tab v-if="!userStore.loggedIn" flat icon="login" label="Login" to="/login"/>
                        <q-btn-dropdown v-else flat icon="account_circle" :label="userStore.users[userStore.currentUser].firstName">
                            <q-list>
                                <q-item v-if="userStore.isAdmin" name="admin" to="/admin">
                                    <q-item-section>Dashboard</q-item-section>
                                </q-item>
                                <q-item v-else name="profile" :to="`/profile/${userStore.currentUser}`">
                                    <q-item-section>Profile</q-item-section>
                                </q-item>
                                <q-item name="home" to="/" @click="userStore.logoutUser(userStore.currentUser)">
                                    <q-item-section>Logout</q-item-section>
                                </q-item>
                            </q-list>
                        </q-btn-dropdown>
                    </q-tabs>
                </q-toolbar>
            </q-header>
            <q-page-container>
                <router-view></router-view>
            </q-page-container>
        </q-layout>
    </div>
</template>