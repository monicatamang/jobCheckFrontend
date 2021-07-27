<template>
    <!-- Show the download button only if the user has an existing cover letter -->
    <v-btn outlined :color="primaryColor" v-if="coverLetterId !== undefined" @click="getCoverLetterName" class="mb-sm-3">Download</v-btn>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "download-cover-letter",

        // Receiving the cover letter id from the Upload Cover Letter component
        props: {
            coverLetterId: Number
        },

        data() {
            return {
                primaryColor: "#52688F",
                coverLetterFilename: "",
                loginToken: cookies.get("loginToken"),
                errorStatus: {
                    show: true,
                    message: "",
                    icon: "mdi-alert-circle",
                    color: "#B34C59"
                }
            }
        },

        methods: {
            // Creating a GET request that will get the user's cover letter filename
            getCoverLetterName() {
                // Configuring the request with the url, type and data
                axios.request({
                    url: `${process.env.VUE_APP_API_URL}/download-cover-letter`,
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Login-Token": `${this.loginToken}`
                    },
                    params: {
                        coverLetterId: this.coverLetterId
                    }
                }).then((res) => {
                    // If the network is done and there are no errors, store the cover letter's filename as a variable
                    console.log(res);
                    this.coverLetterFilename = res.data;
                    // Calling the function and passing it the user's cover letter filename
                    this.downloadCoverLetter(this.coverLetterFilename)
                }).catch((err) => {
                    // If the network is done but the page errors, update the store with an error message and display it on the Job Application Details page
                    console.log(err);
                    this.errorStatus.message = "Sorry, something went wrong. Please refresh the page and try again.";
                    this.$store.commit('updateCoverLetterStatus', this.errorStatus);
                });
            },

            // Creating a GET request that will allow a user to download their existing cover letter file
            downloadCoverLetter(coverLetterFilename) {
                // Configuring the request with the url, type and data
                axios.request({
                    url: `${process.env.VUE_APP_API_URL}/download-cover-letter/${coverLetterFilename}`,
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Login-Token": `${this.loginToken}`
                    },
                    params: {
                        coverLetterId: this.coverLetterId
                    },
                    // Stating that the response returned is binary
                    responseType: 'blob'
                }).then((res) => {
                    // If the network is done and there are no errors, create a new link that will allow the user to download their existing cover letter
                    console.log(res);
                    const url = window.URL.createObjectURL(new Blob([res.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', coverLetterFilename);
                    document.body.appendChild(link);
                    link.click();
                }).catch((err) => {
                    // If the network is done but the page errors, update the store with an error message and display it on the Job Application Details page
                    console.log(err);
                    this.errorStatus.message = "Failed to download cover letter. Please refresh page and try again.";
                    this.$store.commit('updateCoverLetterStatus', this.errorStatus);
                });
            }
        }
    }
</script>

<style scoped>
    @media only screen and (min-width: 768px) {

        .v-btn.v-size--default {
            width: 70%;
            font-size: 1rem;
            padding: 10%;
        }
    }

    @media only screen and (min-width: 1024px) {

        .v-btn.v-size--default {
            width: 40%;
            font-size: 0.8rem;
            padding: 4%;
        }
    }
</style>