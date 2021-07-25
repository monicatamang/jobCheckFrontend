<template>
    <div id="searchBar">
        <v-text-field placeholder="Search by Company" dense outlined single-line :color="accentColor" prepend-inner-icon="mdi-magnify" v-model="searchInterviewInput" append-icon="mdi-close" @click:append="getCurrentInterviews" append-outer-icon="mdi-send" @click:append-outer="searchInterview"></v-text-field>
    </div>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "search-interview",

        data() {
            return {
                accentColor: "#7391C8",
                searchInterviewInput: "",
                errorStatus: {
                    show: true,
                    message: "",
                    icon: "mdi-alert-circle",
                    color: "#B34C59"
                }
            }
        },

        methods: {
            // Creating a GET request to search for specific interviews
            searchInterview() {
                // Clearing any messages printed to the user
                this.$store.commit('updateSearchInterviewStatus', "");
                // If the user does not input anything into the search bar, do not send the request
                if(this.searchInterviewInput !== '') {
                    // Configuring the request with the url, type and data
                    axios.request({
                    url: `${process.env.VUE_APP_API_URL}/search-interviews`,
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    params: {
                        userId: cookies.get("userData").userId,
                        searchInput: this.searchInterviewInput
                    }
                    }).then((res) => {
                        // If the network is done and there are no errors, send the search results to the store
                        console.log(res);
                        this.$store.commit('updateAllInterviews', res.data);
                        // If there are no results returned, print a message to the user
                        if(res.data.length === 0) {
                            this.$store.commit('updateSearchInterviewStatus', "0 Interviews Found");
                        }
                    }).catch((err) => {
                        // If the network is done but the page errors, update the store with an error message and display it on the Interview page
                        console.log(err);
                        this.errorStatus.message = "Sorry, something went wrong. Please refresh the page and try again.";
                        this.$store.commit('updateInterviewStatus', this.errorStatus);
                    });
                }
            },

            // Getting all the user's current interviews and showing them on the page
            getCurrentInterviews() {
                // Executive the following lines of code only if the user types content into the search bar
                if(this.searchInterviewInput !== '') {
                    // Clearing any message printed to the user
                    this.$store.commit('updateSearchInterviewStatus', "");
                    // Getting the user's interviews from the store
                    this.$store.dispatch('getInterviews', cookies.get("userData").userId);
                    // Resetting the input field
                    this.searchInterviewInput = "";
                    // Removing the 'close' icon
                    this.sendIcon = "";
                }
            }
        }
    }
</script>

<style scoped>

</style>