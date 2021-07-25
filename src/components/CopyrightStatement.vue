<template>
    <p><v-icon small color="black">mdi-copyright</v-icon> 2021 Job Check. All Rights Reserved.</p>
</template>

<script>
    export default {
        name: "copyright-statement"
    }
</script>

<style scoped>
    p {
        font-family: var(--titleFont);
        font-size: 0.8rem;
    }

    @media only screen and (min-width: 768px) {
        
        p {
            font-size: 1rem;
        }
    }

    @media only screen and (min-width: 1024px) {
        
        p {
            font-size: 0.7rem;
        }
    }
</style>