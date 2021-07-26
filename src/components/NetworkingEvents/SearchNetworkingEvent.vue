<template>
    <div id="searchBar">
        <v-text-field placeholder="Search by Event" dense outlined single-line :color="accentColor" prepend-inner-icon="mdi-magnify" v-model="searchNetworkingEventInput" append-icon="mdi-close" @click:append="getCurrentNetworkingEvents" append-outer-icon="mdi-send" @click:append-outer="searchNetworkingEvent"></v-text-field>
    </div>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "search-networking-event",

        data() {
            return {
                accentColor: "#7391C8",
                searchNetworkingEventInput: "",
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
            searchNetworkingEvent() {
                // Clearing any messages printed to the user
                this.$store.commit('updateSearchNetworkingEventStatus', "");
                // If the user does not input anything into the search bar, do not send the request
                if(this.searchNetworkingEventInput !== '') {
                    // Configuring the request with the url, type and data
                    axios.request({
                    url: `${process.env.VUE_APP_API_URL}/search-networking-events`,
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    params: {
                        userId: cookies.get("userData").userId,
                        searchInput: this.searchNetworkingEventInput
                    }
                    }).then((res) => {
                        // If the network is done and there are no errors, send the search results to the store
                        console.log(res);
                        this.$store.commit('updateAllNetworkingEvents', res.data);
                        // If there are no results returned, print a message to the user on the Networking Event page
                        if(res.data.length === 0) {
                            this.$store.commit('updateSearchNetworkingEventStatus', "0 Networking Events Found");
                        }
                    }).catch((err) => {
                        // If the network is done but the page errors, update the store with an error message and display it on the Networking Event page
                        console.log(err);
                        this.errorStatus.message = "Sorry, something went wrong. Please refresh the page and try again.";
                        this.$store.commit('updateNetworkingEventStatus', this.errorStatus);
                    });
                }
            },

            // Getting all the user's current job applications and showing them on the page
            getCurrentNetworkingEvents() {
                // Executive the following lines of code only if the user types content into the search bar
                if(this.searchNetworkingEventInput !== '') {
                    // Clearing any message printed to the user
                    this.$store.commit('updateSearchNetworkingEventStatus', "");
                    // Getting the user's job applications from the store
                    this.$store.dispatch('getNetworkingEvents', cookies.get("userData").userId);
                    // Resetting the input field
                    this.searchNetworkingEventInput = "";
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