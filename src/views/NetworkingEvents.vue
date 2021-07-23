<template>
    <section>
        <status-alert :showStatus="showNetworkingEventStatus"></status-alert>
        <mobile-header></mobile-header>
        <div id="searchBarContainer">
            <h1>Networking Events</h1>
        </div>
        <networking-event-card :networkingEvents="userNetworkingEvents"></networking-event-card>
        <add-networking-event></add-networking-event>
        <mobile-bottom-nav :value="2"></mobile-bottom-nav>
    </section>
</template>

<script>
    import cookies from "vue-cookies";
    import StatusAlert from "../components/StatusAlert.vue";
    import MobileHeader from "../components/MobileHeader.vue";
    import AddNetworkingEvent from "../components/NetworkingEvents/AddNetworkingEvent.vue";
    import NetworkingEventCard from "../components/NetworkingEvents/NetworkingEventCard.vue";
    import MobileBottomNav from "../components/MobileBottomNav.vue";

    export default {
        name: "Networking-Events",

        components: {
            StatusAlert,
            MobileHeader,
            AddNetworkingEvent,
            NetworkingEventCard,
            MobileBottomNav
        },

        data() {
            return {
                loginToken: cookies.get("loginToken"),
                clearNetworkingEventStatus: {
                    show: false,
                    message: "",
                    icon: "",
                    color: ""
                }
            }
        },

        computed: {
            showNetworkingEventStatus() {
                return this.$store.state.networkingEventStatus; 
            },

            userNetworkingEvents() {
                return this.$store.state.allNetworkingEvents;
            }
        },

        mounted() {
            // If the user does not have a login token, take the user back to the Home page
            if(this.loginToken === null || this.loginToken === '') {
                this.$router.push("/");
            }

            // Clearing any messages printed to the user
            this.$store.commit('updateNetworkingEventStatus', this.clearNetworkingEventStatus);

            if(this.userNetworkingEvents.length <= 0) {
                this.$store.dispatch('getNetworkingEvents', cookies.get("userData").userId);
            }
        },
    }
</script>

<style scoped>
    h1 {
        font-family: var(--titleFont);
        text-transform: uppercase;
        font-weight: 800;
        color: var(--primaryColor);
        margin-top: 3vh;
        font-size: 1.4rem;
        letter-spacing: 1px;
    }

    section, #searchBarContainer {
        display: grid;
        place-items: center;
    }

    #searchBarContainer {
        row-gap: 3vh;
    }

    #searchBarContainer {
        width: 100%;
        background: white;
        position: fixed;
        top: 6%;
        z-index: 1;
        border-bottom: 1px solid whitesmoke;
    }

    section {
        margin-top: 7vh;
    }
</style>