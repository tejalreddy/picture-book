<template>
<section class="title-area">
    <textarea
        class="title-content"
        :value="draft"
        @input="draft = $event.target.value"
    />
    <button
    class="title-button button-74"
    @click="addTitle">Save Title</button>
</section>
</template>

<script>
/* eslint-disable */
export default {
    name: 'TitleForm',
    data() {
        return {
            draft: this.$store.state.currentTitle,
            alerts: {}
        }
    },
    methods: {
        addTitle() {
            this.$store.commit('changeTitle', this.draft);
        }
    }
}
</script>

<style scoped>

.title-area {
    display: flex;
    justify-content: center;
}

.title-button {
    margin-left: 1em;
    line-height: 2px;
    font-size: 15px;
}

.title-content {
  width: 300px;
  height:50px;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  font-size: 16px;
  resize: none;
}
</style>