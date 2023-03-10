<template>
    <section>
        <button
        class="button-74"
        @click="exportPdf">
            Export to PDF
        </button>

        <vue-html2pdf
        id="pdf-converter"
        :show-layout="false"
        :float-layout="true"
        :enable-download="true"
        :preview-modal="true"
        :paginate-elements-by-height="1122"
        filename="picture-book"
        :pdf-quality="2"
        :manual-pagination="false"
        pdf-format="a4"
        :pdf-margin="10"
        pdf-orientation="portrait"
        pdf-content-width="800px"
        ref="html2Pdf"
        >
        <section slot="pdf-content">
            <TitlePageTemplate></TitlePageTemplate>
            <div
                :id="pageNumber"
                v-for="index in Object.keys($store.state.pages).length"
                :key="index">
                <PagePdfTemplate
                    :pageNumber="index"
                    :selectedImage="$store.state.pages[index].selectedImage"
                />
            </div>
        </section>
    </vue-html2pdf>
    </section>
</template>

<script>
/* eslint-disable */
import VueHtml2pdf from "vue-html2pdf";
import PagePdfTemplate from "@/components/Templates/PagePdfTemplate";
import TitlePageTemplate from "@/components/Templates/TitlePageTemplate";

export default {
    name: 'ExportButton',
    components: {VueHtml2pdf, PagePdfTemplate, TitlePageTemplate},
    props: {
        pageNumber: {
            type: Number,
            required: true
        }
    },
    mounted() {
        const converter = document.getElementById("pdf-converter");
        converter.html2Pdf = {
            html2canvas: {
                useCORS: true,
            }
        };
        // firebase document
        // const docSnap = await getDoc(doc(db, this.nameDraft, this.draft))
        // if (docSnap.exists()) {
        //     this.pages = docSnap.data().pages
        // } else {
        //     this.pages = []
        // }
    },
    methods: {
        exportPdf() {
            this.$refs.html2Pdf.generatePdf();
        }
    }
}
</script>