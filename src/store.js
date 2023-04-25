/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import Page from './Page';
import { ref, uploadString, getDownloadURL } from 'firebase/storage'
import imagesRef from './firebase/init';

Vue.use(Vuex);

/**
 * Storage for data that needs to be accessed from various components.
 * 
 * https://www.mikestreety.co.uk/blog/vue-js-using-localstorage-with-the-vuex-store/
 */
 const store = new Vuex.Store({
    state: {
      userId: "",
      uniqueId: "",
      apikey: "",
      apiKeyFirebase: "",
      authDomainFirebase: "",
      projectIdFirebase: "",
      storageBucketFirebase: "",
      messagingSenderIdFirebase: "",
      appIdFirebase: "",
      measurementIdFirebase: "",
      password: "",
      currentTitle: "", // the current title for the page being worked on
      titleImage: "", // the image on the title page
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
        addApiKey(state, payload) {
            /**
             * Add a api key for the user editing the story
             * payload: {apiKey: string
             *           apiKeyFirebase: string
             *           authDomainFirebase: string
             *           projectIdFirebase: string
             *           storageBucketFirebase: string
             *           messagingSenderIdFirebase: string
             *           appIdFirebase: string
             *           measurementIdFirebase: string}
             */
            state.apikey = payload.apiKey;
            state.apiKeyFirebase = payload.apiKeyFirebase;
            state.authDomainFirebase = payload.authDomainFirebase;
            state.projectIdFirebase = payload.projectIdFirebase;
            state.storageBucketFirebase = payload.storageBucketFirebase;
            state.messagingSenderIdFirebase = payload.messagingSenderIdFirebase;
            state.appIdFirebase = payload.appIdFirebase;
            state.measurementIdFirebase = payload.measurementIdFirebase;
            state.password = payload.password;
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
        deletePage(state, payload) {
          /**
           * Deletes contents of a page based on the specified page number
           * payload = {pageNumber: int}
           */
          delete state.pages[payload.pageNumber];
          let newPages = {}
          for (const [key, value] of Object.entries(state.pages)) {
            if (key > payload.pageNumber) {
              newPages[key - 1] = value;
            } else {
              newPages[key] = value;
            }
          }
          state.pages = newPages;

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
           * payload = {pageNum: int, images: [], imagesref: StorageReference}
           */

          let images = [];
          let count = 1;
          for (let currentImage of payload.images) {
            const storageId = new Date().getTime().toString();
            // currentImage = currentImage.substr(currentImage.indexOf(",") + 1);
            let newestRef = ref(payload.imagesRef, storageId);
            newestRef = ref(newestRef, count.toString());
            count += 1;
            uploadString(newestRef, currentImage, "base64").then(async (snapshot) => {
              images.push(await getDownloadURL(snapshot.ref));
            })

            state.pages[payload.pageNum].allImages = images;
          }
        },
        refreshTitleImage(state, payload) {
          /**
           * Stores the title page image
           */
          state.titleImage = payload;
        },
        refreshSelectedImage(state, payload) {
          /**
           * Holds the selected image for a page
           * payload = {pageNum: int, image: number}
           */
           state.pages[payload.pageNum].selectedImage = payload.image;
        },
        updateUserId(state, payload) {
          state.userId = payload;
        },
        updateUniqueId(state, payload) {
          state.uniqueId = payload;
        }
    },
    plugins: [createPersistedState({storage: window.sessionStorage})]
});

export default store;