<template>
    <div class="px-6 pt-2">
        <h4 class="pb-3">Cover Letter</h4>
        <h5 v-if="coverLetterId !== undefined">Please delete your current resume before uploading a new resume.</h5>
        <v-form>
            <input type="file" name="coverLetterFile" id="coverLetterFile">
            <v-btn class="mt-3" dark depressed :color="primaryColor" @click="uploadCoverLetterFile">Upload</v-btn>
        </v-form>
        <delete-cover-letter :coverLetterId="coverLetterId"></delete-cover-letter>
        <h5 v-if="coverLetterId !== undefined">Lastest Upload on {{ coverLetterCreatedDate }}</h5>
        <download-cover-letter :coverLetterId="coverLetterId"></download-cover-letter>
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
                coverLetterId: undefined,
                coverLetterCreatedDate: ""
            }
        },

        methods: {
            uploadCoverLetterFile() {
                let formData = new FormData();
                formData.append('coverLetterFile', document.getElementById("coverLetterFile").files[0])
                formData.append('loginToken', this.loginToken)
                formData.append('jobAppId', 2)

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
        },
    }
</script>

<style scoped>
    .v-btn {
        text-transform: capitalize;
    }

    h5 {
        font-weight: 400;
    }

    div {
        background: var(--backgroundColorTwo);
    }

    h4 {
        font-size: 1rem;
        font-weight: 600;
    }
</style>