<template>
    <section>
        <status-alert :showStatus="showNetworkingEventStatus"></status-alert>
        <mobile-header></mobile-header>
        <view-networking-event-details :details="networkingEventDetails" :connections="userConnections"></view-networking-event-details>
    </section>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";
    import StatusAlert from "../components/StatusAlert.vue";
    import MobileHeader from "../components/MobileHeader.vue";
    import ViewNetworkingEventDetails from "../components/NetworkingEventDetails/ViewNetworkingEventDetails.vue";

    export default {
        name: "Networking-Event-Details",

        components: {
            StatusAlert,
            MobileHeader,
            ViewNetworkingEventDetails,
        },

        data() {
            return {
                loginToken: cookies.get("loginToken"),
                clearNetworkingEventStatus: {
                    show: false,
                    message: "",
                    icon: "",
                    color: ""
                },
                networkingEventDetails: [
                    {
                        networkingEventId: this.$route.params.networkingEventId,
                        eventName: this.$route.params.eventName,
                        eventDate: this.$route.params.eventDate,
                        startTime: this.$route.params.startTime,
                        startTimePeriod: this.$route.params.startTimePeriod,
                        endTime: this.$route.params.endTime,
                        endTimePeriod: this.$route.params.endTimePeriod,
                        timeZone: this.$route.params.timeZone,
                        eventType: this.$route.params.eventType,
                        eventLocation: this.$route.params.eventLocation,
                        eventStatus: this.$route.params.eventStatus,
                        notes: this.$route.params.notes,
                    }
                ]
            }
        },

        methods: {
            // Getting a specific networking event from the store
            getSingleNetworkingEvent() {
                // Configuring the request with the url, type and data
                axios.request({
                url: `${process.env.VUE_APP_API_URL}/networking-events`,
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                params: {
                    userId: cookies.get("userData").userId,
                    networkingEventId: Number(this.$route.params.networkingEventId)
                }
                }).then((res) => {
                    // If the network is done and there are no errors, store the user's networking events
                    console.log(res);
                    this.networkingEventDetails = res.data;
                }).catch((err) => {
                    // If the network is done but the page errors, show a error message to the user
                    console.log(err);
                    let errorStatus = {
                    show: true,
                    message: "Failed to get networking event. Please refresh the page and try again.",
                    icon: "mdi-alert-circle",
                    color: "#B34C59"
                    }
                    // Updating the error message
                    this.$store.commit('updateNetworkingEventStatus', errorStatus);
                });
            }
        },

        computed: {
            showNetworkingEventStatus() {
                return this.$store.state.networkingEventStatus; 
            },

            userConnections() {
                return this.$store.state.allConnections;
            }
        },

        mounted() {
            // If the user does not have a login token, take the user back to the Home page
            if(this.loginToken === null || this.loginToken === '') {
                this.$router.push("/");
            }

            // If the user's networking event data is undefined, send a GET request to get one of the user's networking events
            if(this.$route.params.networkingEventId !== undefined && this.$route.params.eventName === undefined && this.$route.params.eventDate === undefined && this.$route.params.startTime === undefined && this.$route.params.startTimePeriod === undefined && this.$route.params.timeZone === undefined && this.$route.params.eventType === undefined && this.$route.params.eventLocation === undefined && this.$route.params.eventStatus === undefined && this.$route.params.notes === undefined) {
                this.getSingleNetworkingEvent();
            }

            // Clearing any messages printed to the user
            this.$store.commit('updateNetworkingEventStatus', this.clearNetworkingEventStatus);

            // Getting all the user's connections from the store
            this.$store.dispatch('getConnections', cookies.get("userData").userId);
        },
    }
</script>

<style scoped>

</style>