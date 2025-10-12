<template>
  <div class="document-finder">
    <div class="document-finder__serch">
      <SearchDocuments/>
    </div>
    <div class="document-finder__pinned">
      <PinnedDocument/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SearchDocuments } from '@/features/SearchDocuments'
import { PinnedDocument } from '@/features/PinnedDocument';
</script>

<style lang="scss" scoped>
.document-finder {
  display: grid;
  grid-template-columns: 20% 80%;
  width: 100%;
  height: 100%;
  &__serch{
    border-right: 1px solid $color-barely-border; 
  }
}

</style>
