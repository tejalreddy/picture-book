<template>
  <article>

    <section v-if="$store.state.currentTitle === ''">
      <h2>Add a title to begin a new story!</h2>
      <TitleForm class="title-form">
      </TitleForm>
    </section>

    <section v-if="$store.state.currentTitle !== ''">
      <div class="top-page">
        <TitleForm class="title-form">
        </TitleForm>
        <h1>Currently editing page {{ currentPage }}</h1>
        <PictureDisplay class="picture-display">
        </PictureDisplay>
      </div>
      <section class="test-flex">
        <div class="home">
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
  <div class="page-component"
        v-for="index in Object.keys($store.state.pages).length"
        :key="index">
        <PageComponent
          :pageNumber="index"
          @boxClicked="getPage"
        />
    </div>
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

.test-flex {
  flex-direction: column;
}

.home {
  display:flex;
  justify-content: center;
  align-items: center;
}

/* /* .title-form {
  align-self: flex-start;
} 
*/
.sentence-form {
  position: absolute;
  bottom: 8em;
} 

.finish-button {
  position: absolute;
  bottom: 2em;
}

.top-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.picture-display {
  margin-top: 1.5em;
}

.page-component {
  margin-top: 0px;
}

</style>