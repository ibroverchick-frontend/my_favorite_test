import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

export interface PinnedDoc {
  id: string
  name?: string
  description?: string
  image?: string
  [key: string]: any
}

const STORAGE_KEY = 'pinned_document_v1'

export const usePinnedDocumentStore = defineStore('pinnedDocument', () => {
  const pinnedDocument = ref<PinnedDoc | null>(null)
  const hasPinnedDocument = computed(() => pinnedDocument.value !== null)

  function pinDocument(payload: Partial<PinnedDoc>) {
    if (payload?.id == null) return

    pinnedDocument.value = {
      id: String(payload.id),
      name: payload.name,
      description: payload.description,
      image: payload.image
    }
  }

  function unpinDocument() {
    pinnedDocument.value = null
  }

  function saveToStorage(document: PinnedDoc | null) {
    try {
      if (document) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(document))
      } else {
        localStorage.removeItem(STORAGE_KEY)
      }
    } catch (error) {
      console.warn('Не удалось сохранить pinnedDocument в localStorage', error)
    }
  }

  function loadFromStorage() {
    try {
      const storedString = localStorage.getItem(STORAGE_KEY)
      if (!storedString) return

      const storedDoc = JSON.parse(storedString)
      if (storedDoc?.id) pinnedDocument.value = storedDoc as PinnedDoc
    } catch (error) {
      console.warn('Не удалось загрузить pinnedDocument из localStorage', error)
    }
  }

  watch(pinnedDocument, (value) => {
    saveToStorage(value)
  }, { deep: true })

  loadFromStorage()

  return {
    pinnedDocument,
    hasPinnedDocument,
    pinDocument,
    unpinDocument,
    loadFromStorage
  }
})
