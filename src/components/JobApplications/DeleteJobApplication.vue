<template>
    <v-dialog v-model="dialog" width="500px">
        <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on">Delete</v-btn>
        </template>
        <v-card>
            <v-card-title>Confirm Deletion</v-card-title>
            <v-card-subtitle class="mt-5">Are you sure you want to permanently delete this job application and all of its contents?</v-card-subtitle>
            <v-card-actions>
                <v-btn text color="grey" @click="dialog = false">Cancel</v-btn>
                <v-btn text color="#B34C59" @click="deleteJobApplication(); dialog = false">Delete</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "delete-job-application",

        // Recieving the job application id from the Job Application Card component
        props: {
            jobAppId: Number
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
            // Creating a DELETE request to delete a user's job application
            deleteJobApplication() {
                // Configuring the request with the url, type and data
                axios.request({
                url: `${process.env.VUE_APP_API_URL}/job-applications`,
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                data: {
                    loginToken: cookies.get("loginToken"),
                    jobAppId: this.jobAppId
                }
                }).then((res) => {
                    // If the network is done and there are not errors, find the index of the deleted job application and send it to the store
                    res;
                    for(let i = 0; i < this.currentJobApps.length; i++) {
                        if(this.currentJobApps[i].jobAppId === this.jobAppId) {
                            let index = i;
                            this.$store.commit('deleteJobApp', index);
                        }
                    }
                    // Updating the store with a success message and displaying it on the Job Application page
                    this.successStatus.message = "Your job application was successfully deleted";
                    this.$store.commit('updateJobAppStatus', this.successStatus);
                    // Taking the user to the Job Applications page
                    this.$router.push('/JobApplications');
                }).catch((err) => {
                    // If the network is done but the page errors, update the store an error message and display it on the Job Application page
                    err;
                    this.errorStatus.message = "Failed to delete job application. Please refresh the page and try again.";
                    this.$store.commit('updateJobAppStatus', this.errorStatus);
                });
            }
        },

        computed: {
            // Getting all the user's job application from the store
            currentJobApps() {
                return this.$store.state.allJobApps; 
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

    @media only screen and (min-width: 1024px) {

        .v-btn {
            font-size: 0.9rem;
        }
    }
</style>