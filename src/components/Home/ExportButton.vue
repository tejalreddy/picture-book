<template>
    <section>
        <button
        class="button-74"
        @click="exportPdf">
            Export to PDF
        </button>
    </section>
</template>

<script>
/* eslint-disable */
export default {
    name: 'ExportButton',
    methods: {
        exportPdf() {
            console.log('clicked');
        }
    }
}
</script>