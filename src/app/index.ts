import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { router } from '@/app/providers' 

import '@/shared/assets/main.css';

export function bootstrap() {
  const app = createApp(App);

  app.use(createPinia());
  app.use(router);

  app.mount('#app');
}