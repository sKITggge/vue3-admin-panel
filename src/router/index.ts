import { createRouter, createWebHistory } from 'vue-router'
import UsersView from '../views/UsersView.vue'
import UserView from '../views/UserView.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'users', component: UsersView },
        { path: '/users/:id', name: 'user', component: UserView}
    ],
})
export default router
