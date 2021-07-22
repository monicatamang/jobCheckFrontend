<template>
    <v-btn outlined :color="primaryColor" v-if="coverLetterId !== undefined" @click="deleteCoverLetterFile">Delete</v-btn>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "delete-cover-letter",

        props: {
            coverLetterId: Number
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
            }
        },

        methods: {
            deleteCoverLetterFile() {
                axios.request({
                    url: `${process.env.VUE_APP_API_URL}/upload-cover-letter`,
                    method: "DELETE",
                    headers: {
                    "Content-Type": "application/json"
                    },
                    data: { 
                        loginToken: cookies.get("loginToken"),
                        coverLetterId: this.coverLetterId
                    }
                }).then((res) => {
                    console.log(res);
                    this.successStatus.message = "Your cover letter was succesfully deleted.";
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
        width: 28%;
    }
</style>