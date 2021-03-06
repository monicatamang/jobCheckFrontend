<template>
    <section>
        <status-alert :showStatus="showInterviewStatus"></status-alert>
        <mobile-header></mobile-header>
        <view-interview-details :details="singleInterviewDetails" @sendUpdatedInterviewToDetailsPage="updateInterviewOnPage"></view-interview-details>
    </section>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";
    import StatusAlert from "../components/MobileHeader.vue";
    import MobileHeader from "../components/MobileHeader.vue";
    import ViewInterviewDetails from "../components/Interviews/ViewInterviewDetails.vue";

    export default {
        name: "Interview-Details",

        components: {
            StatusAlert,
            MobileHeader,
            ViewInterviewDetails
        },

        data() {
            return {
                loginToken: cookies.get("loginToken"),
                singleInterviewDetails: [
                    {
                        interviewId: Number(this.$route.params.interviewId),
                        jobAppId: Number(this.$route.params.jobAppId),
                        company: this.$route.params.company,
                        jobPosition: this.$route.params.jobPosition,
                        interviewDate: this.$route.params.interviewDate,
                        interviewTime: this.$route.params.interviewTime,
                        interviewTimePeriod: this.$route.params.interviewTimePeriod,
                        interviewTimeZone: this.$route.params.interviewTimeZone,
                        interviewType: this.$route.params.interviewType,
                        interviewLocation: this.$route.params.interviewLocation,
                        notes: this.$route.params.notes
                    }
                ],
            }
        },

        methods: {
            // Creating a GET request to get one of the user's interviews
            getSingleInterview() {
                // Configuring the request with the url, type and data
                axios.request({
                url: `${process.env.VUE_APP_API_URL}/interviews`,
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                params: {
                    userId: cookies.get("userData").userId,
                    interviewId: Number(this.$route.params.interviewId)
                }
                }).then((res) => {
                    // If the network is done and there are no errors, replace the interview details received from route with the returned data
                    console.log(res);
                    this.singleInterviewDetails = res.data;
                }).catch((err) => {
                    // If the network is done but the page errors, update the store with a error message and display it to the user on the page
                    console.log(err);
                    let errorStatus = {
                    show: true,
                    message: "Failed to get interviews. Please refresh the page and try again.",
                    icon: "mdi-alert-circle",
                    color: "#B34C59"
                    }
                    this.$store.commit('updateInterviewStatus', errorStatus);
                });
            },

            // Listening to the View Interview Details component for when an interview is updated
            updateInterviewOnPage(data) {
                // If a user's interview is updated, get the updated interview from the API
                if(data) {
                    this.getSingleInterview();
                }
            }
        },

        computed: {
            // Getting the API request status from the store when getting the user's interviews
            showInterviewStatus() {
                return this.$store.state.interviewStatus; 
            }
        },

        mounted() {
            // If the user does not have a login token, take the user back to the Home page
            if(this.loginToken === null || this.loginToken === '') {
                this.$router.push("/");
            }

            // If the user's interview data is undefined, send a GET request to get one of the user's interviews
            if(this.$route.params.interviewId !== undefined && this.$route.params.jobAppId === undefined && this.$route.params.company === undefined && this.$route.params.jobPosition === undefined && this.$route.params.interviewDate === undefined && this.$route.params.interviewTime === undefined && this.$route.params.interviewTimePeriod === undefined && this.$route.params.salaryAmount === undefined && this.$route.params.interviewTimeZone === undefined && this.$route.params.interviewLocation === undefined && this.$route.params.notes === undefined) {
                this.getSingleInterview();
            }
        }
    }
</script>

<style scoped>
    section {
        background: var(--backgroundColorOne);
    }

    @media only screen and (min-width: 768px) {

        .v-alert {
            width: 100%;
        }
    }

    @media only screen and (min-width: 1024px) {

        .v-alert {
            width: 85%;
            left: 15%;
            font-size: 1rem;
        }
    }
</style>