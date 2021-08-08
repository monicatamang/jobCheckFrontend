<template>
    <section>
        <v-alert min-width="100%" icon="mdi-alert-circle" :color="errorColor" dismissible dark :class="{ showErrorMessage: isError }">Sorry, something went wrong. Please refresh the page and try again.</v-alert>
        <v-alert min-width="100%" icon="mdi-check-circle" :color="successColor" dismissible dark :class="{ showSuccessMessage: isSuccess }">Your Job Check account was successfully created</v-alert>
        <article>
            <job-check-logo></job-check-logo>
            <h1>Create Account</h1>
            <v-form id="inputFields">
                <v-container>
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
                <v-btn height="6vh" large depressed dark :color="inputColor" class="mt-8" @click="createUser">
                    <span :class="{ hideText: isLoading }">Signup</span>
                    <v-progress-circular indeterminate v-if="isLoading"></v-progress-circular>
                </v-btn>
            </v-form>
            <p id="linkToLoginPage">Already have an account? <router-link to="/Login">Login</router-link></p>
            <copyright-statement></copyright-statement>
        </article>
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
                isLoading: false,
                errorColor: "#B34C59",
                successColor: "#53AC84"
            }
        },

        methods: {
            // Creating a function that sends a POST request to create a new user
            createUser() {
                // Send the request only if the user has typed content into the input fields
                if(this.userFirstName !== '' && this.userLastName !== '' && this.userEmail !== '' && this.userPassword !== '') {
                    // Show a loading message to the user
                    this.isLoading = true;
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
                        let userDataJSON = JSON.stringify(res.data);
                        cookies.set("userData", userDataJSON);
                        cookies.set("loginToken", res.data.loginToken);
                        // Showing a success message to the user
                        this.isSuccess = true;
                        // Taking the user to the Job Applications page
                        this.$router.push('/JobApplications');
                        res;
                    }).catch((err) => {
                        // If the network is done but the page errors, show an error message to the user
                        this.isError = true;
                        err;
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

    .hideText {
        display: none;
    }

    @media only screen and (min-width: 768px) {

        section {
            margin-top: 5vh;
        }

        h1 {
            font-size: 1.8rem;
        }

        #inputFields {
            display: grid;
            place-items: center;
            width: 50%;
        }

        .v-btn.v-size--large {
            font-size: 1.2rem;
            letter-spacing: 1px;
        }

        #linkToLoginPage {
            font-size: 1.1rem;
        }
    }

    @media only screen and (min-width: 1024px) {

        article {
            display: grid;
            place-items: center;
            row-gap: 5vh;
            padding: 3% 0%;
            height: 100%;
            margin: 0vh 0vw 5vh 0vw;
            box-shadow: 0px 0px 5px lightgrey;
            width: 45%;
        }

        h1 {
            font-size: 1.3rem;
        }

        .v-btn.v-size--large {
            font-size: 1.3rem;
            letter-spacing: 1px;
            padding: 2%;
        }

        .v-btn.v-size--large {
            font-size: 0.8rem;
            letter-spacing: 1px;
        }

        .v-btn:not(.v-btn--round).v-size--large {
            padding: 0% 5%;
        }

        #linkToLoginPage {
            font-size: 0.9rem;
        }

        #inputFields {
            width: 70%;
        }
    }
</style>