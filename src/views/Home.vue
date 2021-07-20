<template>
    <section>
        <img id="logo" src="../assets/jobCheckLogo.jpg" alt="Job Check's official logo which has the words 'Job Check' in a bold, blue grey colour with a cornflower blue-coloured check mark on the left side of the letter 'J' in 'Job Check'.">
        <img id="laptop" src="../assets/laptopImage.jpg" alt="A vector image of a sliver grey laptop with a thick black border around the screen which has Job Check's logo on the screen.">
        <div>
            <v-btn x-large block depressed dark :color="buttonColor">Create Account</v-btn>
            <v-btn x-large block depressed outlined :color="buttonColor">Login</v-btn>
        </div>
        <p><v-icon color="black">mdi-copyright</v-icon> 2021 Job Check. All Rights Reserved.</p>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                buttonColor: "#52688F"
            }
        },
    }
</script>

<style scoped>
    section, div {
        display: grid;
        place-items: center;
    }

    section {
        row-gap: 5vh;
        min-height: 80vh;
        margin-top: 10vh;
    }

    div {
        width: 55vw;
        row-gap: 2vh;
    }

    #logo {
        width: 50vw;
    }

    #laptop {
        width: 65vw;
    }

    p {
        font-family: var(--titleFont);
        font-size: 0.9rem;
    }

    .v-btn {
        text-transform: capitalize;
        letter-spacing: 1px;
        font-weight: 300;
    }
</style>