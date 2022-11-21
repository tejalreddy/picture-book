<template>
    <article>
        <div @click="boxClicked"
        class="page-box">
            <h1 class="box-text">{{ pageNumber }}</h1>
        </div>
    </article>
</template>

<script>
/* eslint-disable */
export default {
    name: 'PageComponent',
    props: {
        // Data from the stored freet
        pageNumber: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            alerts: {}
        }
    },
    methods: {
        boxClicked() {
            this.$emit('boxClicked', this.pageNumber);
        }
    }
}
</script>

<style scoped>
.page-box {
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: .25rem;
    box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
    box-sizing: border-box;
    width: 223px;
    height: 300px;
    overflow-y: auto;
    margin: 1em;
}

.box-text {
    text-align: center;
    margin-top: 2.4em;
    font-size: 50px;
}
</style>
