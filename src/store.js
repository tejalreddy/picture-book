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
      singlePage: { // represents a single page
        picture: "", 
        caption: "", 
        previousSentence: "", 
        generatedSentence: ""
      },
      pageCount: 0, // current number of pages being held
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
           */
          state.currentSentence = payload;
        },
        refreshPages(state, payload) {
          /**
           * Adds a page to the current pages
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

          } else {
            state.pageCount = state.pageCount + 1;

            if (state.pageCount - 1 >= 1) {
              previousSentence = state.pages[state.pageCount - 1].caption;
            }

            const page = new Page();
            page.caption = state.currentSentence;
            page.previousSentence = previousSentence;
            state.pages[state.pageCount] = page;
          }

          state.currentSentence = "";
        },
        refreshGeneratedSentence(state, payload) {
          /**
           * Stores the generated sentence for a given page
           * payload = {pageNum: int, sentence: string}
           */
          state.pages[payload.pageNum].generatedSentence = payload.sentence;
        }
    },
    plugins: [createPersistedState({storage: window.sessionStorage})]
});

export default store;