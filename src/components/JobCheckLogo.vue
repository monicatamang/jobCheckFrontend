<template>
    <img id="logo" src="../assets/jobCheckLogo.jpg" alt="Job Check's official logo which has the words 'Job Check' in a bold, blue grey colour with a cornflower blue-coloured check mark on the left side of the letter 'J' in 'Job Check'.">
</template>

<script>
    export default {
        name: "job-check-logo"
    }
</script>

<style scoped>
    #logo {
        width: 50vw;
    }

    @media only screen and (min-width: 768px) {
        
        #logo {
            width: 45vw;
        }
    }

    @media only screen and (min-width: 1024px) {

        #logo {
            width: 10vw;
        }
    }
</style>