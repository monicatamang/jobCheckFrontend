<template>
    <v-dialog v-model="dialog" width="500px">
        <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on">Delete</v-btn>
        </template>
        <v-card>
            <v-card-title>Confirm Deletion</v-card-title>
            <v-card-subtitle class="mt-5">Are you sure you want to permanently delete this interview and all of its contents?</v-card-subtitle>
            <v-card-actions>
                <v-btn text color="grey" @click="dialog = false">Cancel</v-btn>
                <v-btn text color="#B34C59" @click="deleteInterview(); dialog = false">Delete</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "delete-interview",

        // Receiving the interview id from the Interview Card component
        props: {
            interviewId: Number
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
            // Creating a DELETE request to delete a user's job application
            deleteInterview() {
                // Configuring the request with the url, type and data
                axios.request({
                url: `${process.env.VUE_APP_API_URL}/interviews`,
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                data: {
                    loginToken: cookies.get("loginToken"),
                    interviewId: this.interviewId
                }
                }).then((res) => {
                    // If the network is done and there are not errors, find the index of the deleted interview and send it to the store
                    res;
                    for(let i = 0; i < this.currentInterviews.length; i++) {
                        if(this.currentInterviews[i].interviewId === this.interviewId) {
                            let index = i;
                            this.$store.commit('deleteInterview', index);
                            // Notifying the Interview Card component that an interview has been deleted
                            this.$emit('interviewDeleted', true);
                        }
                    }
                    // Updating the store with a success message and displaying it to the user on the Interviews page
                    this.successStatus.message = "Your interview was successfully deleted";
                    this.$store.commit('updateInterviewStatus', this.successStatus);
                    // Taking the user to the previous page
                    this.$router.go(-1);
                }).catch((err) => {
                    // If the network is done but the page errors, update the store with an error message and display it to the user on the Interviews page
                    err;
                    this.errorStatus.message = "Failed to delete interview. Please refresh the page and try again.";
                    this.$store.commit('updateInterviewStatus', this.errorStatus);
                });
            }
        },

        computed: {
            // Getting all the user's interviews from the store
            currentInterviews() {
                return this.$store.state.allInterviews; 
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