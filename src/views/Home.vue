<template>
    <section>
        <job-check-logo></job-check-logo>
        <img id="laptop" src="../assets/laptopImage.jpg" alt="A vector image of a sliver grey laptop with a thick black border around the screen which has Job Check's logo on the screen.">
        <div>
            <v-btn x-large block depressed dark :color="buttonColor" @click="goToCreateAccountPage">Create Account</v-btn>
            <v-btn x-large block depressed outlined :color="buttonColor" @click="goToLoginPage">Login</v-btn>
        </div>
        <copyright-statement></copyright-statement>
    </section>
</template>

<script>
    import JobCheckLogo from "../components/JobCheckLogo.vue";
    import CopyrightStatement from "../components/CopyrightStatement.vue";

    export default {
        name: "Home",

        components: {
            JobCheckLogo,
            CopyrightStatement
        },

        data() {
            return {
                buttonColor: "#52688F"
            }
        },

        methods: {
            // Taking the user to the Create Account page
            goToCreateAccountPage() {
                this.$router.push('/CreateAccount');
            },

            // Taking the user to the Login page
            goToLoginPage() {
                this.$router.push('/Login');
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

    #laptop {
        width: 65vw;
    }

    .v-btn {
        text-transform: capitalize;
        font-weight: 400;
    }
</style>