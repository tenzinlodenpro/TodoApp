import { createRouter, createWebHistory } from 'vue-router'
import TodoLayout from '../components/TodoLayout.vue'
import TaskInput from '@/components/TaskInput.vue'
import About from '../components/TodoAbout.vue'
import Login from '../components/TodoLogin.vue'
import Signup from '../components/TodoSignup.vue'
import NotFound from '@/components/NotFound.vue'
import Profile from '../components/UserProfile.vue'
import Admin from '@/components/AdminProfile.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/', name: 'home', component: TodoLayout, children: [
            { path: '', name: 'tasklist', component: TaskInput },
            { path: '/about', name: 'about', component: About },
            { path: '/login', name: 'login', component: Login},
            { path: '/signup', name: 'signup', component: Signup},
            { path: '/profile/:id', name: 'profile', component: Profile },
            { path: '/admin', name: 'admin', component: Admin},
        ] },
        { path: '/:path(.*)*', name: 'NotFound', component: NotFound }
    ]
  })
  
  
  export default router