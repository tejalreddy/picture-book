<template>
<section>
    <section
        v-if="$store.state.apikey != ''"
        class="title-area">
        <textarea v-if="editing || $store.state.currentTitle == ''"
            class="title-content"
            :value="draft"
            @input="draft = $event.target.value"
        />
        <h1 class="title-font" v-if="!editing && $store.state.currentTitle !== ''">
            {{ this.$store.state.currentTitle }}
        </h1>
        <button v-if="editing || $store.state.currentTitle == ''"
            class="title-button button-74"
            @click="addTitle">Save Title
        </button>
        <button v-if="!editing && $store.state.currentTitle !== ''"
            class="edit-button button-74"
            @click="editTitle">Edit Title
        </button>
    </section>

    <section
        v-if="$store.state.apikey == ''"
        class="api-area">
        <div>
            <p>
                Visit
                <a href="https://platform.openai.com/account/api-keys">OpenAI</a>
                to obtain your OpenAI Api Key
            </p>
            <p>
                Visit
                <a href="https://console.firebase.google.com/">Google Firebase Storage</a>
                to create your own Firebase Storage
            </p>
        </div>
        <textarea
            class="title-content api-content"
            :value="apiDraft"
            @input="apiDraft = $event.target.value"
            placeholder="Enter your OpenAI API key"
        />
        <textarea
            class="title-content api-content"
            :value="apiFirebaseDraft"
            @input="apiFirebaseDraft = $event.target.value"
            placeholder="Enter your Firebase API key"
        />
        <textarea
            class="title-content api-content"
            :value="authDomainFirebase"
            @input="authDomainFirebase = $event.target.value"
            placeholder="Enter your Firebase Auth Domain"
        />
        <textarea
            class="title-content api-content"
            :value="projectIdFirebase"
            @input="projectIdFirebase = $event.target.value"
            placeholder="Enter your Firebase Project ID"
        />
        <textarea
            class="title-content api-content"
            :value="storageBucketFirebase"
            @input="storageBucketFirebase = $event.target.value"
            placeholder="Enter your Firebase Storage Bucket"
        />
        <textarea
            class="title-content api-content"
            :value="messagingSenderIdFirebase"
            @input="messagingSenderIdFirebase = $event.target.value"
            placeholder="Enter your Firebase Messaging Sender ID"
        />
        <textarea
            class="title-content api-content"
            :value="appIdFirebase"
            @input="appIdFirebase = $event.target.value"
            placeholder="Enter your Firebase App ID"
        />
        <textarea
            class="title-content api-content"
            :value="measurementIdFirebase"
            @input="measurementIdFirebase = $event.target.value"
            placeholder="Enter your Firebase Measurement ID"
        />
        <button
            class="title-button button-74 api-button"
            @click="addApiKey">Enter in your Api Information
        </button>
    </section>
</section>
</template>

<script>
/* eslint-disable */

export default {
    name: 'TitleForm',
    data() {
        return {
            draft: this.$store.state.currentTitle,
            apiDraft: '',
            apiFirebaseDraft: '',
            authDomainFirebase: '',
            projectIdFirebase: '',
            storageBucketFirebase: '',
            messagingSenderIdFirebase: '',
            appIdFirebase: '',
            measurementIdFirebase: '',
            alerts: {},
            editing: false,
        }
    },
    methods: {
        addTitle() {
            const titleRegex = /^[A-Za-z0-9\s\-_,\.;:()]+$/
            if (titleRegex.test(this.draft) && this.draft.length <= 140) {
                this.$store.commit('changeTitle', this.draft);
                this.editing = false;
            } else {
                const message = 'Invalid title inputted';
                this.$store.commit('alert', {
                    message: message, status: 'error'
                });
                return;
            }
        },
        editTitle() {
            this.editing = true;
        },
        addApiKey() {
            // const usernameRegex = /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/;
            const apiRegex = /.*/;
            if (apiRegex.test(this.apiDraft)) {
                this.$store.commit('addApiKey', {apiKey: this.apiDraft, 
                apiKeyFirebase: this.apiFirebaseDraft,
                authDomainFirebase: this.authDomainFirebase,
                projectIdFirebase: this.projectIdFirebase,
                storageBucketFirebase: this.storageBucketFirebase,
                messagingSenderIdFirebase: this.messagingSenderIdFirebase,
                appIdFirebase: this.appIdFirebase,
                measurementIdFirebase: this.measurementIdFirebase});
            } else {
                const message = 'Invalid api key';
                this.$store.commit('alert', {
                    message: message, status: 'error'
                });
                return;
            }
        }
    }
}
</script>

<style scoped>

.title-area {
    display: flex;
    justify-content: center;
    height: 100px;
}
.api-area {
    display: flex;
    flex-direction: column;
    height: 100px;
    align-items: center;
}

.title-button {
    margin-left: 1em;
    line-height: 10px;
    font-size: 15px;
    height: 30px;
    margin-bottom: 3.6em;
}

.api-button {
    line-height: 25px;
}

.edit-button {
    margin-left: 1em;
    line-height: 1px;
    font-size: 15px;
    height: 30px;
    margin-bottom: 3.3em;
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
  margin-bottom: 3.3em;
}

.api-content {
    width: 500px;
    padding: 20px;
    margin-bottom: 2em;
}

.title-font {
    font-size: 30px;
    margin-top: 1px;
}
</style>