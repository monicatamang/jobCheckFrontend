<template>
    <!-- Show delete button only if the user has existing resume file -->
    <v-dialog v-model="dialog" width="500px" v-if="resumeId !== undefined">
        <template v-slot:activator="{ on, attrs }">
            <v-btn text outlined v-bind="attrs" v-on="on">Delete</v-btn>
        </template>
        <v-card>
            <v-card-title>Confirm Deletion</v-card-title>
            <v-card-subtitle class="mt-5">Are you sure you want to permanently delete this resume?</v-card-subtitle>
            <v-card-actions>
                <v-btn text color="grey" @click="dialog = false">Cancel</v-btn>
                <v-btn text color="#B34C59" @click="deleteResumeFile(); dialog = false">Delete</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "delete-resume",

        // Receiving the resume id from the Upload Resume component
        props: {
            resumeId: Number
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
                },
            }
        },

        methods: {
            // Creating a DELETE request to delete a user's existing resume file
            deleteResumeFile() {
                // Configuring the request with the url, type and data
                axios.request({
                    url: `${process.env.VUE_APP_API_URL}/upload-resume`,
                    method: "DELETE",
                    headers: {
                    "Content-Type": "application/json"
                    },
                    data: {
                        loginToken: cookies.get("loginToken"),
                        resumeId: this.resumeId
                    }
                }).then((res) => {
                    // If the network is done and there are no errors, update the store with a success message and display it on the Job Application Details page
                    console.log(res);
                    this.successStatus.message = "Your resume was succesfully deleted.";
                    this.$store.commit('updateResumeStatus', this.successStatus);
                    // Notifying the View Job Application Details component that the user's resume has been deleted
                    this.$emit('resumeIsDeleted', true);
                }).catch((err) => {
                    // If the network is done but the page errors, update the store with an error message and display it on the Job Application Details page
                    console.log(err);
                    this.errorStatus.message = "Failed to delete resume. Please refresh the page and try again.";
                    this.$store.commit('updateResumeStatus', this.errorStatus);
                });
            },
        },
    }
</script>

<style scoped>
    .v-btn {
        text-transform: capitalize;
    }
</style>