<template>
    <section>
        <v-alert icon="mdi-alert-circle" :color="errorColor" dismissible dark :class="{ showErrorMessage: isError }">Sorry, something went wrong. Please refresh the page and try again.</v-alert>
        <v-alert icon="mdi-check-circle" :color="successColor" dismissible dark :class="{ showSuccessMessage: isSuccess }">Your Job Check account was successfully created</v-alert>
        <article>
            <job-check-logo></job-check-logo>
            <h1>Create Account</h1>
            <v-form>
                <v-container id="inputFields">
                    <v-row>
                        <v-col cols="12" class="mb-n6">
                            <v-text-field v-model="userFirstName" :color="inputColor" label="First Name" outlined required></v-text-field>
                        </v-col>
                        <v-col cols="12" class="mb-n6">
                            <v-text-field v-model="userLastName" :color="inputColor" label="Last Name" outlined required></v-text-field>
                        </v-col>
                        <v-col cols="12" class="mb-n6">
                            <v-text-field v-model="userEmail" :color="inputColor" label="Email" outlined required></v-text-field>
                        </v-col>
                        <v-col cols="12" class="mb-n6">
                            <v-text-field type="password" v-model="userPassword" :color="inputColor" hint="Minimum 8 characters long" label="Password" outlined required></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
                <v-btn large depressed dark :color="inputColor" class="mt-8" @click="createUser">Signup</v-btn>
            </v-form>
            <p id="linkToLoginPage">Already have an account? <router-link to="/Login">Login</router-link></p>
            <copyright-statement></copyright-statement>
        </article>
        <div id="background"></div>
    </section>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";
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
                inputColor: "#52688F",
                userFirstName: "",
                userLastName: "",
                userEmail: "",
                userPassword: "",
                isError: false,
                isSuccess: false,
                errorColor: "#B34C59",
                successColor: "#53AC84"
            }
        },

        methods: {
            // Creating a function that sends a POST request to create a new user
            createUser() {
                // Send the request only if the user has typed content into the input fields
                if(this.userFirstName !== '' && this.userLastName !== '' && this.userEmail !== '' && this.userPassword !== '') {
                    // Configuring the request with the url, type, and data
                    axios.request({
                    url: `${process.env.VUE_APP_API_URL}/users`,
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: {
                        firstName: this.userFirstName,
                        lastName: this.userLastName,
                        email: this.userEmail,
                        password: this.userPassword
                    }
                    }).then((res) => {
                        // If the network is done and there are no errors, store the user's data and login token as cookies
                        console.log(res);
                        let userDataJSON = JSON.stringify(res.data);
                        cookies.set("userData", userDataJSON);
                        cookies.set("loginToken", res.data.loginToken);
                        // Showing a success message to the user
                        this.isSuccess = true;
                        // Taking the user to the Job Applications page
                        this.$router.push('/JobApplications');
                    }).catch((err) => {
                        console.log(err);
                        // If the network is done but the page errors, show an error message to the user
                        this.isError = true;
                    });
                }
            }
        }
    }
</script>

<style scoped>
    section {
        display: grid;
        place-items: center;
    }

    article {
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

    .v-alert {
        position: absolute;
        top: 0;
        display: none;
    }

    .showErrorMessage, .showSuccessMessage {
        display: block;
    }

    #background {
        display: none;
    }

    @media only screen and (min-width: 768px) {

        section {
            margin-top: 10vh;
        }

        h1 {
            font-size: 1.8rem;
        }

        #inputFields {
            display: grid;
            place-items: center;
            width: 90%;
        }

        .v-btn.v-size--large {
            font-size: 1.2rem;
            letter-spacing: 1px;
            padding: 4.5%;
        }

        #linkToLoginPage {
            font-size: 1.1rem;
        }
    }

    @media only screen and (min-width: 1024px) {

        section {
            grid-template-columns: 3fr 1fr;
            margin-top: 0vh;
        }

        article {
            display: grid;
            place-items: center;
            row-gap: 5vh;
            padding: 10vh 0vw 5vh 0vw;
            height: 100%;
            margin-top: 0vh;
        }

        h1 {
            font-size: 1.3rem;
        }

        #inputFields {
            width: 35%;
        }

        .v-btn.v-size--large {
            font-size: 1.3rem;
            letter-spacing: 1px;
            padding: 2%;
        }

        #background {
            display: grid;
            place-items: center;
            width: 100%;
            height: 100%;
            background: var(--primaryColor);
        }

        .v-btn.v-size--large {
            font-size: 0.8rem;
            letter-spacing: 1px;
        }

        #linkToLoginPage {
            font-size: 0.9rem;
        }
    }
</style>