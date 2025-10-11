<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
import { UIButton, UIInput } from '@/shared/ui'
import { Card } from '@/entities/Card'

const name = ref('')
const handleSubmit = () => {
  alert(`Привет, ${name.value}!`)
}
</script>

<template>
  <div class="p-4 space-y-3">
    <RouterView />

    <UIInput v-model="name" placeholder="Введите имя" />
    <UIButton variant="standard" @click="handleSubmit">Сохранить</UIButton>

    <Card title="Пример карточки" />
  </div>
</template>
