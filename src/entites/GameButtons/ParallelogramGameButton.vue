<template>
  <div
    class="parallelogram"
    :style="{
      backgroundColor: color,
      transform: `skewX(${angle}deg)`,
      boxShadow: shadow
    }"
  >
    <div
      class="parallelogram__content"
      :style="{
        transform: `skewX(${-angle}deg)`,
        color: textColor
      }"
    >
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

<style scoped>
.parallelogram {
  display: inline-block;
  border-radius: 2px;
  overflow: visible;
  user-select: none;
}

.parallelogram__content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  padding: 0px 3px;
  padding-right: 7px;
  font-weight: 700;
  font-family: 'Zen Dots';
}

.parallelogram__icon {
  width: 12px;
  height: 12px;
  display: inline-block;
}

.parallelogram__number {
  font-size: 8px;
}
</style>
