<template>
  <button
    :class="[
      'base-btn',
      `base-btn--${variant}`,
      { 'is-disabled': disabled }
    ]"
    :disabled="disabled"
    @click="onButtonClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  variant?: 'standard' | 'delete'
  disabled?: boolean
}>()


const emit = defineEmits<{
  (eventName: 'click', mouseEvent: MouseEvent): void
}>()

const onButtonClick = (mouseEvent: MouseEvent) => {
  if (!props.disabled) {
    emit('click', mouseEvent)
  }
}
</script>

<style lang="scss" scoped>

.base-btn {
  padding: 7px 28px;
  border-radius: 8px;
  font-weight: 500;
  font-size: $standart-font-size;
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
  cursor: pointer;
  border: 1px solid transparent;
  background-color: transparent;

  &.is-disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  &--standard {
    color: $color-primary;
    border-color: $color-primary;
    font-weight: 400;

    &:hover {
      background-color: $color-primary;
      color: $color-inverse;
    }
  }

  &--delete {
    color: $color-danger;
    border-color: $color-danger;
    font-weight: 400;

    &:hover {
      background-color: $color-danger;
      color: $color-inverse;
    }
  }
}
</style>
