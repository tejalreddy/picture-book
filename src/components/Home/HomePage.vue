<template>
  <article>
    <ExportButton
      v-if="($store.state.currentTitle !== '')"
      class="export-button"
      :pageNumber="currentPage">
    </ExportButton>
    <section v-if="$store.state.currentTitle === ''"
      class="title-section">
      <h2
        v-if="$store.state.apikey">
      Welcome to your story!
      </h2>
      <h2 v-if="$store.state.apikey">
        Add a title to begin a new story!
      </h2>
      <h2 v-if="!$store.state.apikey">
        Enter in your API information to begin
      </h2>
      <TitleForm></TitleForm>
      <section
        v-if="$store.state.currentTitle == ''"
        class="disclaimers">
        <h3>By continuing, you agree to the following:</h3>
        <li>The content generated from this site is solely for personal use and may not be used for commercial purposes without proper licensing or permission.</li>
        <li>You are responsible for ensuring that any generated content does not infringe on any intellectual property rights, including but not limited to copyright, trademarks, and publicity rights.</li>
        <li>You are aware that this tool may produce content that is not appropriate for all ages, and you are solely responsible for determining the appropriateness of the content for their audience.</li>
        <li>The tool may produce content that contains errors, inaccuracies, or omissions, and you assume all risk associated with using the tool and the resulting content.</li>
        <li>The developer of the tool assumes no liability for any damages arising from the use of the tool or the resulting content, including but not limited to direct, indirect, incidental, and consequential damages.</li>
      </section>
    </section>
  <section class="container"
    v-if="$store.state.currentTitle !== ''">
      <div class="top-of-page">
        <TitleForm>
        </TitleForm>
        <h1>Currently editing page {{ currentPage }}</h1>
        <PictureDisplay
          class="picture-display"
          :pageNum="currentPage"
          :changeCount="changeCount">
        </PictureDisplay>
      </div>
    <section>
      <SentenceForm
        class="sentence-form"
        :pageNum="currentPage"
        @sentenceEdited="sendNotificationToGeneration">
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
          :active="(index === currentPage ? true : false)"
          :selectedImage="$store.state.pages[index].selectedImage"
          @boxClicked="getPage"
          @pageDeleted="pageDeleted"
        />
    </div>
  </section>
  <section class="alerts">
      <article
            v-for="(status, alert, index) in $store.state.alerts"
            :key="index"
            :class="status"
        >
            <p>{{ alert }}</p>
        </article>
    </section>
</article>
</template>

<script>
/* eslint-disable */
import TitleForm from '@/components/Home/TitleForm.vue'
import SentenceForm from '@/components/Home/SentenceForm.vue'
import PageComponent from '@/components/Page/PageComponent.vue'
import PictureDisplay from '@/components/Home/PictureDisplay.vue'
import ExportButton from '@/components/Home/ExportButton.vue'

export default {
    name: 'HomePage',
    components: {TitleForm, SentenceForm, PageComponent, PictureDisplay, ExportButton},
    data() {
      return {
        editing: false,
        currentPage: Object.keys(this.$store.state.pages).length,
        previousSentence: "",
        refreshGenerated: {pageNum: 1, sentence: `This is a story about ${this.$store.state.currentTitle}`},
        changeCount: 0,
      }
    },
    methods: {
      finishPage() {
        if (!(this.$store.state.pages[this.currentPage].selectedImage > -1)) {
          const message = 'No image has been selected';
          this.$store.commit('alert', {
              message: message, status: 'error'
          });
          return;
        }
        this.$store.commit("editPage", this.currentPage);
        if (this.currentPage === Object.keys(this.$store.state.pages).length) {
          this.$store.commit('createPage');
        }
        this.editing = false;
        this.currentPage = Object.keys(this.$store.state.pages).length
        const message = 'Page has been successfully saved.'
        this.$store.commit('alert', {
                    message: message, status: 'success'
        });
      },
      getPage(value) {
        const page = this.$store.state.pages[value]
        this.currentPage = value;
        this.$store.commit('changeSentence', {pageNum: this.currentPage, sentence: page.caption});
        this.editing = true;
      },
      sendNotificationToGeneration(value) {
        this.changeCount += 1;
      },
      pageDeleted(value) {
        let maxPageNum = Object.keys(this.$store.state.pages).length;
        if (!(maxPageNum in this.$store.state.pages)) {
          maxPageNum = maxPageNum - 1;
        }
        this.getPage(maxPageNum);
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
  /* align-items: center; */
  justify-content: center;
  /* display: flex; */
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

.export-button {
  float:right;
  margin-right: 40px;
}

.disclaimers {
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
    height: 100%;
    text-align: center;
    align-self: center;
}
</style>