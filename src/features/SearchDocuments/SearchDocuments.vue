<template>
  <div class="search-documents" aria-live="polite">
    <h2 class="search-documents__title">Поиск документа</h2>
    <div class="search-documents__controls">
      <UIInput
        ref="inputRef"
        v-model="name"
        placeholder="Введите ID документа"
        aria-label="Поиск документов по имени"
        @keyup.enter="searchNow"
        :disabled="loading"
      />
    </div>

    <h2 class="search-documents__title">Результаты</h2>

    <div class="search-documents__status-row">
      <div class="search-documents__status-results" v-if="loading" role="status">Загрузка...</div>
      <div class="search-documents__status-error" v-if="error" role="alert">{{ error }}</div>
    </div>

    <div class="search-documents__results">
      <template v-if="docs.length > 0">
        <ul class="search-documents__results-cards">
          <li
            v-for="doc in docs"
            :key="doc.id"
            class="search-documents__results-card-wrapper"
            role="button"
            tabindex="0"
            @click="onCardClick(doc)"
            @keyup.enter="onCardClick(doc)"
          >
            <DocumentCard
              :title="doc.name || 'Без названия'"
              :image="doc.image"
            />
          </li>
        </ul>
      </template>

      <div v-else-if="!loading && !error" class="search-documents__no-results">
        Результатов не найдено.
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onBeforeUnmount, nextTick } from 'vue'
import axios from 'axios'
import { UIInput } from '@/shared/ui'
import { validate, request, normalize } from '@/shared/lib'
import { DocumentCard } from '@/entites/Document/Card'
import { isRequestCanceled } from '@/shared/utils/axiosUtils'
import { getErrorMessage, DEFAULT_FALLBACK_MESSAGE, DEFAULT_FALLBACK_MESSAGE_DOC } from '@/shared/utils/errors'

import { usePinnedDocumentStore } from '@/entites/Document/store/pinnedDocument'

const API_BASE = import.meta.env.VITE_API_BASE
const DOCS_PATH = '/user/docs'
const DEBOUNCE_MS = 1000
const MIN_SEARCH_LENGTH = 3

interface Doc {
  id?: string
  name?: string
  description?: string
  image?: string
  [key: string]: any
}

const name = ref<string>('')
const docs = ref<Doc[]>([])
const loading = ref<boolean>(false)
const error = ref<string | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)

let debounceTimer: number | null = null
let currentAbortController: AbortController | null = null
let lastQueriedTerm = ''

const pinnedStore = usePinnedDocumentStore()

function buildDocsUrl(searchTerm: string): string {
  const url = new URL(API_BASE + DOCS_PATH)
  const trimmedTerm = searchTerm.trim()
  if (trimmedTerm) url.searchParams.set('search', trimmedTerm)
  return url.toString()
}

function normalizeAndValidateDocs(docs: any[]): Doc[] {
  return normalize.normalizeResponse<Doc>(docs).map(doc => {
    const candidate = doc.image
    return {
      ...doc,
      image: validate.isValidImageUrl(candidate) ? candidate : undefined
    }
  })
}

function getErrorMessageDoc(err: any, fallbackMessage = DEFAULT_FALLBACK_MESSAGE): string {
  if (isRequestCanceled(err)) return ''
  return getErrorMessage(err, fallbackMessage)
}

async function fetchDocs(searchTerm: string) {
  currentAbortController = request.abortRequest(currentAbortController)
  const controller = new AbortController()
  currentAbortController = controller

  loading.value = true
  error.value = null

  try {
    const response = await axios.get(buildDocsUrl(searchTerm), {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
      timeout: 15000
    })

    docs.value = normalizeAndValidateDocs(response.data)
  } catch (err: any) {
    const errMsg = getErrorMessageDoc(err, DEFAULT_FALLBACK_MESSAGE_DOC)
    if (errMsg) {
      console.error(err)
      docs.value = []
      error.value = errMsg
    }
  } finally {
    loading.value = false
    currentAbortController = null
  }
}

async function handleSearch(term: string) {
  const trimmedTerm = term.trim()

  if (trimmedTerm === '') {
    docs.value = []
    error.value = null
    lastQueriedTerm = ''
    return
  }

  if (trimmedTerm.length < MIN_SEARCH_LENGTH || trimmedTerm === lastQueriedTerm) return

  await fetchDocs(trimmedTerm)
  lastQueriedTerm = trimmedTerm

  nextTick(() => inputRef.value?.focus())
}

watch(name, (newVal: string) => {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = window.setTimeout(() => {
    handleSearch(newVal)
    debounceTimer = null
  }, DEBOUNCE_MS)
}, { immediate: false })

async function searchNow() {
  if (debounceTimer) {
    clearTimeout(debounceTimer)
    debounceTimer = null
  }
  const term = name.value.trim()
  await fetchDocs(term)
  lastQueriedTerm = term
}

onBeforeUnmount(() => {
  if (debounceTimer) clearTimeout(debounceTimer)
  if (currentAbortController) {
    try { currentAbortController.abort() } catch {}
  }
})

function onCardClick(doc: Doc) {
  if (!doc?.id) return

  pinnedStore.pinDocument({
    id: doc.id,
    name: doc.name,
    description: doc.description,
    image: doc.image
  })

  console.log('📌 Документ закреплён:', pinnedStore.pinnedDocument)
}
</script>

<style lang="scss" scoped>
@mixin status-style($color) {
  display: flex;
  padding-bottom: 16px;
  align-items: center;
  font-size: 14px;
  color: $color;
}

.search-documents {
  display: flex;
  flex-direction: column;
  padding: 20px;
  padding-top: 0;
  &__title {
    font-weight: 600;
    font-size: 16px; 
    padding-top: 25px;
    padding-bottom: 12px;
  }

  &__status-results {
    @include status-style($color-barely-text);
  }

  &__status-error {
    @include status-style($color-danger);
  } 

   &__results {
    padding-top: 10px;
    padding-bottom: 10px;
    max-height: 65vh; 
    overflow-y: auto; 
    padding-right: 12px; 
    margin-right: -8px; 
    scrollbar-gutter: stable; 
  }

    
  &__results-cards {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
  }

  &__results-card-wrapper {
    display: block;
    cursor: pointer;
    outline: none;
  }

  &__results-card-wrapper:focus {
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  }

  &__no-results {
    font-size: 14px;
    padding-bottom: 12px;
    color: $color-barely-text;
  }
}


</style>
