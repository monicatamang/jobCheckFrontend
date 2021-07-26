<template>
    <v-btn depressed dark @click="deleteLogin" :color="primaryColor" class="mb-n2">
        <span :class="{ hideText: isLoading }">Logout</span>
        <v-progress-circular indeterminate v-if="isLoading"></v-progress-circular>
    </v-btn>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "logout-user",

        data() {
            return {
                isLoading: false,
                primaryColor: "#52688F",
                errorStatus: {
                    show: true,
                    message: "",
                    icon: "mdi-alert-circle",
                    color: "#B34C59"
                }
            }
        },

        methods: {
            // Creating a DELETE request to log out a user
            deleteLogin() {
                // Show a loading message to the user
                this.isLoading = true;
                // Configuring the request with the url, type and data
                axios.request({
                url: `${process.env.VUE_APP_API_URL}/login`,
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                data: {
                    loginToken: cookies.get("loginToken")
                }
                }).then((res) => {
                    // If the network is done and there are no errors, remove the user's cookies
                    console.log(res);
                    cookies.remove("loginToken");
                    cookies.remove("userData");
                    // Taking the user to the Login Page
                    this.$router.push("/Login");
                }).catch((err) => {
                    // If the network is done but the page errors, update the store with an error message and display on the User's Profile page
                    console.log(err);
                    this.errorStatus.message = "Failed to log out. Please refresh the page and try again.";
                    this.$store.commit('updateLogoutStatus', this.errorStatus);
                });
            }
        },
    }
</script>

<style scoped>
    .hideText {
        display: none;
    }

    .v-btn {
        text-transform: capitalize;
        width: 90%;
    }

    @media only screen and (min-width: 768px) {

        .v-btn.v-size--default {
            width: 70%;
            margin-left: 20%;
            font-size: 1.1rem;
            height: 5vh;
        }
    }
</style>