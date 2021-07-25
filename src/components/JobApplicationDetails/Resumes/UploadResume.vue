<template>
    <div class="px-6 py-5">
        <h4 class="pb-3" id="heading">Resume</h4>
        <!-- Show statement if the user has an existing resume -->
        <h4 class="mb-5" v-if="resumeId !== undefined && (isResumeDeleted === false || resumeIsUploaded === true)">Please delete your current resume before uploading a new resume.</h4>
        <!-- Show file and upload buttons if the user did not upload a resume -->
        <v-form v-if="resumeId === undefined || isResumeDeleted === true">
            <input type="file" name="resumeFile" id="resumeFile">
            <v-btn class="mt-3" dark depressed :color="primaryColor" @click="uploadResumeFile">Upload</v-btn>
        </v-form>
        <!-- Show the download and delete buttons if the user has an existing resume -->
        <v-container>
            <v-row>
                <v-col cols="4" class="ml-n3" v-if="isResumeDeleted === false || resumeIsUploaded === true">
                    <download-resume :resumeId="resumeId"></download-resume>
                </v-col>
                <v-col cols="3" class="ml-3" v-if="isResumeDeleted === false || resumeIsUploaded === true">
                    <delete-resume :resumeId="resumeId" @resumeIsDeleted="hideDownloadAndDeleteResumeButton"></delete-resume>
                </v-col>
                <v-spacer></v-spacer>
            </v-row>
        </v-container>
        <!-- Show the user's last upload date if the user has uploaded a cover letter -->
        <h4 v-if="resumeId !== undefined && (isResumeDeleted === false || resumeIsUploaded === true)" class="mt-3">Last upload on {{ resumeCreatedDate }}</h4>
    </div>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";
    import DeleteResume from "./DeleteResume.vue";
    import DownloadResume from "./DownloadResume.vue";

    export default {
        name: "upload-resume",

        components: {
            DownloadResume,
            DeleteResume
        },

        // Receiving the job application id from the View Job Application Details component
        props: {
            jobAppId: Number
        },

        data() {
            return {
                loginToken: cookies.get("loginToken"),
                resumeId: undefined,
                isResumeDeleted: false,
                resumeIsUploaded: false,
                resumeCreatedDate: "",
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
            // Creating a POST request that will allow a user to upload their resume
            uploadResumeFile() {
                // Creating formData that takes the resume file, login token and job application id as keys with their corresponding values
                let formData = new FormData();
                formData.append('resumeFile', document.getElementById("resumeFile").files[0]);
                formData.append('loginToken', this.loginToken);
                formData.append('jobAppId', this.jobAppId);

                // Configuring the request with the url, type and data
                axios.request({
                    url: `${process.env.VUE_APP_API_URL}/upload-resume`,
                    method: "POST",
                    headers: {
                    "Content-Type": "multipart/form-data"
                    },
                    data: formData
                }).then((res) => {
                    // If the network is done and there are no errors, store the resume id and creation date as variables
                    console.log(res);
                    this.resumeId = res.data.resumeId;
                    this.resumeCreatedDate = res.data.createdAt;
                    // Stating the that resume has been uploaded to hide the file and upload buttons
                    this.resumeIsUploaded = true;
                    // Updating the store with a success message and display it on the Job Application Details page
                    this.successStatus.message = "Your resume was successfully uploaded.";
                    this.$store.commit('updateResumeStatus', this.successStatus);
                }).catch((err) => {
                    // If the network is done but the page errors, update the store with an error message and display it on the Job Application Details page
                    console.log(err);
                    this.errorStatus.message = "Failed to upload resume. Please refresh the page and try again.";
                    this.$store.commit('updateResumeStatus', this.errorStatus);
                });
            },

            // Creating a GET request that will get the user's existing resume data
            getSingleResume() {
                // Configuring the request with the url, type and data
                axios.request({
                url: `${process.env.VUE_APP_API_URL}/resume-file`,
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Login-Token": `${this.loginToken}`
                },
                params: {
                    jobAppId: this.jobAppId
                }
            }).then((res) => {
                // If the network is done but a resume file doesn't exist, don't display a message to the user
                if(res.status === 204) {
                    console.log(res);
                } 
                // If the network is done and a resume file exist, store the resume id and creation date as variables
                else {
                    this.resumeId = res.data.resumeId;
                    this.resumeCreatedDate = res.data.createdAt;
                }
            }).catch((err) => {
                // If the network is done but the page errors, update the store with an error message and display it on the Job Application Details page
                console.log(err);
                this.errorStatus.message = "Failed to download resume. Please refresh page and try again.";
                this.$store.commit('updateResumeStatus', this.errorStatus);
            });
            },

            // Listening to the Delete Resume component for when a user deletes their existing resume
            hideDownloadAndDeleteResumeButton(data) {
                // When the user deletes their resume, hide the download and delete buttons
                this.isResumeDeleted = data;
            }
        },

        mounted() {
            // When the page refreshes, get the user's resume file
            this.getSingleResume();

            // Clearing any messages shown to the user
            this.$store.commit('updateResumeStatus', this.clearStatus);
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