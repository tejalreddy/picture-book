<template>
    <section class="box-container">
        <section class="box">
            <!-- <img
                class="box left-image"
                :src=" 'https://hips.hearstapps.com/wdy.h-cdn.co/assets/17/39/cola-0247.jpg' "/> -->
        </section>
        <section class="box">
            <!-- <img
                class="box left-image"
                :src=" 'https://hips.hearstapps.com/wdy.h-cdn.co/assets/17/39/cola-0247.jpg' "/> -->
        </section>
        <section class="box">
            <!-- <img
                class="box left-image"
                :src=" 'https://hips.hearstapps.com/wdy.h-cdn.co/assets/17/39/cola-0247.jpg' "/> -->
        </section>
        <section class="box">
            <!-- <img
                class="box left-image"
                :src=" 'https://hips.hearstapps.com/wdy.h-cdn.co/assets/17/39/cola-0247.jpg' "/> -->
        </section>
    </section>
</template>

<script>
/* eslint-disable */
export default {
    name: 'PictureDisplay',
    data() {
        return {
            alerts: {}
        }
    },
    methods: {

    },
    watch: {
        '$store.state.currentSentence': function() {
            console.log(this.$store.state.currentSentence);
        }
    }
}
</script>

<style scoped>

.box {
    display: inline-block;
    width: 209px;
    height: 209px;
    background-color: lightgray;
}

.left-image {
    object-fit: cover;
}

.box-container {
    float: left;
    width: 425px;
    align-items: center;
}

</style>