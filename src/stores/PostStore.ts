import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Post } from '../lib/types.ts';

export const usePostStore = defineStore('PostStore', () => {
  const posts = ref<Post[]>([]);

  const addPost = (post: Partial<Post>) => {
    const newId = posts.value.reduce((max, current) => {
      return current.id > max ? current.id : max;
    }, -1);

    posts.value.push({ ...post, id: newId + 1 } as Post);
  };

  const removePost = (postId: number) => {
    const postIdx = posts.value.findIndex((post) => post.id === postId);
    posts.value.splice(postIdx, 1);
  };

  return {
    posts,
    addPost,
    removePost,
  };
});
