<template>
  <article>

    <section v-if="$store.state.currentTitle === ''"
      class="title-section">
      <h2>Add a title to begin a new story!</h2>
      <TitleForm></TitleForm>
    </section>

    <article class="container">
    <div class="page-component"
        v-if="$store.state.currentTitle !== ''">
      <div
          v-for="index in Object.keys($store.state.pages).length"
          :key="index">
          <PageComponent
            :pageNumber="index"
            @boxClicked="getPage"
          />
      </div>
    </div>

    <section class="container-body"
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
        <div>
          <SentenceForm
            class="sentence-form"
            :pageNum="currentPage">
          </SentenceForm>
          <button
            class="finish-button button-74"
            @click="finishPage">Finish Page
          </button>
        </div>
      </section>

    </section>
    <p v-if="$store.state.currentTitle !== ''"></p>
    <p v-if="$store.state.currentTitle !== ''"></p>
  </article>
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
  align-items: flex-start;
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
  flex-direction: column;
  height: 1000px;
  overflow: scroll;
}

</style>