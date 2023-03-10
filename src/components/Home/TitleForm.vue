<template>
<section>
    <section
        v-if="$store.state.username != ''"
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
        v-if="$store.state.username == ''"
        class="title-area">
        <textarea
            class="title-content"
            :value="nameDraft"
            @input="nameDraft = $event.target.value"
        />
        <button
            class="title-button button-74"
            @click="addUsername">Enter in username
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
            nameDraft: '',
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
            // const colRef = collection(db, 'users')
            // const dataObj = {
            //     username: $store.state.username,
            //     title: this.draft
            // }
            // firebase document
            // const docSnap = await getDoc(doc(db, this.nameDraft, this.draft))
            // if (docSnap.exists()) {
            //     emit docSnap.data().pages
            // } else {
            //     addDoc(db, this.nameDraft, this.draft)
            // }
        },
        editTitle() {
            this.editing = true;
        },
        addUsername() {
            const usernameRegex = /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/;
            if (usernameRegex.test(this.nameDraft)) {
                this.$store.commit('addUsername', this.nameDraft);
            } else {
                const message = 'Invalid username';
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

.title-button {
    margin-left: 1em;
    line-height: 10px;
    font-size: 15px;
    height: 30px;
    margin-bottom: 3.6em;
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

.title-font {
    font-size: 30px;
    margin-top: 1px;
}
</style>