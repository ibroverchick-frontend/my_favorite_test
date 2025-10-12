<template>
  <div class="documents-page">
    <DocumentFinder />
  </div>
</template>

<script setup lang="ts">
import {DocumentFinder} from '@/widgets/DocumentFinder'
</script>

<style lang="scss" scoped>
  .documents-page {
    box-shadow: 0 0 10px 0 #0000001A;
    border-radius: 10px;
  }
</style>
