import { createRouter, createWebHistory, type RouteRecordInfo } from 'vue-router';
import UsersView from '../views/UsersView.vue';
import UserView from '../views/UserView.vue';
import PostsView from '../views/PostsView.vue';

export interface RouteNamedMap {
  users: RouteRecordInfo<'users', '/', Record<never, never>, Record<never, never>, never>;
  user: RouteRecordInfo<'user', '/users/:id', { id: string | number }, { id: string }, never>;
  posts: RouteRecordInfo<'posts', '/posts', Record<never, never>, Record<never, never>, never>;
  post: RouteRecordInfo<'post', '/posts/:id', { id: string | number }, { id: string }, never>;
}

declare module 'vue-router' {
  interface TypesConfig {
    RouteNamedMap: RouteNamedMap;
  }
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'users', component: UsersView },
    { path: '/users/:id', name: 'user', component: UserView },
    { path: '/posts', name: 'posts', component: PostsView },
    { path: '/posts/:id', name: 'post', component: PostsView },
  ],
});
export default router;
