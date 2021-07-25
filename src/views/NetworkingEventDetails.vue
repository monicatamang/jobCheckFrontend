<template>
    <section>
        <status-alert :showStatus="showNetworkingEventStatus"></status-alert>
        <mobile-header></mobile-header>
        <view-networking-event-details :details="networkingEventDetails" :connections="userConnections" @notifyNetworkingEventDetailsPage="appendConnectionToPage" @notifyParentUpdatedDetails="replaceWithUpdatedDetails"></view-networking-event-details>
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
                clearStatus: {
                    show: false,
                    message: "",
                    icon: "",
                    color: ""
                },
                networkingEventDetails: [
                    {
                        networkingEventId: Number(this.$route.params.networkingEventId),
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
            // Creating a GET request to get a specific networking event
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
                    // Updating the error message in the store
                    this.$store.commit('updateNetworkingEventStatus', errorStatus);
                });
            },

            // Listening to the View Networking Event Details component for when a user adds a networking event
            appendConnectionToPage(data) {
                this.userConnections.unshift(data);
            },

            // Listening to the View Networking Event Details component for when a user edits a networking event
            replaceWithUpdatedDetails(data) {
                // If the user's networking event is edited, get the updated networking event from the API
                if(data) {
                    this.getSingleNetworkingEvent();
                }
            }
        },

        computed: {
            // Getting all the user's networking events from the store
            allCurrentNetworkingEvents() {
                return this.$store.state.allNetworkingEvents;
            },

            // Getting all the user's connection from the store
            userConnections() {
                return this.$store.state.allConnections;
            },

            // Getting the API request status for when a user creates, edits, deletes or gets a networking event
            showNetworkingEventStatus() {
                return this.$store.state.networkingEventStatus; 
            },
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
            this.$store.commit('updateNetworkingEventStatus', this.clearStatus);
        }
    }
</script>

<style scoped>
    section {
        background: var(--backgroundColorOne);
    }
</style>