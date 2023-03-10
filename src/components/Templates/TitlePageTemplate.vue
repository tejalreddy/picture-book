<template>
    <section class="page">
        <h1 class="title-page">{{ $store.state.currentTitle }}</h1>
    </section>
</template>
<script>
/* eslint-disable */
export default {
    name: 'TitlePageTemplate',
}
</script>
<style scoped>
.page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 15em;
}

.title-page {
    font-size: 50px;
}
</style>