import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Post, PostCreate } from '../lib/types.ts';

export const usePostStore = defineStore('PostStore', () => {
  const posts = ref<Post[]>([]);

  const addPost = (post: PostCreate) => {
    const newId = posts.value.reduce((max, current) => {
      return current.id > max ? current.id : max;
    }, -1);

    posts.value.push({ ...post, id: newId + 1 });
  };

  const removePost = (postId: number) => {
    const postIdx = posts.value.findIndex((post) => post.id === postId);
    if (postIdx !== -1) {
      posts.value.splice(postIdx, 1);
    }
  };

  return {
    posts,
    addPost,
    removePost,
  };
});
