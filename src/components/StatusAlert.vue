<template>
    <v-alert v-if="showStatus.message !== '' && showStatus.icon !== '' && showStatus.color !== ''" :icon="showStatus.icon" :color="showStatus.color" dismissible dark tile :class="{ showAlert: showStatus.show }">{{ showStatus.message }}</v-alert>
</template>

<script>
    export default {
        name: "status-alert",

        // Receiving the API request statuses from components and pages
        props: {
            showStatus: Object
        },
    }
</script>

<style scoped>
    .v-alert {
        position: fixed;
        top: 0;
        display: none;
        z-index: 10;
        width: 100%;
    }

    .showAlert {
        display: block;
    }
</style>