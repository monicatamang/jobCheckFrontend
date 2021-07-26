<template>
    <v-dialog v-model="dialog" width="500px">
        <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on">Delete</v-btn>
        </template>
        <v-card>
            <v-card-title>Confirm Deletion</v-card-title>
            <v-card-subtitle class="mt-5">Are you sure you want to permanently delete this job reference and all of its contents?</v-card-subtitle>
            <v-card-actions>
                <v-btn text color="grey" @click="dialog = false">Cancel</v-btn>
                <v-btn text color="#B34C59" @click="deleteJobReference(); dialog = false">Delete</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "delete-job-reference",

        // Receiving the job reference id from the Job Reference Card component
        props: {
            jobRefId: Number
        },

        data() {
            return {
                dialog: false,
                errorStatus: {
                    show: true,
                    message: "",
                    icon: "mdi-alert-circle",
                    color: "#B34C59"
                },
                successStatus: {
                    show: true,
                    message: "",
                    icon: "mdi-check-circle",
                    color: "#53AC84"
                }
            }
        },

        methods: {
            // Creating a DELETE request to delete a user's job reference
            deleteJobReference() {
                // Configuring the request with the url, type and data
                axios.request({
                url: `${process.env.VUE_APP_API_URL}/job-references`,
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                data: {
                    loginToken: cookies.get("loginToken"),
                    jobRefId: this.jobRefId
                }
                }).then((res) => {
                    // If the network is done and there are not errors, find the index of the deleted networking event and send it to the store
                    console.log(res);
                    for(let i = 0; i < this.currentJobReferences.length; i++) {
                        if(this.currentJobReferences[i].jobRefId === this.jobRefId) {
                            let index = i;
                            this.$store.commit('deleteJobReference', index);
                        }
                    }
                    // Update the store with a success message and display it on the Job References page
                    this.successStatus.message = "Your job reference was successfully deleted";
                    this.$store.commit('updateJobReferenceStatus', this.successStatus);
                }).catch((err) => {
                    // If the network is done but the page errors, update the store with an error message and display it on the Job References page
                    console.log(err);
                    this.errorStatus.message = "Failed to delete job reference. Please refresh the page and try again.";
                    this.$store.commit('updateJobReferenceStatus', this.errorStatus);
                });
            }
        },

        computed: {
            // Getting all the user's job references from the store
            currentJobReferences() {
                return this.$store.state.allJobReferences;
            }
        },
    }
</script>

<style scoped>
    .v-btn {
        text-transform: capitalize;
        font-weight: 400;
        font-family: var(--titleFont);
        letter-spacing: 0px;
        font-size: 1rem;
    }
    
    .v-card__title, .v-card__subtitle {
        font-family: var(--titleFont);
    }

    @media only screen and (min-width: 768px) {

        .v-btn {
            font-size: 1.3rem;
        }
    }
</style>