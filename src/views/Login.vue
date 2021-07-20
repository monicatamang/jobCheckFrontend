<template>
    <section>
        <job-check-logo></job-check-logo>
        <h1>Login</h1>
        <v-form>
            <v-container>
                <v-row>
                    <v-col cols="12" class="mb-n6">
                        <v-text-field :color="inputColor" label="Email" outlined required></v-text-field>
                    </v-col>
                    <v-col cols="12" class="mb-n6">
                        <v-text-field :color="inputColor" label="Password" outlined required></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
            <v-btn large depressed dark :color="inputColor" class="mt-8">Continue</v-btn>
        </v-form>
        <p id="linkToCreateAccountPage">Don't have an account? <router-link to="/CreateAccount">Create Account</router-link></p>
        <copyright-statement></copyright-statement>
    </section>
</template>

<script>
    import JobCheckLogo from "../components/JobCheckLogo.vue";
    import CopyrightStatement from "../components/CopyrightStatement.vue";

    export default {
        name: "Login",

        components: {
            JobCheckLogo,
            CopyrightStatement
        },

        data() {
            return {
                inputColor: "#52688F"
            }
        },
    }
</script>

<style scoped>
    section {
        display: grid;
        place-items: center;
        row-gap: 5vh;
        margin-top: 10vh;
    }

    h1 {
        font-weight: 400;
        margin: 1vh 0vw -2vh 0vw;
    }
    
    .v-form {
        width: 80vw;
        text-align: center;
    }

    .v-btn {
        text-transform: capitalize;
    }

    .v-application a {
        color: var(--primaryColor);
    }

    #linkToCreateAccountPage {
        font-size: 0.9rem;
    }
</style>