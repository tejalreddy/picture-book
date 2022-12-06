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
        :paginate-elements-by-height="1400"
        filename="picture-book-pdf"
        :pdf-quality="2"
        :manual-pagination="false"
        pdf-format="a4"
        :pdf-margin="10"
        pdf-orientation="portrait"
        pdf-content-width="800px"
        ref="html2Pdf"
        >
        <section slot="pdf-content">
            <PagePdfTemplate
                :pageNumber="1"
            />
        </section>
    </vue-html2pdf>
    </section>
</template>

<script>
/* eslint-disable */
import VueHtml2pdf from "vue-html2pdf";
import PagePdfTemplate from "@/components/Templates/PagePdfTemplate";

export default {
    name: 'ExportButton',
    components: {VueHtml2pdf, PagePdfTemplate},
    mounted() {
        const converter = document.getElementById("pdf-converter");
        converter.html2Pdf = {
            html2canvas: {
                useCORS: true,
            }
        };
    },
    methods: {
        exportPdf() {
            this.$refs.html2Pdf.generatePdf();
        }
    }
}
</script>