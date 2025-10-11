<template>
    <div class="main-layouts">
        <HeaderMain />
        <router-view />
    </div>
</template>

<script setup lang="ts">
    import { HeaderMain } from '@/widgets';
</script>

<style lang="scss" scoped>
    .main-layouts {
        margin-bottom: 35px;
    }
</style>