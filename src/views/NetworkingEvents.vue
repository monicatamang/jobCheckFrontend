<template>
    <section>
        <status-alert :showStatus="showNetworkingEventStatus"></status-alert>
        <mobile-header></mobile-header>
        <tablet-side-nav></tablet-side-nav>
        <div id="searchBarContainer">
            <h1>Networking</h1>
            <search-networking-event></search-networking-event>
        </div>
        <v-chip-group mandatory active-class="black--text">
            <v-chip outlined @click="all = true; upcoming = false; attended = false">All</v-chip>
            <v-chip outlined @click="upcoming = true; all = false; attended = false">Upcoming</v-chip>
            <v-chip outlined @click="attended = true; all = false; upcoming = false">Attended</v-chip>
        </v-chip-group>
        <h4>{{ showSearchNetworkingEventStatus }}</h4>
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
    import SearchNetworkingEvent from "../components/NetworkingEvents/SearchNetworkingEvent.vue";
    import NetworkingEventCard from "../components/NetworkingEvents/NetworkingEventCard.vue";
    import MobileBottomNav from "../components/MobileBottomNav.vue";
    import TabletSideNav from "../components/TabletSideNav.vue";

    export default {
        name: "Networking-Events",

        components: {
            StatusAlert,
            MobileHeader,
            AddNetworkingEvent,
            SearchNetworkingEvent,
            NetworkingEventCard,
            MobileBottomNav,
            TabletSideNav
        },

        data() {
            return {
                loginToken: cookies.get("loginToken"),
                all: false,
                upcoming: false,
                attended: false,
                clearStatus: {
                    show: false,
                    message: "",
                    icon: "",
                    color: ""
                }
            }
        },

        computed: {
            // Getting the API request status from the store when a user gets, creates, edits or deletes a networking event
            showNetworkingEventStatus() {
                return this.$store.state.networkingEventStatus; 
            },

            userNetworkingEvents() {
                // Getting the user's 'Upcoming' networking events from the store
                if(this.upcoming) {
                    return this.$store.getters.upcomingNetworkingEvents;
                }

                // Getting the user's 'Attended' networking events from the store
                if(this.attended) {
                    return this.$store.getters.attendedNetworkingEvents;
                }

                // Getting all the user's networking events from the store
                return this.$store.state.allNetworkingEvents;
            },

            // Getting the API request status from the store when a user searches for a networking event
            showSearchNetworkingEventStatus() {
                return this.$store.state.searchNetworkingEventStatus;
            }
        },

        mounted() {
            // If the user does not have a login token, take the user back to the Home page
            if(this.loginToken === null || this.loginToken === '') {
                this.$router.push("/");
            }

            // If the networking events are not shown on the page, get all the user's networking events from the store
            if(this.userNetworkingEvents.length <= 0) {
                this.$store.dispatch('getNetworkingEvents', cookies.get("userData").userId);
            }

            // Clearing any messages printed to the user
            this.$store.commit('updateNetworkingEventStatus', this.clearStatus);
            this.$store.commit('updateSearchNetworkingEventStatus', "");
        },
    }
</script>

<style scoped>
    section {
        margin-top: 7vh;
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
        border-bottom: 1px solid rgba(211, 211, 211, 0.3);
    }

    h1 {
        font-family: var(--titleFont);
        text-transform: uppercase;
        font-weight: 800;
        color: var(--primaryColor);
        margin-top: 3vh;
        font-size: 1.4rem;
        letter-spacing: 1px;
    }

    h4, .v-chip-group {
        position: relative;
    }

    .v-chip-group {
        top: 19vh;
    }

    h4 {
        top: 22vh;
        font-family: var(--titleFont);
        font-weight: 400;
    }

    @media only screen and (min-width: 768px) {

        section {
            margin-top: 0vh;
        }

        h1 {
            font-size: 1.8em;
        }

        #searchBarContainer {
            top: 0;
            padding-bottom: 2%;
            left: 10%;
        }

        .v-chip-group {
            top: 20vh;
            left: 10%;
        }

        .v-chip {
            font-size: 1.05rem;
        }

        h4 {
            left: 10%;
            font-size: 1.2rem;
        }

        .v-alert {
            width: 80%;
            left: 20%;
            font-size: 1.2rem;
        }
    }

    @media only screen and (min-width: 1024px) {

        h1 {
            font-size: 2rem;
        }

        .v-chip-group {
            top: 30vh;
            left: -23%;
        }

        .v-chip {
            font-size: 0.8rem;
        }

        #searchBarContainer {
            padding-bottom: 1%;
            left: 6%;
        }

        h4 {
            left: 5%;
            top: 40vh;
        }

        .v-alert {
            width: 85%;
            left: 15%;
            font-size: 1rem;
        }
    }
</style>