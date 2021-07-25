<template>
    <div class="px-6 pt-2">
        <h4 class="pb-3" id="heading">Cover Letter</h4>
        <!-- Show statement if the user has an existing cover letter -->
        <h4 class="mb-4" v-if="coverLetterId !== undefined && (isCoverLetterDeleted === false || coverLetterIsUploaded === true)">Please delete your current cover letter before uploading a new cover letter.</h4>
        <!-- Show file and upload buttons if the user did not upload a cover letter -->
        <v-form v-if="coverLetterId === undefined || isCoverLetterDeleted === true">
            <input type="file" name="coverLetterFile" id="coverLetterFile">
            <v-btn class="mt-3" dark depressed :color="primaryColor" @click="uploadCoverLetterFile">Upload</v-btn>
        </v-form>
        <!-- Show the download and delete buttons if the user has an existing cover letter -->
        <v-container>
            <v-row>
                <v-col cols="4" class="ml-n3" v-if="isCoverLetterDeleted === false || coverLetterIsUploaded">
                    <download-cover-letter :coverLetterId="coverLetterId"></download-cover-letter>
                </v-col>
                <v-col cols="3" class="ml-3" v-if="isCoverLetterDeleted === false || coverLetterIsUploaded">
                    <delete-cover-letter :coverLetterId="coverLetterId" @coverLetterIsDeleted="hideDownloadAndDeleteCoverLetterButton"></delete-cover-letter>
                </v-col>
                <v-spacer></v-spacer>
            </v-row>
        </v-container>
        <!-- Show the user's last upload date if the user has uploaded a cover letter -->
        <h4 v-if="coverLetterId !== undefined && (isCoverLetterDeleted === false || coverLetterIsUploaded === true)">Last upload on {{ coverLetterCreatedDate }}</h4>
    </div>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";
    import DeleteCoverLetter from "./DeleteCoverLetter.vue";
    import DownloadCoverLetter from "./DownloadCoverLetter.vue";

    export default {
        name: "upload-cover-letter",

        components: {
            DeleteCoverLetter,
            DownloadCoverLetter
        },

        // Receiving the job application id from the View Job Application Details component
        props: {
            jobAppId: Number
        },

        data() {
            return {
                loginToken: cookies.get("loginToken"),
                coverLetterId: undefined,
                isCoverLetterDeleted: false,
                coverLetterIsUploaded: false,
                coverLetterCreatedDate: "",
                primaryColor: "#52688F",
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
                clearStatus: {
                    show: false,
                    message: "",
                    icon: "",
                    color: ""
                }
            }
        },

        methods: {
            // Creating a POST request that will allow a user to upload their cover letter
            uploadCoverLetterFile() {
                // Creating formData that takes the cover letter file, login token and job application id as keys with their corresponding values
                let formData = new FormData();
                formData.append('coverLetterFile', document.getElementById("coverLetterFile").files[0])
                formData.append('loginToken', this.loginToken);
                formData.append('jobAppId', this.jobAppId);
                
                // Configuring the request with the url, type and data
                axios.request({
                    url: `${process.env.VUE_APP_API_URL}/upload-cover-letter`,
                    method: "POST",
                    headers: {
                    "Content-Type": "multipart/form-data"
                    },
                    data: formData
                }).then((res) => {
                    // If the network is done and there are no errors, store the cover letter id and creation date as variables
                    console.log(res);
                    this.coverLetterId = res.data.coverLetterId;
                    this.coverLetterCreatedDate = res.data.createdAt;
                    // Stating that the user has uploaded a cover letter to hide the file and upload buttons
                    this.coverLetterIsUploaded = true;
                    // Updating the store with a success message and displaying it on the Job Application Details page
                    this.successStatus.message = "Your cover letter was successfully uploaded.";
                    this.$store.commit('updateCoverLetterStatus', this.successStatus);
                }).catch((err) => {
                    // If the network is done but the page errors, update the store with an error message and display it on the Job Application Details page
                    console.log(err);
                    this.errorStatus.message = "Failed to upload cover letter. Please refresh the page and try again.";
                    this.$store.commit('updateCoverLetterStatus', this.errorStatus);
                });
            },

            // Creating a GET request that will get the user's existing cover letter data
            getSingleCoverLetter() {
                // Configuring the request with the url, type and data
                axios.request({
                    url: `${process.env.VUE_APP_API_URL}/cover-letter-file`,
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Login-Token": `${this.loginToken}`
                    },
                    params: {
                        jobAppId: this.jobAppId
                    }
                }).then((res) => {
                    // If the network is done but a cover letter file doesn't exist, don't display a message to the user
                    if(res.status === 204) {
                        console.log(res);
                    } 
                    // If the network is done and the response returned is 200, set the cover letter id and creation date as variables
                    else {
                        this.coverLetterId = res.data.coverLetterId;
                        this.coverLetterCreatedDate = res.data.createdAt;
                    }
                }).catch((err) => {
                    // If the network is done but the page errors, update the store with an error message and display it on the Job Application Details page
                    console.log(err);
                    this.errorStatus.message = "Failed to download cover letter. Please refresh page and try again.";
                    this.$store.commit('updateCoverLetterStatus', this.errorStatus);
                });
            },

            // Listening to the Delete Cover Letter component for when a user deletes their existing cover letter
            hideDownloadAndDeleteCoverLetterButton(data) {
                // When the user's cover letter is deleted, hide the download and delete buttons
                this.isCoverLetterDeleted = data;
            }
        },

        mounted() {
            // When the page refreshes, call the API that gets the user's existing cover letter file data
            this.getSingleCoverLetter();

            // Clearing any messages shown to the user
            this.$store.commit('updateCoverLetterStatus', this.clearStatus);
        }
    }
</script>

<style scoped>
    .v-btn {
        text-transform: capitalize;
    }

    h4, h5 {
        font-weight: 400;
    }

    div {
        background: var(--backgroundColorTwo);
    }

    #heading {
        font-size: 1rem;
        font-weight: 600;
    }
</style>