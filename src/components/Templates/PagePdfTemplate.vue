<template>
    <section class="page">
        <div
            class="picture-box"
            v-if="(selectedImage > -1)">
            <img
            class="picture-box regular-image"
            :src="'data:image/jpeg;base64,' + $store.state.pages[pageNumber].allImages[$store.state.pages[pageNumber].selectedImage]"/>
        </div>
        <h1 class="box-text">
            {{ $store.state.pages[pageNumber].caption }}
        </h1>
    </section>
</template>

<script>
/* eslint-disable */
export default {
    name: 'PagePdfTemplate',
    props: {
        pageNumber: {
            type: Number,
            required: true
        },
        selectedImage: {
            type: Number,
            required: true
        }
    }
}
</script>

<style scoped>
.picture-box {
    width: 400px;
    height: 400px;
    background-color: lightgray;
}

.box-text {
    text-align: center;
    margin-top: 10em;
    font-size: 16px;
    white-space:normal;
    word-wrap:break-word;
}

.regular-image {
    object-fit: cover;
}

.page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 15em;
}
</style>