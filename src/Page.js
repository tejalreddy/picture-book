/* eslint-disable indent */
export default class Page {
    constructor () {
        this.picture = ''
        this.caption = ''
        this.previousSentence = ''
        this.generatedSentence = ''
    }
    setPicture (picture) {
        this.picture = picture
    }
    setCaption (caption) {
        this.caption = caption
    }
    setPreviousSentence (previousSentence) {
        this.previousSentence = previousSentence
    }
    setGeneratedSentence (generatedSentence) {
        this.generatedSentence = generatedSentence
    }
    getPicture () {
        return this.picture
    }
    getCaption () {
        return this.caption
    }
    getPreviousSentence () {
        return this.previousSentence
    }
    getGeneratedSentence () {
        return this.generatedSentence
    }
}
