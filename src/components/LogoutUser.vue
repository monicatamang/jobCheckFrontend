<template>
    <div>
        <v-btn depressed dark @click="deleteLogin" :color="primaryColor" class="mb-n2 d-flex d-none d-sm-flex d-md-none d-sm-none" id="mobileTabletLogoutButton">
            <span :class="{ hideText: isLoading }">Logout</span>
            <v-progress-circular indeterminate v-if="isLoading"></v-progress-circular>
        </v-btn>
        <v-btn depressed text @click="deleteLogin" :color="primaryColor" class="mb-n2 hidden-sm-and-down" id="desktopLogoutButton">
            <div id="tab">
                <v-icon>mdi-logout</v-icon>
                <span>Logout</span>
            </div>
        </v-btn>
    </div>
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

    #desktopLogoutButton {
        display: none;
    }

    #mobileTabletLogoutButton {
        width: 90vw;
        height: 5vh;
        font-size: 1rem;
    }

    @media only screen and (min-width: 768px) {

        #mobileTabletLogoutButton {
            width: 70.5vw;
            margin-left: 14%;
            height: 5vh;
            font-size: 1rem;
        }
    }

    @media only screen and (min-width: 1024px) {

        #mobileTabletLogoutButton {
            display: none;
        }

        #desktopLogoutButton {
            display: grid;
        }

        #tab {
            display: grid;
            place-items: center;
            grid-template-rows: none;
            grid-template-columns: auto 1fr;
            column-gap: 5px;
        }

        span {
            font-size: 0.8rem;
            letter-spacing: 0.5px;
        }

        .v-btn .v-icon {
            font-size: 1.3rem;
        }
    }
</style>