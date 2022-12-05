<template>
    <article>
        <div @click="boxClicked"
            :id="pageNumber"
            class="page-box">
            <h1 class="box-text">{{ pageNumber }}</h1>
        </div>
    </article>
</template>

<script>
/* eslint-disable */
export default {
    name: 'PageComponent',
    props: {
        // Data from the stored freet
        pageNumber: {
            type: Number,
            required: true
        },
        active: {
            type: Boolean,
            required: true
        }
    },
    watch: {
        active: function(val) {
            const box = document.getElementById(this.pageNumber);
            if (val) {
                box.style.transform = 'translateY(-13px)';
                box.style.boxShadow = 'rgba(0, 0, 0, 0.3) 0 4px 12px'
            } else {
                box.style.transform = 'translateY(0px)';
                box.style.boxShadow = 'rgba(0, 0, 0, 0) 0 4px 12px';
            }
        }
    },
    mounted() {
        if (this.active) {
            const box = document.getElementById(this.pageNumber);
            box.style.transform = 'translateY(-15px)';
            box.style.boxShadow = 'rgba(0, 0, 0, 0.2) 0 4px 12px'
        }
    },
    data() {
        return {
            alerts: {}
        }
    },
    methods: {
        boxClicked() {
            this.$emit('boxClicked', this.pageNumber);
        }
    }
}
</script>

<style scoped>
.page-box {
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: .25rem;
    box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
    box-sizing: border-box;
    width: 223px;
    height: 300px;
    margin: 1em;
    display: inline-block;
}

.box-text {
    text-align: center;
    margin-top: 2.4em;
    font-size: 50px;
}

/* .page-box:active, .page-box:focus {
  background-color: #fb8332;
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  transform: translateY(-1px);
} */
</style>
