<template>
    <!-- Show delete button only if the user has an existing cover letter file -->
    <v-dialog v-model="dialog" width="500px" v-if="coverLetterId !== undefined">
        <template v-slot:activator="{ on, attrs }">
            <v-btn text outlined v-bind="attrs" v-on="on" class="deleteButton">Delete</v-btn>
        </template>
        <v-card>
            <v-card-title>Confirm Deletion</v-card-title>
            <v-card-subtitle class="mt-5">Are you sure you want to permanently delete this cover letter?</v-card-subtitle>
            <v-card-actions>
                <v-btn text color="grey" @click="dialog = false">Cancel</v-btn>
                <v-btn text color="#B34C59" @click="deleteCoverLetterFile(); dialog = false">Delete</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "delete-cover-letter",
        
        // Recieving the cover letter id from the Upload Cover Letter component
        props: {
            coverLetterId: Number
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
            // Creating a DELETE request that will delete a user's existing cover letter
            deleteCoverLetterFile() {
                // Configuring the request with the url, type and data
                axios.request({
                    url: `${process.env.VUE_APP_API_URL}/upload-cover-letter`,
                    method: "DELETE",
                    headers: {
                    "Content-Type": "application/json"
                    },
                    data: { 
                        loginToken: cookies.get("loginToken"),
                        coverLetterId: this.coverLetterId
                    }
                }).then((res) => {
                    // If the network is done and there are no errors, update the store with a success message and display it on the Job Application Details page
                    res;
                    this.successStatus.message = "Your cover letter was succesfully deleted.";
                    this.$store.commit('updateCoverLetterStatus', this.successStatus);
                    // Notifying the Upload Cover Letter component that the user's cover letter has been deleted
                    this.$emit('coverLetterIsDeleted', true);
                }).catch((err) => {
                    // If the network is done but the page errors, update the store with an error message and display it on the Job Application Details page
                    err;
                    this.errorStatus.message = "Failed to delete cover letter. Please refresh the page and try again.";
                    this.$store.commit('updateCoverLetterStatus', this.errorStatus);
                });
            },
        }
    }
</script>

<style scoped>
    .v-btn {
        text-transform: capitalize;
    }

    @media only screen and (min-width: 768px) {

        .deleteButton {
            width: 80%;
            font-size: 1rem;
            padding: 14.5%;
            margin-left: -10vw;
        }
    }

    @media only screen and (min-width: 1024px) {

        .deleteButton {
            width: 50%;
            font-size: 0.8rem;
            padding: 4%;
            margin-left: -14vw;
        }
    }
</style>