<template>
  <article class="container">

    <section v-if="$store.state.currentTitle === ''">
      <h2>Add a title to begin a new story!</h2>
      <TitleForm class="title-form">
      </TitleForm>
    </section>

    <div class="page-component"
        v-for="index in Object.keys($store.state.pages).length"
        :key="index">
        <PageComponent
          :pageNumber="index"
          @boxClicked="getPage"
        />
    </div>

    <section class="container-body"
    v-if="$store.state.currentTitle !== ''">
      <div class="top-of-page">
        <TitleForm>
        </TitleForm>
        <h1>Currently editing page {{ currentPage }}</h1>
        <PictureDisplay class="picture-display">
        </PictureDisplay>
      </div>
      <section>
        <div>
          <SentenceForm
            class="sentence-form"
            @generatedSentence="generatedSentence"
            :pageNum="currentPage">
          </SentenceForm>
          <button
            class="finish-button button-74"
            @click="finishPage">Finish Page
          </button>
        </div>
      </section>

    </section>
    <p></p>
    <p></p>
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
      currentPage: this.$store.state.pageCount + 1,
      previousSentence: "",
      refreshGenerated: {pageNum: 1, sentence: `This is a story about ${this.$store.state.currentTitle}`},
      alerts: {},
    }
    },
    methods: {
      finishPage() {
        if (this.editing) {
          this.$store.commit("refreshPages", this.currentPage);
        } else {
          this.$store.commit("refreshPages", -1);
          this.$store.commit("refreshGeneratedSentence", this.refreshGenerated);
        }
        this.editing = false;
        this.currentPage = this.$store.state.pageCount + 1
      },
      getPage(value) {
        const page = this.$store.state.pages[value]
        this.$store.commit("changeSentence", page.caption);
        this.editing = true;
        this.currentPage = value;
      },
      generatedSentence(value) {
        this.refreshGenerated = value;
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

.container-body {
  justify-self:center;
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


</style>