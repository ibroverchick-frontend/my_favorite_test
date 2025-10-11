// src/app/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// Импорты
import MainLayouts from '@/app/layouts/MainLayouts.vue'
import DocumentsPage from '@/pages/DocumentsPage.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayouts, // layout — "обёртка"
      children: [
        {
          path: '',
          name: 'documents',
          component: DocumentsPage,
        },
      ],
    },
  ],
})
