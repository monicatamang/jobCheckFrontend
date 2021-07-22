<template>
    <v-btn outlined v-if="resumeId !== undefined" @click="getResumeName">Download</v-btn>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "download-resume",

        props: {
            resumeId: Number
        },

        data() {
            return {
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
            getResumeName() {
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
                    console.log(res);
                    this.resumeFilename = res.data;
                    this.downloadResume(this.resumeFilename);
                }).catch((err) => {
                    console.log(err);
                    this.errorStatus.message = "Sorry, something went wrong. Please refresh the page and try again.";
                    this.$store.commit('updateResumeStatus', this.errorStatus);
                });
            },

            downloadResume(resumeFilename) {
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
                    responseType: 'blob'
                }).then((res) => {
                    console.log(res);
                    const url = window.URL.createObjectURL(new Blob([res.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', resumeFilename);
                    document.body.appendChild(link);
                    link.click();
                }).catch((err) => {
                    console.log(err);
                    this.errorStatus.message = "Failed to download resume. Please refresh page and try again.";
                    this.$store.commit('updateResumeStatus', this.errorStatus);
                });
            },
        },
    }
</script>

<style scoped>
    .v-btn {
        width: 28%;
    }
</style>