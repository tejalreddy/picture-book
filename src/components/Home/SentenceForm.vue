<template>
<section>
    <section class="title-area">
        <textarea
            class="sentence-content"
            :value="draft"
            @input="draft = $event.target.value"
        />
        <button class="sentence-button button-74"
        @click="addSentence">Enter Sentence</button>
    </section>
    <section>
        <p>Suggested sentences:</p>
        <p v-for="(item, index) in sentences"
            :key="index">
            {{ item }}
        </p>
    </section>
</section>
</template>

<script>
/* eslint-disable */
export default {
    name: 'SentenceForm',
    data() {
        return {
            draft: this.$store.state.currentSentence,
            alerts: {},
            constantPre: `This is a story about ${this.$store.state.currentTitle}. Write one more sentence of the story. The following is the most recent sentence of the story: `,
            sentences: ['This is the first page of the story, so there is no suggested sentence.'],
            previousSentence: `This is a story about ${this.$store.state.currentTitle}`
        }
    },
    props: {
        // the published sentence from the previous page
        pageNum: {
            type: Number,
            required: false
        }
    },
    watch: {
        '$store.state.pageCount': function() {
            this.draft = "";
        },
        '$store.state.currentSentence': function() {
            this.draft = this.$store.state.currentSentence;
        },
        pageNum(val) {
            // if the suggested sentence has not been generated
            if (val !== 1 && this.$store.state.pages[val].generatedSentences.length === 0) {
                this.previousSentence = this.$store.state.pages[val - 1].caption
                this.previousSentence = this.constantPre + this.previousSentence;
                this.generateSentence();
            
            // if the sentence has already been generated
            } else {
                if (val === 1) {
                    this.sentences = ['This is the first page of the story, so there is no suggested sentence.']
                } else {
                    this.sentences = this.$store.state.pages[val].generatedSentences
                }
            }
        }
    },
    methods: {
        addSentence() {
            this.$store.commit('changeSentence', this.draft);
        },
        generateSentence() {
            const params = {
                method: 'POST',
                message: 'Successfully added generated sentences',
                body: JSON.stringify({
                    model: "text-davinci-002", 
                    prompt: this.previousSentence,
                    temperature: .7,
                    max_tokens: 96,
                    top_p: 1,
                    n:3,
                    frequency_penalty: 0,
                    presence_penalty: .3
                }),
                // callback: () => {
                //     this.$set(this.alerts, params.message, 'success');
                //     setTimeout(() => this.$delete(this.alerts, params.message), 3000);
                // }
            };
        
            
            this.request(params);
        },
        async request(params) {
            const options = {
                method: params.method, headers: 
                {'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.VUE_APP_OPENAI_KEY}`}
            };
            if (params.body) {
                options.body = params.body;
            }
            
            try {
                const r = await fetch(`https://api.openai.com/v1/completions`, options);
                if (!r.ok) {
                    const res = await r.json();
                    console.log(res);
                    throw new Error(res.error);
                }
                
                const res = await r.json();
                this.sentences = res.choices.map(choice => choice.text);
                this.$store.commit("refreshGeneratedSentence", {pageNum: this.pageNum, sentences: this.sentences});
            } catch (e) {
                console.log(e);
                // this.$set(this.alerts, e, 'error');
                // setTimeout(() => this.$delete(this.alerts, e), 3000);
            }
        }
    }
}
</script>
<style>

.sentence-button {
    margin-left: 1em;
    line-height: 2px;
    font-size: 15px;
}

.title-area {
    display: flex;
    justify-content: center;
}

.sentence-content {
  width: 400px;
  height:80px;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  font-size: 16px;
  resize: none;
}

</style>