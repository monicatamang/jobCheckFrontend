<template>
    <div class="px-6 pt-2">
        <h4 class="pb-3" id="heading">Cover Letter</h4>
        <h4 class="mb-4" v-if="coverLetterId !== undefined">Please delete your current cover letter before uploading a new cover letter.</h4>
        <v-form>
            <input type="file" name="coverLetterFile" id="coverLetterFile">
            <v-btn class="mt-3" dark depressed :color="primaryColor" @click="uploadCoverLetterFile">Upload</v-btn>
        </v-form>
        <v-container v-if="isCoverLetterDeleted === false">
            <v-row>
                <v-col cols="4" class="ml-n3">
                    <download-cover-letter :coverLetterId="coverLetterId"></download-cover-letter>
                </v-col>
                <v-col cols="3" class="ml-3">
                    <delete-cover-letter :coverLetterId="coverLetterId" @coverLetterIsDeleted="hideDownloadAndDeleteCoverLetterButton"></delete-cover-letter>
                </v-col>
                <v-spacer></v-spacer>
            </v-row>
        </v-container>
        <h4 v-if="coverLetterId !== undefined">Last upload on {{ coverLetterCreatedDate }}</h4>
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

        props: {
            jobAppId: Number
        },

        data() {
            return {
                loginToken: cookies.get("loginToken"),
                coverLetterId: undefined,
                isCoverLetterDeleted: false,
                coverLetterExists: false,
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
                }
            }
        },

        methods: {
            uploadCoverLetterFile() {
                let formData = new FormData();
                formData.append('coverLetterFile', document.getElementById("coverLetterFile").files[0])
                formData.append('loginToken', this.loginToken);
                formData.append('jobAppId', this.jobAppId);

                axios.request({
                    url: `${process.env.VUE_APP_API_URL}/upload-cover-letter`,
                    method: "POST",
                    headers: {
                    "Content-Type": "multipart/form-data"
                    },
                    data: formData
                }).then((res) => {
                    console.log(res);
                    this.coverLetterId = res.data.coverLetterId;
                    this.coverLetterCreatedDate = res.data.createdAt;
                    this.successStatus.message = "Your cover letter was successfully uploaded.";
                    this.$store.commit('updateCoverLetterStatus', this.successStatus);
                }).catch((err) => {
                    console.log(err);
                    this.errorStatus.message = "Failed to upload cover letter. Please refresh the page and try again.";
                    this.$store.commit('updateCoverLetterStatus', this.errorStatus);
                });
            },

            getSingleCoverLetter() {
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
                    console.log(res);
                    this.coverLetterId = res.data.coverLetterId;
                    this.coverLetterCreatedDate = res.data.createdAt;
                }).catch((err) => {
                    console.log(err);
                    this.errorStatus.message = "Failed to download cover letter. Please refresh page and try again.";
                    this.$store.commit('updateCoverLetterStatus', this.errorStatus);
                });
            },

            hideDownloadAndDeleteCoverLetterButton(data) {
                this.isCoverLetterDeleted = data;
            }
        },

        mounted() {
            if(this.coverLetterExists) {
                this.getSingleCoverLetter();
            }
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