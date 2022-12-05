<template>
  <article>

    <section v-if="$store.state.currentTitle === ''"
      class="title-section">
      <h2>Add a title to begin a new story!</h2>
      <TitleForm></TitleForm>
    </section>

  <section class="container"
    v-if="$store.state.currentTitle !== ''">
      <div class="top-of-page">
        <TitleForm>
        </TitleForm>
        <h1>Currently editing page {{ currentPage }}</h1>
        <PictureDisplay
          class="picture-display"
          :pageNum="currentPage">
        </PictureDisplay>
      </div>
    <section>
      <SentenceForm
        class="sentence-form"
        :pageNum="currentPage">
      </SentenceForm>
      <button
        class="finish-button button-74"
        @click="finishPage">Save Page
      </button>
    </section>
    <div class="page-component"
      v-if="$store.state.currentTitle !== ''">
        <PageComponent
        v-for="index in Object.keys($store.state.pages).length"
        :key="index"
          :pageNumber="index"
          @boxClicked="getPage"
        />
    </div>
  </section>
</article>
</template>

<script>
/* eslint-disable */
import TitleForm from '@/components/Home/TitleForm.vue'
import SentenceForm from '@/components/Home/SentenceForm.vue'
import PageComponent from '@/components/Page/PageComponent.vue'
import PictureDisplay from '@/components/Home/PictureDisplay.vue'

export default {
    name: 'HomePage',
    components: {TitleForm, SentenceForm, PageComponent, PictureDisplay},
    data() {
      return {
        editing: false,
        currentPage: Object.keys(this.$store.state.pages).length,
        previousSentence: "",
        refreshGenerated: {pageNum: 1, sentence: `This is a story about ${this.$store.state.currentTitle}`},
        alerts: {},
      }
    },
    methods: {
      finishPage() {
        this.$store.commit("editPage", this.currentPage);
        if (this.currentPage === Object.keys(this.$store.state.pages).length) {
          this.$store.commit('createPage');
        }
        this.editing = false;
        this.currentPage = Object.keys(this.$store.state.pages).length
      },
      getPage(value) {
        const page = this.$store.state.pages[value]
        this.currentPage = value;
        this.$store.commit("changeSentence", page.caption);
        this.editing = true;
      }
    }
}
</script>

<style scoped>

.container {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.title-section {
  align-self: center;
}

.sentence-form {
  margin-top: 40px;
} 

.finish-button {
  margin-top: 20px;
}

.top-of-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.picture-display {
  margin-top: 1.5em;
}

.page-component {
  display: flex;
  flex-direction: row;
  width: 1650px;
  height: 400px;
  overflow-x:scroll;
  white-space: nowrap;
  margin-top: 40px;
}

</style>