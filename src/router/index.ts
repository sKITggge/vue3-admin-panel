import { createRouter, createWebHistory } from 'vue-router'
import UsersView from '../views/UsersView.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: UsersView },
        { path: '/users/:id', name: 'users', component: UsersView}
    ],
})
export default router
