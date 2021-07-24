<template>
    <div id="searchBar">
        <v-text-field placeholder="Search by Name" dense outlined single-line :color="accentColor" prepend-inner-icon="mdi-magnify" v-model="searchJobRefInput" append-icon="mdi-close" @click:append="getCurrentJobRefs" append-outer-icon="mdi-send" @click:append-outer="searchJobRef"></v-text-field>
    </div>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "search-job-reference",

        data() {
            return {
                accentColor: "#7391C8",
                searchJobRefInput: "",
                errorStatus: {
                    show: true,
                    message: "",
                    icon: "mdi-alert-circle",
                    color: "#B34C59"
                }
            }
        },

        methods: {
            // Creating a GET request to search for specific job references
            searchJobRef() {
                // Clearing any messages printed to the user
                this.$store.commit('updateSearchJobReferenceStatus', "");
                // If the user does not input anything into the search bar, do not send the request
                if(this.searchJobRefInput !== '') {
                    // Configuring the request with the url, type and data
                    axios.request({
                    url: `${process.env.VUE_APP_API_URL}/search-job-references`,
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    params: {
                        userId: cookies.get("userData").userId,
                        searchInput: this.searchJobRefInput
                    }
                    }).then((res) => {
                        // If the network is done and there are no errors, send the search results to the store
                        console.log(res);
                        this.$store.commit('updateAllJobReferences', res.data);
                        // If there are no results returned, print a message to the user
                        if(res.data.length === 0) {
                            this.$store.commit('updateSearchJobReferenceStatus', "0 Job References Found");
                        }
                    }).catch((err) => {
                        console.log(err);
                        this.errorStatus.message = "Sorry, something went wrong. Please refresh the page and try again.";
                        this.$store.commit('updateJobReferenceStatus', this.errorStatus);
                    });
                }
            },

            // Getting all the user's current job references and showing them on the page
            getCurrentJobRefs() {
                // Clearing any message printed to the user
                this.$store.commit('updateSearchJobReferenceStatus', "");
                // Getting the user's job references from the store
                this.$store.dispatch('getJobReferences', cookies.get("userData").userId);
                // Resetting the input field
                this.searchJobReferenceInput = "";
                // Removing the 'close' icon
                this.sendIcon = "";
            }
        }
    }
</script>

<style scoped>

</style>