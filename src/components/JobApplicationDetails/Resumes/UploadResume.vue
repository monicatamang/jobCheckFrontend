<template>
    <div>
        <h5 v-if="resumeId !== undefined">Please delete your current resume before uploading a new resume.</h5>
        <v-form>
            <input type="file" name="resumeFile" id="resumeFile">
            <v-btn class="mt-3" dark depressed :color="primaryColor" @click="uploadResumeFile">Upload</v-btn>
        </v-form>
        <delete-resume :resumeId="resumeId"></delete-resume>
        <h5 v-if="resumeId !== undefined">Lastest Upload on {{ resumeCreatedDate }}</h5>
        <download-resume :resumeId="resumeId"></download-resume>
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
                loginToken: cookies.get("loginToken"),
                resumeId: undefined,
                resumeCreatedDate: ""
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
                    this.successStatus.message = "Your resume was successfully uploaded.";
                    this.$store.commit('updateResumeStatus', this.successStatus);
                }).catch((err) => {
                    console.log(err);
                    this.errorStatus.message = "Failed to upload resume. Please refresh the page and try again.";
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

    h4, h5 {
        font-weight: 400;
    }
</style>