<template>
    <div id="searchBar">
        <v-text-field placeholder="Search by Company" dense outlined single-line :color="accentColor" prepend-inner-icon="mdi-magnify" v-model="searchJobAppInput" append-icon="mdi-close" @click:append="getCurrentJobApps" append-outer-icon="mdi-send" @click:append-outer="searchJobApp"></v-text-field>
    </div>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "search-job-application",

        data() {
            return {
                accentColor: "#7391C8",
                searchJobAppInput: "",
                errorStatus: {
                    show: true,
                    message: "",
                    icon: "mdi-alert-circle",
                    color: "#B34C59"
                }
            }
        },

        methods: {
            // Creating a GET request to search for specific job applications
            searchJobApp() {
                // Clearing any messages printed to the user
                this.$store.commit('updateSearchJobAppStatus', "");
                // If the user does not input anything into the search bar, do not send the request
                if(this.searchJobAppInput !== '') {
                    // Configuring the request with the url, type and data
                    axios.request({
                    url: `${process.env.VUE_APP_API_URL}/search-job-applications`,
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    params: {
                        userId: cookies.get("userData").userId,
                        searchInput: this.searchJobAppInput
                    }
                    }).then((res) => {
                        // If the network is done and there are no errors, send the search results to the store
                        console.log(res);
                        this.$store.commit('updateAllJobApps', res.data);
                        // If there are no results returned, print a message to the user on the Job Application page
                        if(res.data.length === 0) {
                            this.$store.commit('updateSearchJobAppStatus', "0 Job Applications Found");
                        }
                    }).catch((err) => {
                        // If the network is done but the page errors, update the store with an error message and display it on the Job Application page
                        console.log(err);
                        this.errorStatus.message = "Sorry, something went wrong. Please refresh the page and try again.";
                        this.$store.commit('updateJobAppStatus', this.errorStatus);
                    });
                }
            },

            // Getting all the user's current job applications and showing them on the page
            getCurrentJobApps() {
                // Executive the following lines of code only if the user types content into the search bar
                if(this.searchJobAppInput !== '') {
                    // Clearing any message printed to the user
                    this.$store.commit('updateSearchJobAppStatus', "");
                    // Getting the user's job applications from the store
                    this.$store.dispatch('getJobApps', cookies.get("userData").userId);
                    // Resetting the input field
                    this.searchJobAppInput = "";
                    // Removing the 'close' icon
                    this.sendIcon = "";
                }
            }
        }
    }
</script>

<style scoped>
    @media only screen and (min-width: 768px) {

        .v-input {
            width: 55vw;
        }
    }
</style>