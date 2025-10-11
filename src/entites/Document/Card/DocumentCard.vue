<template>
  <div class="card">
    <img 
      :src="imageToShow" 
      :alt="title" 
      class="card__image" 
      :style="{ width: computedWidth, height: computedHeight }" 
    />
    <div class="card__main-text">
        <h3 class="card__main-text-title">{{ title }}</h3>
        <div class="card__main-text-doc-size">12 Мб</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import defaultImage from '@/shared/assets/img/default.webp';

interface Props {
  image?: string;
  title: string;
  width?: string; 
  height?: string;
}

const props = defineProps<Props>();

const imageToShow = props.image ?? defaultImage;

const baseWidth = parseInt(props.width ?? '50', 10); 

const computedWidth = `${baseWidth+ 20}px`;
const computedHeight = props.height ?? '50px'; 
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 #0000001A;
  background-color: $color-white;
  transition: transform 0.2s;
  color: $color-standart-text;

  &:hover {
    transform: translateY(-5px);

    .card__main-text {
        background-color: $color-primary;
        color: $color-white;
        border-radius: 0 10px 10px 0;
        transition: background-color 0.3s, color 0.3s;
    }
    .card__main-text-doc-size {
        color: $color-white;
        transition: background-color 0.3s, color 0.3s;
    }
  }

  &__image {
    padding: 10px 0; 
    object-fit: cover;
    box-sizing: content-box; 
    border-right: 1px solid $color-barely-border;
  }

  &__main-text {
    width: 100%;
    padding: 14px 20px;
  }

  &__main-text-title {
    font-size: $standart-font-size;
    font-weight: 600;
  }
  &__main-text-doc-size {
    font-size: $standart-font-size;
    font-weight: 400;
    color: $color-barely-text;
  }
}
</style>
