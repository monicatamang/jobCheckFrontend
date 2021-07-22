<template>
    <v-btn outlined v-if="coverLetterId !== undefined" @click="getCoverLetterName">Download</v-btn>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "download-cover-letter",

        props: {
            coverLetterId: Number
        },

        data() {
            return {
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
            getCoverLetterName() {
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
                    console.log(res);
                    this.coverLetterFilename = res.data;
                    this.downloadCoverLetter()
                }).catch((err) => {
                    console.log(err);
                    this.errorStatus.message = "Sorry, something went wrong. Please refresh the page and try again.";
                    this.$store.commit('updateCoverLetterStatus', this.errorStatus);
                });
            },

            downloadCoverLetter() {
                axios.request({
                    url: `${process.env.VUE_APP_API_URL}/download-cover-letter/${this.coverLetterFilename}`,
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Login-Token": `${this.loginToken}`
                    },
                    params: {
                        coverLetterId: this.coverLetterId
                    },
                    responseType: 'blob'
                }).then((res) => {
                    console.log(res);
                    const url = window.URL.createObjectURL(new Blob([res.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', this.coverLetterFilename);
                    document.body.appendChild(link);
                    link.click();
                }).catch((err) => {
                    console.log(err);
                    this.errorStatus.message = "Failed to download cover letter. Please refresh page and try again.";
                    this.$store.commit('updateCoverLetterStatus', this.errorStatus);
                });
            },
        },
    }
</script>

<style scoped>

</style>