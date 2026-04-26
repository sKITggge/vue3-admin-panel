import {createApp} from 'vue'
import PrimeVue from 'primevue/config';
import Material from '@primeuix/themes/material';
import App from './App.vue'
import './style.css'

createApp(App)
    .use(PrimeVue, {
        theme: {
            preset: Material
        }
    })
    .mount('#app')
