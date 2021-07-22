<template>
    <v-btn outlined :color="primaryColor" v-if="resumeId !== undefined" @click="deleteResumeFile">Delete</v-btn>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "delete-resume",

        props: {
            resumeId: Number
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
            deleteResumeFile() {
                axios.request({
                    url: `${process.env.VUE_APP_API_URL}/upload-resume`,
                    method: "DELETE",
                    headers: {
                    "Content-Type": "application/json"
                    },
                    data: {
                        loginToken: cookies.get("loginToken"),
                        resumeId: this.resumeId
                    }
                }).then((res) => {
                    console.log(res);
                    this.successStatus.message = "Your resume was succesfully deleted.";
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
        width: 28%;
    }
</style>