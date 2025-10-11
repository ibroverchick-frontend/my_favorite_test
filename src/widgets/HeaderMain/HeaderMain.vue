<template>
    <div class="header">
        <div class="header__app-name">MyApp</div>
        <div class="header__user-name">username</div>
    </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &__app-name {
        font-weight: 700;
        font-size: 32px;
    }
}

</style>