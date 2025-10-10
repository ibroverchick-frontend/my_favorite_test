<!-- <script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script> -->
<script setup lang="ts">
import { ref } from 'vue'
import { UIButton, UIInput } from '@/shared/ui'

const name = ref('')
const handleSubmit = () => {
  alert(`Привет, ${name.value}!`)
}
</script>

<template>
  <div class="p-4 space-y-3">
    <UIInput v-model="name" placeholder="Введите имя" />
    <UIButton variant="standard" >Сохранить</UIButton>
    1
  </div>
</template>

