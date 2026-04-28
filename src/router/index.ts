import {createRouter, createWebHistory, type RouteRecordInfo} from 'vue-router'
import UsersView from '../views/UsersView.vue'

export interface RouteNamedMap {
    users: RouteRecordInfo<
        'users',
        '/',
        Record<never, never>,
        Record<never, never>,
        never
    >
    user: RouteRecordInfo<
        'user',
        '/users/:id',
        { id: string | number },
        { id: string },
        never
    >
    posts: RouteRecordInfo<
        'posts',
        '/posts',
        Record<never, never>,
        Record<never, never>,
        never
    >
}

declare module 'vue-router' {
    interface TypesConfig {
        RouteNamedMap: RouteNamedMap
    }
}

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'users', component: UsersView },
        { path: '/users/:id', name: 'user', component: UsersView},
        { path: '/posts', name: 'posts', component: UsersView},
    ],
})
export default router
