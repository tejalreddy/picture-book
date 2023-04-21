<template>
<section>
    <section
        v-if="$store.state.apikey != ''"
        class="title-area"
        :key="$store.state.measurementIdFirebase">
        <textarea v-if="editing || $store.state.titleImage == ''"
            class="title-content"
            :value="draft"
            @input="draft = $event.target.value"
        />
        <h1 class="title-font" v-if="!editing && $store.state.titleImage !== ''">
            {{ this.$store.state.currentTitle }}
        </h1>
        <button v-if="!editing && $store.state.titleImage !== ''"
            class="edit-button button-74"
            @click="editTitle">Edit Title Page
        </button>
        <button v-if="editing || $store.state.titleImage == ''"
            class="title-button button-74"
            @click="addTitle">Generate Image
        </button>
    </section>
    <section
        class="title-image"
        v-if="$store.state.apikey != ''"
        >
        <TitleImage
            :currentTitle="draft"
            :generateImage="generateImage"
            @titleEditing="titleEditing"
            v-if="editing || $store.state.titleImage == ''">
        </TitleImage>
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
        <form @submit.prevent ="addApiKey">
            <input
                class="title-content api-content"
                :value="apiDraft"
                type="text"
                @input="apiDraft = $event.target.value"
                maxlength="200"
                placeholder="Enter your OpenAI API key"
                :required="true"
            />
            <input
                class="title-content api-content"
                :value="apiFirebaseDraft"
                type="text"
                @input="apiFirebaseDraft = $event.target.value"
                maxlength="200"
                placeholder="Enter your Firebase API key"
                :required="true"
            />
            <input
                class="title-content api-content"
                :value="authDomainFirebase"
                type="text"
                @input="authDomainFirebase = $event.target.value"
                maxlength="200"
                placeholder="Enter your Firebase Auth Domain"
                :required="true"
            />
            <input
                class="title-content api-content"
                :value="projectIdFirebase"
                type="text"
                @input="projectIdFirebase = $event.target.value"
                maxlength="200"
                placeholder="Enter your Firebase Project ID"
                :required="true"
            />
            <input
                class="title-content api-content"
                :value="storageBucketFirebase"
                type="text"
                @input="storageBucketFirebase = $event.target.value"
                maxlength="200"
                placeholder="Enter your Firebase Storage Bucket"
                :required="true"
            />
            <input
                class="title-content api-content"
                :value="messagingSenderIdFirebase"
                type="text"
                @input="messagingSenderIdFirebase = $event.target.value"
                maxlength="200"
                placeholder="Enter your Firebase Messaging Sender ID"
                :required="true"
            />
            <input
                class="title-content api-content"
                :value="appIdFirebase"
                type="text"
                @input="appIdFirebase = $event.target.value"
                maxlength="200"
                placeholder="Enter your Firebase App ID"
                :required="true"
            />
            <input
                class="title-content api-content"
                :value="measurementIdFirebase"
                type="text"
                @input="measurementIdFirebase = $event.target.value"
                maxlength="200"
                placeholder="Enter your Firebase Measurement ID"
                :required="true"
            />
            <button
                class="title-button button-74 api-button"
                type="submit"
                >Enter in your Api Information
            </button>
        </form>
    </section>
</section>
</template>

<script>
/* eslint-disable */
import TitleImage from '@/components/Page/TitleImage.vue';
import { throws } from 'assert';

