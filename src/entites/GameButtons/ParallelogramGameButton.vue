<template>
  <div
    class="parallelogram"
    :style="{
      '--color': color,
      '--angle': `${angle}deg`,
      '--shadow': shadow,
      '--text-color': textColor
    }"
  >
    <div class="parallelogram__content">
      <img v-if="icon" :src="icon" class="parallelogram__icon" alt="icon" />
      <span class="parallelogram__number">{{ number }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    default: ''
  },
  number: {
    type: [String, Number],
    required: true
  },
  color: {
    type: String,
    default: '#1e90ff'
  },
  textColor: {
    type: String,
    default: '#ffffff'
  },
  shadow: {
    type: String,
    default: '0 4px 12px rgba(0, 0, 0, 0.25)'
  },
  angle: {
    type: Number,
    default: -20
  }
});
</script>

<style lang="scss" scoped>
.parallelogram {
  display: inline-block;
  border-radius: 2px;
  user-select: none;
  background-color: var(--color);
  box-shadow: var(--shadow);
  transform: skewX(var(--angle));

  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3px;
    padding: 0px 7px 0 3px;
    font-weight: 700;
    font-family: 'Zen Dots';
    color: var(--text-color);
    transform: skewX(calc(var(--angle) * -1));
  }

  &__icon {
    width: 12px;
    height: 12px;
    display: inline-block;
  }

  &__number {
    font-size: 8px;
  }
}
</style>
