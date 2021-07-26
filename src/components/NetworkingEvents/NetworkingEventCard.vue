<template>
    <article id="networkingEventCardsContainer">
        <div v-for="networkingEvent in networkingEvents" :key="networkingEvent.networkingEventId" class="networkingEventCard px-sm-6 pb-sm-9 pt-sm-7">
            <v-container>
                <v-row>
                    <v-col cols="9" v-if="networkingEvent.eventStatus === 'Upcoming'">
                        <v-chip label :color="secondaryColor" :text-color="primaryColor">{{ networkingEvent.eventStatus.toUpperCase() }}</v-chip>
                    </v-col>
                    <v-col cols="9" v-if="networkingEvent.eventStatus === 'Attended'">
                        <v-chip label :color="secondaryColor" :text-color="primaryColor">{{ networkingEvent.eventStatus.toUpperCase() }}</v-chip>
                    </v-col>
                    <v-col cols="3">
                        <v-menu offset-y>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn dark text color="black" v-bind="attrs" v-on="on">
                                    <v-icon class="mr-n3 mr-sm-n12">mdi-dots-horizontal</v-icon>
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item>
                                    <edit-networking-event :networkingEventId="networkingEvent.networkingEventId"></edit-networking-event>
                                </v-list-item>
                                <v-list-item>
                                    <delete-networking-event :networkingEventId="networkingEvent.networkingEventId"></delete-networking-event>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </v-col>
                </v-row>
            </v-container>
            <h4 class="eventName ml-3">{{ networkingEvent.eventName }}</h4>
            <h4 class="ml-3">Date: {{ networkingEvent.eventDate }}</h4>
            <h4 class="ml-3" v-if="(networkingEvent.endTime !== null && networkingEvent.endTime !== '') && (networkingEvent.endTimePeriod !== null && networkingEvent.endTimePeriod !== '')">Time: {{ networkingEvent.startTime }} {{ networkingEvent.startTimePeriod }} - {{ networkingEvent.endTime }} {{ networkingEvent.endTimePeriod }} ({{ networkingEvent.timeZone }})</h4>
            <h4 class="ml-3" v-if="(networkingEvent.endTime === null || networkingEvent.endTime === '')">Time: {{ networkingEvent.startTime }} {{ networkingEvent.startTimePeriod }} ({{ networkingEvent.timeZone }})</h4>
            <router-link :to="{ 
                name: 'NetworkingEventDetails',
                params: {
                    networkingEventId: networkingEvent.networkingEventId,
                    eventName: networkingEvent.eventName,
                    eventDate: networkingEvent.eventDate,
                    startTime: networkingEvent.startTime,
                    startTimePeriod: networkingEvent.startTimePeriod,
                    endTime: networkingEvent.endTime,
                    endTimePeriod: networkingEvent.endTimePeriod,
                    timeZone: networkingEvent.timeZone,
                    eventType: networkingEvent.eventType,
                    eventLocation: networkingEvent.eventLocation,
                    eventStatus: networkingEvent.eventStatus,
                    notes: networkingEvent.notes
                } 
            }" class="ml-3">View Details <v-icon small>mdi-arrow-right</v-icon></router-link>
        </div>
    </article>
</template>

<script>
    import EditNetworkingEvent from "./EditNetworkingEvent.vue";
    import DeleteNetworkingEvent from "./DeleteNetworkingEvent.vue";

    export default {
        name: "networking-event-card",

        components: {
            EditNetworkingEvent,
            DeleteNetworkingEvent
        },

        // Receiving the user's networking events from the View Networking Event Details component
        props: {
            networkingEvents: Array
        },

        data() {
            return {
                primaryColor: "#52688F",
                secondaryColor: "#E3E7F1"
            }
        }
    }
</script>

<style scoped>
    .eventName {
        color: var(--primaryColor);
        font-weight: 700;
    }

    .v-chip {
        letter-spacing: 1px;
    }

    h4 {
        font-weight: 400;
    }

    #networkingEventCardsContainer {
        display: grid;
        place-items: center;
        row-gap: 2vh;
        margin: 20vh 0vw 15vh 0vw;
        width: 100%;
    }

    .networkingEventCard {
        display: grid;
        justify-items: start;
        align-items: center;
        row-gap: 13px;
        background: white;
        box-shadow: 0px 0px 5px rgba(82, 104, 143, 0.251);
        padding: 4% 4% 6% 4%;
        width: 90%;
    }

    .v-btn {
        text-transform: capitalize;
    }

    a {
        text-decoration: none;
    }

    .v-application a {
        color: black;
    }

    .v-list-item__title {
        font-family: var(--bodyFont);
    }

    .v-list {
        z-index: -1;
    }

    @media only screen and (min-width: 768px) {
        
        .networkingEventCard {
            height: 100%;
            width: 100%;
        }

        #networkingEventCardsContainer {
            margin-left: 20%;
            width: 55%;
            margin-top: 22vh;
            margin-bottom: 10vh;
        }

        h4, a {
            font-size: 1.15rem;
        }

        .v-chip {
            font-size: 1rem;
        }
    }
</style>