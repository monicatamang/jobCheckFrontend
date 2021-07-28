<template>
    <!-- Show the download button only if the user has an exist resume file -->
    <v-btn outlined :color="primaryColor" v-if="resumeId !== undefined" @click="getResumeName" class="downloadButton">Download</v-btn>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "download-resume",

        // Receiving the resume id from the Upload Resume component
        props: {
            resumeId: Number
        },

        data() {
            return {
                primaryColor: "#52688F",
                resumeFilename: "",
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
            // Creating a GET request that will get the user's existing resume's filename
            getResumeName() {
                // Configuring the request with the url, type and data
                axios.request({
                    url: `${process.env.VUE_APP_API_URL}/download-resume`,
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Login-Token": `${this.loginToken}`
                    },
                    params: {
                        resumeId: this.resumeId
                    }
                }).then((res) => {
                    // If the network is done and there are no errors, store the resume filename as a variable
                    console.log(res);
                    this.resumeFilename = res.data;
                    // Calling the function to allow the user to download their existing resume file
                    this.downloadResume(this.resumeFilename);
                }).catch((err) => {
                    // If the network is done but the page errors, update the store with an error message and display it on the Job Application Details page
                    console.log(err);
                    this.errorStatus.message = "Sorry, something went wrong. Please refresh the page and try again.";
                    this.$store.commit('updateResumeStatus', this.errorStatus);
                });
            },

            // Creating a GET request to allow the user download their existing resume file
            downloadResume(resumeFilename) {
                // Configuring the request with the url, type and data
                axios.request({
                    url: `${process.env.VUE_APP_API_URL}/download-resume/${resumeFilename}`,
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Login-Token": `${this.loginToken}`
                    },
                    params: {
                        resumeId: this.resumeId
                    },
                    // Stating that the response is binary
                    responseType: 'blob'
                }).then((res) => {
                    // If the network is done and there are no errors, create a link that allows the user to download their existing resume file
                    console.log(res);
                    const url = window.URL.createObjectURL(new Blob([res.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', resumeFilename);
                    document.body.appendChild(link);
                    link.click();
                }).catch((err) => {
                    // If the network is done but the page errors, update the store with an error message and display it on the Job Application Details page
                    console.log(err);
                    this.errorStatus.message = "Failed to download resume. Please refresh page and try again.";
                    this.$store.commit('updateResumeStatus', this.errorStatus);
                });
            }
        }
    }
</script>

<style scoped>
    @media only screen and (min-width: 768px) {

        .downloadButton {
            width: 70%;
            font-size: 1rem;
            padding: 10%;
        }
    }

    @media only screen and (min-width: 1024px) {

        .downloadButton {
            width: 40%;
            font-size: 0.8rem;
            padding: 4%;
        }
    }
</style>