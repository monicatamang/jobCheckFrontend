<template>
    <section>
        <job-check-logo></job-check-logo>
        <h1>Create Account</h1>
        <v-form>
            <v-container>
                <v-row>
                    <v-col cols="12" class="mb-n6">
                        <v-text-field :color="inputColor" label="First Name" outlined required></v-text-field>
                    </v-col>
                    <v-col cols="12" class="mb-n6">
                        <v-text-field :color="inputColor" label="Last Name" outlined required></v-text-field>
                    </v-col>
                    <v-col cols="12" class="mb-n6">
                        <v-text-field :color="inputColor" label="Email" outlined required></v-text-field>
                    </v-col>
                    <v-col cols="12" class="mb-n6">
                        <v-text-field :color="inputColor" hint="Minimum 8 characters long" label="Password" outlined required></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
            <v-btn large depressed dark :color="inputColor" class="mt-8">Signup</v-btn>
        </v-form>
        <p id="linkToLoginPage">Already have an account? <router-link to="/Login">Login</router-link></p>
        <copyright-statement></copyright-statement>
    </section>
</template>

<script>
    import JobCheckLogo from "../components/JobCheckLogo.vue";
    import CopyrightStatement from "../components/CopyrightStatement.vue";

    export default {
        name: "Create-Account",

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
        margin-top: 6vh;
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

    #linkToLoginPage {
        font-size: 0.9rem;
    }
</style>