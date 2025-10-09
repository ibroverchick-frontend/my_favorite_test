import { createRouter, createWebHistory } from 'vue-router'

import TestCismPage from '@/pages/TestCismPage.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'TestCism',
      component: TestCismPage,
    },
  ],
})

