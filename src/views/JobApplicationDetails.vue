<template>
    <section>
        <status-alert :showStatus="showResumeStatus"></status-alert>
        <mobile-header></mobile-header>
        <view-job-application-details :details="jobAppDetails"></view-job-application-details>
    </section>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";
    import StatusAlert from "../components/StatusAlert.vue";
    import MobileHeader from "../components/MobileHeader.vue";
    import ViewJobApplicationDetails from "../components/JobApplicationDetails/ViewJobApplicationDetails.vue";

    export default {
        name: "Job-Application-Details",

        components: {
            StatusAlert,
            MobileHeader,
            ViewJobApplicationDetails
        },

        data() {
            return {
                jobAppDetails: [
                    {
                        jobAppId: Number(this.$route.params.jobAppId),
                        company: this.$route.params.company,
                        jobPostingUrl: this.$route.params.jobPostingUrl,
                        jobPosition: this.$route.params.jobPosition,
                        jobLocation: this.$route.params.jobLocation,
                        employmentType: this.$route.params.employmentType,
                        salaryType: this.$route.params.salaryType,
                        salaryAmount: this.$route.params.salaryAmount,
                        jobStartDate: this.$route.params.jobStartDate,
                        dueDate: this.$route.params.dueDate,
                        status: this.$route.params.status,
                        appliedDate: this.$route.params.appliedDate,
                        notes: this.$route.params.notes
                    }
                ]
            }
        },

        methods: {
            // Creating a GET request to get one of the user's job applications
            getSingleJobApp() {
                // Configuring the request with the url, type and data
                axios.request({
                url: `${process.env.VUE_APP_API_URL}/job-applications`,
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                params: {
                    userId: cookies.get("userData").userId,
                    jobAppId: Number(this.$route.params.jobAppId)
                }
                }).then((res) => {
                    // If the network is done and there are no errors, replace the undefined data with returned data from the API
                    console.log(res);
                    this.jobAppDetails = res.data;
                }).catch((err) => {
                    // If the network is done but the page errors, show a error message to the user
                    console.log(err);
                    let errorStatus = {
                    show: true,
                    message: "Failed to get all job applications. Please refresh the page and try again.",
                    icon: "mdi-alert-circle",
                    color: "#B34C59"
                    }
                    // Updating the error message
                    this.$store.commit('updateJobAppStatus', errorStatus);
                });
            }
        },

        computed: {
            showResumeStatus() {
                return this.$store.state.resumeStatus;
            }
        },

        mounted() {
            // If the user's job application data is undefined, send a GET request to get one of the user's job applications
            if(this.$route.params.jobAppId !== undefined && this.$route.params.company === undefined && this.$route.params.jobPostingUrl === undefined && this.$route.params.jobPosition === undefined && this.$route.params.jobLocation === undefined && this.$route.params.employmentType === undefined && this.$route.params.salaryType === undefined && this.$route.params.salaryAmount === undefined && this.$route.params.jobStartDate === undefined && this.$route.params.dueDate === undefined && this.$route.params.status === undefined && this.$route.params.appliedDate === undefined && this.$route.params.notes === undefined) {
                this.getSingleJobApp();
            }
        }
    }
</script>

<style scoped>

</style>