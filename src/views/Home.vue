<template>
    <section>
        <article>
            <job-check-logo></job-check-logo>
            <img id="laptop" src="../assets/laptopImage.jpg" alt="A vector image of a sliver grey laptop with a thick black border around the screen which has Job Check's logo on the screen.">
            <div>
                <v-btn class="d-flex d-sm-none" large block depressed dark :color="buttonColor" @click="goToCreateAccountPage">Create Account</v-btn>
                <v-btn class="d-none d-sm-flex d-md-none hidden-md-and-up" width="35vw" height="6vh" large block depressed dark :color="buttonColor" @click="goToCreateAccountPage">Create Account</v-btn>
                <v-btn class="hidden-sm-and-down" width="12vw" height="7vh" large block depressed dark :color="buttonColor" @click="goToCreateAccountPage">Create Account</v-btn>

                <v-btn class="d-flex d-sm-none" large block depressed outlined :color="buttonColor" @click="goToLoginPage">Login</v-btn>
                <v-btn class="d-none d-sm-flex d-md-none hidden-md-and-up" width="35vw" height="6vh" large block depressed outlined :color="buttonColor" @click="goToLoginPage">Login</v-btn>
                <v-btn class="hidden-sm-and-down" width="12vw" height="7vh" large block depressed outlined :color="buttonColor" @click="goToLoginPage">Login</v-btn>
            </div>
            <copyright-statement></copyright-statement>
        </article>
        <div id="background"></div>
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
    section, article, div {
        display: grid;
        place-items: center;
    }

    article {
        row-gap: 5vh;
        min-height: 80vh;
        margin-top: 10vh;
    }

    div {
        row-gap: 2vh;
    }

    #laptop {
        width: 65vw;
    }

    .v-btn {
        text-transform: capitalize;
        font-weight: 400;
    }

    h4 {
        font-family: var(--titleFont);
        text-align: center;
        font-weight: 400;
    }

    #background {
        display: none;
    }

    @media only screen and (min-width: 768px) {

        #laptop {
            width: 50vw;
        }

        .v-btn.v-size--large {
            font-size: 1.4rem;
            letter-spacing: 1px;
        }
    }

    @media only screen and (min-width: 1024px) {

        section {
            grid-template-columns: 3fr 1fr;
        }

        article {
            row-gap: 11vh;
            margin-top: 5vh;
        }

        #laptop {
            width: 18vw;
        }

        #background {
            display: grid;
            place-items: center;
            width: 100%;
            height: 100vh;
            background: var(--primaryColor);
        }

        .v-btn.v-size--large {
            font-size: 0.8rem;
            letter-spacing: 1px;
        }

        h3 {
            color: white;
            font-family: var(--bodyFont);
            font-size: 1rem;
            font-weight: 400;
            justify-self: start;
        }
    }
</style>