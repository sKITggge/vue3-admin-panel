import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import Material from '@primeuix/themes/material';
import App from './App.vue';
import './style.css';
import router from './router';
import ToastService from 'primevue/toastservice';

createApp(App)
  .use(PrimeVue, {
    theme: {
      preset: Material,
      options: {
        darkModeSelector: false,
      },
    },
  })
  .use(router)
  .use(ToastService)
  .mount('#app');
