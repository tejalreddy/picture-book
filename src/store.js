/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import Page from './Page';

Vue.use(Vuex);

/**
 * Storage for data that needs to be accessed from various components.
 * 
 * https://www.mikestreety.co.uk/blog/vue-js-using-localstorage-with-the-vuex-store/
 */
 const store = new Vuex.Store({
    state: {
      currentTitle: "", // the current title for the page being worked on
      pages: {}, // holds all of the pages currently made
      currentSentence: "", // the current sentence being worked on
      alerts: {}, // global success/error messages encountered during submissions to non-visible forms
    },
    mutations: {
        alert(state, payload) {
            /**
             * Add a new message to the global alerts.
             */
            Vue.set(state.alerts, payload.message, payload.status);
            setTimeout(() => {
              Vue.delete(state.alerts, payload.message);
            }, 3000);
        },
        changeTitle(state, payload) {
            /**
             * Change current title for the page being worked on
             */
            state.currentTitle = payload;
        },
        changeSentence(state, payload) {
          /**
           * Change current title for the page being worked on
           * payload: {pageNum: number, sentence: string}
           */
          state.currentSentence = payload.sentence;
          if (payload.sentence) {
            state.pages[payload.pageNum].caption = payload.sentence;
          }
        },
        editPage(state, payload) {
          /**
           * Edits a page that already exists
           */
          let previousSentence = `This is a story about ${state.currentTitle}`;
          if (payload in state.pages) {

            // if there is a previous sentence 
            if (payload - 1 >= 1) {
              previousSentence = state.pages[payload - 1].caption;
            }

            const page = state.pages[payload];
            page.caption = state.currentSentence;
            page.previousSentence = previousSentence;
            state.pages[payload] = page;
            state.currentSentence =  state.pages[Object.keys(state.pages).length].currentSentence ? state.pages[Object.keys(state.pages).length].currentSentence : '';
          }
        },
        createPage(state) {
          /**
           * Adds a new page
           */
          let previousSentence = `This is a story about ${state.currentTitle}`;
          if (Object.keys(state.pages).length - 1 >= 1) {
            previousSentence = state.pages[Object.keys(state.pages).length - 1].caption;
          }
          const page = new Page();
          page.caption = '';
          page.previousSentence = '';
          state.pages[Object.keys(state.pages).length + 1] = page;
          state.currentSentence = '';
        },

        refreshGeneratedSentence(state, payload) {
          /**
           * Stores the generated sentence for a given page
           * payload = {pageNum: int, sentence: []}
           */
          state.pages[payload.pageNum].generatedSentences = payload.sentences;
        },
        refreshGeneratedImages(state, payload) {
          /**
           * Stores all the generated images for a page
           * payload = {pageNum: int, images: []}
           */
           state.pages[payload.pageNum].allImages = payload.images;
        },
        refreshSelectedImage(state, payload) {
          /**
           * Holds the selected image for a page
           * payload = {pageNum: int, image: number}
           */
           state.pages[payload.pageNum].selectedImage = payload.image;
        }
    },
    plugins: [createPersistedState({storage: window.sessionStorage})]
});

export default store;