export default {
    name: 'TitleForm',
    components: {TitleImage},
    data() {
        return {
            draft: this.$store.state.currentTitle,
            generateImage: 0,
            apiDraft: this.$store.state.apiKey,
            apiFirebaseDraft: this.$store.state.apiKeyFirebase,
            authDomainFirebase: this.$store.state.authDomainFirebase,
            projectIdFirebase: this.$store.state.projectIdFirebase,
            storageBucketFirebase: this.$store.state.storageBucketFirebase,
            messagingSenderIdFirebase: this.$store.state.messagingSenderIdFirebase,
            appIdFirebase: this.$store.state.appIdFirebase,
            measurementIdFirebase: this.$store.state.measurementIdFirebase,
            password: '',
            alerts: {},
            editing: false,
        }
    },
    mounted() {
        if (this.$store.state.userId && !this.$store.state.apikey) {
            this.getEncryptedItems();
        }
    },
    methods: {
        getEncryptedItems() {
            const params = {
                        method: 'POST',
                        message: 'Successfully updated credentials',
                        body: JSON.stringify({
                            username: this.$store.state.userId
                        }),
            };
            this.request(params);
        }, 
        async request(params) {
            const options = {
                method: params.method, headers: 
                {'Content-Type': 'application/json'}
            };
            if (params.body) {
                options.body = params.body;
            }
            
            try {
                const r = await fetch(`https://wall-e.media.mit.edu:3000/login`, options);
                if (!r.ok) {
                    console.log('error thrown');
                    const res = await r.json();
                    throw new Error(res.error);
                }
                
                const res = await r.json();
                if (res.success) {
                    const credential_info = JSON.parse(this.$CryptoJS.AES.decrypt(res.accountInfo, this.$store.state.uniqueId).toString(this.$CryptoJS.enc.Utf8));
                    this.apiDraft = credential_info.apiKey
                    this.apiFirebaseDraft = credential_info.apiKeyFirebase
                    this.authDomainFirebase = credential_info.authDomainFirebase
                    this.projectIdFirebase = credential_info.projectIdFirebase
                    this.storageBucketFirebase = credential_info.storageBucketFirebase
                    this.messagingSenderIdFirebase = credential_info.messagingSenderIdFirebase
                    this.appIdFirebase = credential_info.appIdFirebase
                    this.measurementIdFirebase = credential_info.measurementIdFirebase
                }

            } catch (e) {
                const message = 'There was an error fetching your credentials';
                this.$store.commit('alert', {
                    message: message, status: 'error'
                });
            }
        },
        async updateRequest(params, credential_object) {
            const options = {
                method: params.method, headers: 
                {'Content-Type': 'application/json'}
            };
            if (params.body) {
                options.body = params.body;
            }

            try {
                const r = await fetch(`https://wall-e.media.mit.edu:3000/update-account`, options);
                if (!r.ok) {
                    console.log('error thrown');
                    const res = await r.json();
                    throw new Error(res.error);
                }
                
                const res = await r.json();
                if (res.success) { 
                    this.$store.commit('addApiKey', credential_object);
                }  
            } catch (e) {
                const message = 'There was an error updating your account';
                this.$store.commit('alert', {
                    message: message, status: 'error'
                });
            }
        },
        addTitle() {
            const titleRegex = /^[A-Za-z0-9\s\-_,\.;:()]+$/
            if (titleRegex.test(this.draft) && this.draft.length <= 140) {
                this.$store.commit('changeTitle', this.draft);
                this.generateImage += 1;
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
            this.$emit('titleEditing', true);
        },
        titleEditing() {
            this.editing = false;
            this.$emit('titleEditing', false);
        },
        addApiKey() {
            const apiRegex = /.*/;
            this.apiDraft = this.apiDraft.trim();
            if (apiRegex.test(this.apiDraft)) {
                const credential_object = {
                    apiKey: this.apiDraft, 
                    apiKeyFirebase: this.apiFirebaseDraft.trim(),
                    authDomainFirebase: this.authDomainFirebase.trim(),
                    projectIdFirebase: this.projectIdFirebase.trim(),
                    storageBucketFirebase: this.storageBucketFirebase.trim(),
                    messagingSenderIdFirebase: this.messagingSenderIdFirebase.trim(),
                    appIdFirebase: this.appIdFirebase.trim(),
                    measurementIdFirebase: this.measurementIdFirebase.trim(),
                    password: this.password.trim()
                }
                const params = {
                        method: 'POST',
                        message: 'Successfully generated images',
                        body: JSON.stringify({
                            username: this.$store.state.userId,
                            accountInfo: this.$CryptoJS.AES.encrypt(JSON.stringify(credential_object), this.$store.state.uniqueId).toString()
                        }),
                };
                this.updateRequest(params, credential_object);
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

form {
    display: flex;
    flex-direction: column;
    align-items: center;
}

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