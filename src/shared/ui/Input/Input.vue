<template>
 <input
  ref="inputElement"
  :type="props.type || 'text'"
  :value="inputValue"
  :placeholder="props.placeholder"
  :disabled="props.disabled"
  class="base-input"
  @input="onInputChange"
/>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue'

import { defineExpose } from 'vue'

defineExpose({
  focus: () => {
    inputElement.value?.focus()
  }
})

const inputElement = ref<HTMLInputElement | null>(null)

const props = defineProps<{
  modelValue: string
  placeholder?: string
  type?: string
  disabled?: boolean
}>()


const emit = defineEmits<{
  (eventName: 'update:modelValue', value: string): void
}>()


const inputValue = ref(props.modelValue)


watch(
  () => props.modelValue,
  (newValue) => {
    inputValue.value = newValue
  }
)

const onInputChange = (inputEvent: Event) => {
  const newValue = (inputEvent.target as HTMLInputElement).value
  inputValue.value = newValue
  emit('update:modelValue', newValue)
}
</script>

<style lang="scss" scoped>
.base-input {
  width: 100%;
  padding: 16px 20px;       
  border: 1.5px solid $color-barely-border;
  border-radius: 8px;      
  font-size: $standart-font-size; 
  font-weight: 400;       
  color: $color-standart-text;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    border: 1.5px solid $color-primary;
    box-shadow: 0 0 0 2px $color-primary-box-shadow;
  }

  &::placeholder {
    color: $color-barely-text;
  }

  &:disabled {
    background-color: #f3f4f6;
    color: #9ca3af;
    cursor: not-allowed;
  }
}
</style>
