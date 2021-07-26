<template>
    <article>
        <div v-for="detail in details" :key="detail.networkingEventId">
            <v-container>
                <v-row>
                    <v-col cols="9" sm="11">
                        <v-btn text class="mt-16 mt-sm-5" @click="goToNetworkingEventsPage"><v-icon>mdi-keyboard-backspace</v-icon>Back</v-btn>
                    </v-col>
                    <v-col cols="3" sm="1">
                        <v-menu offset-y>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn dark text color="black" v-bind="attrs" v-on="on" class="mt-16 mt-sm-5">
                                    <v-icon class="mr-n5 ml-sm-n16">mdi-dots-horizontal</v-icon>
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item>
                                    <edit-networking-event :networkingEventId="detail.networkingEventId" @networkingEventDetailsUpdated="handleUpdatedNetworkEventDetails"></edit-networking-event>
                                </v-list-item>
                                <v-list-item>
                                    <delete-networking-event :networkingEventId="detail.networkingEventId"></delete-networking-event>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </v-col>
                </v-row>
            </v-container>
            <h3 class="event">{{ detail.eventName }}</h3>
            <h3>{{ detail.eventDate }}</h3>
            <h3 v-if="detail.endTime !== null && detail.endTimePeriod !== ''">{{ detail.startTime }} {{ detail.startTimePeriod }} - {{ detail.endTime }} {{ detail.endTimePeriod }} ({{ detail.timeZone }})</h3>
            <h3 v-else-if="detail.endTime === null && detail.endTime === ''">{{ detail.startTime }} {{ detail.startTimePeriod }} ({{ detail.timeZone }})</h3>
            <v-chip label :color="secondaryColor" :text-color="primaryColor">{{ detail.eventStatus }}</v-chip>
            <v-tabs centered background-color="transparent" :color="primaryColor" class="mt-3">
                <v-tab>Details</v-tab>
                <v-tab>Connections</v-tab>
                <v-tab-item>
                    <div class="detailsContainer px-8 pt-5 pt-sm-10">
                        <div>
                            <h4 class="heading">Type of Networking Event</h4>
                            <h4 v-if="detail.eventType !== ''">{{ detail.eventType }}</h4>
                            <h4 v-else-if="detail.eventType === ''">N/A</h4>
                        </div>
                        <div>
                            <h4 class="heading">Location</h4>
                            <h4 v-if="detail.eventLocation !== ''">{{ detail.eventLocation }}</h4>
                            <h4 v-else-if="detail.eventLocation === ''">N/A</h4>
                        </div>
                        <div>
                            <h4 class="heading">Notes</h4>
                            <h4 v-if="detail.notes !== ''">{{ detail.notes }}</h4>
                            <h4 v-else-if="detail.notes === ''">N/A</h4>
                        </div>
                    </div>
                </v-tab-item>
                <v-tab-item>
                    <connection-card :connections="connections" :networkingEventId="detail.networkingEventId"></connection-card>
                    <add-connection :networkingEventId="detail.networkingEventId" @connectionAdded="handleConnectionAdded"></add-connection>
                </v-tab-item>
            </v-tabs>
        </div>
    </article>
</template>

<script>
    import EditNetworkingEvent from "../NetworkingEvents/EditNetworkingEvent.vue";
    import DeleteNetworkingEvent from "../NetworkingEvents/DeleteNetworkingEvent.vue";
    import AddConnection from "../NetworkingEventDetails/Connections/AddConnection.vue";
    import ConnectionCard from "../NetworkingEventDetails/Connections/ConnectionCard.vue";

    export default {
        name: "view-networking-event-details",

        components: {
            EditNetworkingEvent,
            DeleteNetworkingEvent,
            AddConnection,
            ConnectionCard
        },

        // Receiving the user's networking event details and connections from the Networking Event page
        props: {
            details: Array,
            connections: Array
        },

        data() {
            return {
                primaryColor: "#52688F",
                secondaryColor: "#E3E7F1"
            }
        },

        methods: {
            // Creating a function that takes the user to the Networking Events page
            goToNetworkingEventsPage() {
                this.$router.push('/NetworkingEvents');
            },

            // Listening to the Add Connection component and notifying the Networking Event Details page that a connection has been added
            handleConnectionAdded(data) {
                this.$emit('notifyNetworkingEventDetailsPage', data);
            },

            // Listening to the Edit Networking Event component and notifying the Networking Event Details page that a connection has been added
            handleUpdatedNetworkEventDetails(data) {
                this.$emit('notifyParentUpdatedDetails', data);
            }
        }
    }
</script>

<style scoped>
    article {
        background: var(--backgroundColorTwo);
    }

    article > div {
        row-gap: 10px;
        margin-bottom: 3vh;
        width: 100%;
    }

    article, article > div, .detailsContainer, .detailsContainer div {
        display: grid;
    }

    article, article > div {
        place-items: center;
    }

    .v-btn {
        text-transform: capitalize;
        justify-self: start;
    }

    .event {
        color: var(--primaryColor);
        font-weight: 700;
        font-size: 1.3rem;
    }

    .detailsContainer {
        justify-items: start;
        row-gap: 20px;
        background: var(--backgroundColorTwo);
    }

    .detailsContainer div {
        row-gap: 5px;
    }

    .heading {
        font-weight: 600;
    }

    h4 {
        font-size: 1rem;
        font-weight: 400;
    }

    h3 {
        font-weight: 400;
        font-size: 1.1rem;
    }

    @media only screen and (min-width: 768px) {

        article > div {
            width: 90%;
            row-gap: 20px;
            margin: 3vh 0vw 6vh 0vw;
        }

        .event {
            font-size: 1.8rem;
            margin-top: 2vh;
        }

        h3 {
            font-size: 1.6rem;
        }

        h4 {
            font-size: 1.4rem;
        }

        .v-btn, .v-chip {
            font-size: 1.2rem;
        }

        .v-btn .v-icon {
            font-size: 2.2rem;
        }

        .v-tab {
            font-size: 1.2rem;
        }

        .v-chip {
            padding: 20px;
            margin-bottom: 2vh;
        }

        .detailsContainer {
            row-gap: 30px;
        }

        .v-alert {
            width: 100%;
        }
    }
</style>