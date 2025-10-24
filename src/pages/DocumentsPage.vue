<template>
  <div class="documents-page">

   <ParallelogramGameButton
    :icon="lightningIcon"
    :number="'1 000'"
    color="#FFE501"
    textColor="#000"
    shadow="0"
    :angle ="-8"
  />
    <DocumentFinder />
  </div>
</template>

<script setup lang="ts">
import {DocumentFinder} from '@/widgets/DocumentFinder'
import {ParallelogramGameButton } from '@/entites/GameButtons'
import lightningIcon from '@/shared/assets/icon/lightning.svg';
</script>

<style lang="scss" scoped>
  .documents-page {
    box-shadow: 0 0 10px 0 #0000001A;
    border-radius: 10px;
  }
</style>
