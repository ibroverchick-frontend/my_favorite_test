<template>
  <div v-if="hasPinnedDocument" class="pinned-document">
    <img
      :src="pinnedDocument?.image || defaultImage"
      alt="pinned-document-img"
      class="pinned-document__img"
    />

    <div class="pinned-document__main">
      <h2 class="pinned-document__main-title">
        {{ pinnedDocument?.name }}
      </h2>

      <div class="pinned-document__main-panel-controls">
        <UIButton variant="standard" @click="downloadDocument">
          Скачать
        </UIButton>
        <UIButton variant="delete" @click="unpinDocument">
          Удалить
        </UIButton>
      </div>

      <div class="pinned-document__main-description">
        <h2 class="pinned-document__main-description-title">Описание:</h2>
        <div class="pinned-document__main-description-text">
          {{ pinnedDocument?.description || 'Нет описания' }}
        </div>
      </div>
    </div>
  </div>

  <div v-else class="pinned-document__empty">
    Нет прикреплённого документа
  </div>
</template>

<script setup lang="ts">
import { UIButton } from '@/shared/ui'
import { usePinnedDocumentStore } from '@/entites/Document/store/pinnedDocument'
import { storeToRefs } from 'pinia'
import defaultImage from '@/shared/assets/img/default.webp'

const store = usePinnedDocumentStore()
const { pinnedDocument, hasPinnedDocument } = storeToRefs(store)
const { unpinDocument } = store

const downloadDocument = () => {
  if (!pinnedDocument.value) return

  const content = pinnedDocument.value.description || 'Нет описания'
  const filename = pinnedDocument.value.name + '.txt'

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  URL.revokeObjectURL(url)
}
</script>


<style lang="scss" scoped>
.pinned-document {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6.5%;
  padding: 25px;
  

  &__img {
    width: 100%;
    height: 100%;
    object-fit:cover;
  }
  &__main-title {
    padding-bottom: 15px;
  }
  &__main-panel-controls {
    display: flex;
    gap: 4%;
    padding-bottom: 50px;
  }
  &__main-description-title {
    padding-bottom: 15px;
  }
  &__main-description-text {
      color: $color-barely-text;
  }
  &__empty {
    color: #888;
    width: 100%;
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

@media (max-width: 1300px) {
  .pinned-document {
    &__empty {
        border-top: $color-barely-border 1px solid;
        height: 45vh;
    }
  }
}

@media (max-width: 900px) {
  .pinned-document {
    display: block;
    &__main-title {
        padding-top: 15px;
        text-align: center;
    }
    &__main-panel-controls {
        justify-content: center;
        padding-bottom: 20px;
    }
    &__main-description {
        text-align: center;
    }
  }
}

@media (max-width: 340px) {
  .pinned-document {
    &__empty {
        height: 20vh;
        font-size: 12px;
    }
  }
}



</style>
