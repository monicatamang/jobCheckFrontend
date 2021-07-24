<template>
    <div class="px-6 py-5">
        <h4 class="pb-3" id="heading">Resume</h4>
        <h4 class="mb-5" v-if="resumeId !== undefined && (isResumeDeleted === false || resumeIsUploaded === true)">Please delete your current resume before uploading a new resume.</h4>
        <v-form v-if="resumeId === undefined || isResumeDeleted === true">
            <input type="file" name="resumeFile" id="resumeFile">
            <v-btn class="mt-3" dark depressed :color="primaryColor" @click="uploadResumeFile">Upload</v-btn>
        </v-form>
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
                clearResumeStatus: {
                    show: false,
                    message: "",
                    icon: "",
                    color: ""
                }
            }
        },

        methods: {
            uploadResumeFile() {
                let formData = new FormData();
                formData.append('resumeFile', document.getElementById("resumeFile").files[0]);
                formData.append('loginToken', this.loginToken);
                formData.append('jobAppId', this.jobAppId);

                axios.request({
                    url: `${process.env.VUE_APP_API_URL}/upload-resume`,
                    method: "POST",
                    headers: {
                    "Content-Type": "multipart/form-data"
                    },
                    data: formData
                }).then((res) => {
                    console.log(res);
                    this.resumeId = res.data.resumeId;
                    this.resumeCreatedDate = res.data.createdAt;
                    this.resumeIsUploaded = true;
                    this.successStatus.message = "Your resume was successfully uploaded.";
                    this.$store.commit('updateResumeStatus', this.successStatus);
                }).catch((err) => {
                    console.log(err);
                    this.errorStatus.message = "Failed to upload resume. Please refresh the page and try again.";
                    this.$store.commit('updateResumeStatus', this.errorStatus);
                });
            },

            getSingleResume() {
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
                if(res.status === 204) {
                    console.log(res);
                } else {
                    this.resumeId = res.data.resumeId;
                    this.resumeCreatedDate = res.data.createdAt;
                }
            }).catch((err) => {
                console.log(err);
                this.errorStatus.message = "Failed to download resume. Please refresh page and try again.";
                this.$store.commit('updateResumeStatus', this.errorStatus);
            });
            },

            hideDownloadAndDeleteResumeButton(data) {
                this.isResumeDeleted = data;
            }
        },

        mounted() {
            this.getSingleResume();
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