import './assets/main.css'


import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { createApp } from 'vue'

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import ToastService from 'primevue/toastservice';

const app = createApp(App)
app.use(ToastService)

app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            cssLayer: {
                name: 'primevue',
                order: 'tailwind-base, primevue, tailwind-utilities'
            }
        }
    }
 });
 
app.use(createPinia())
app.use(router);

app.mount('#app')
