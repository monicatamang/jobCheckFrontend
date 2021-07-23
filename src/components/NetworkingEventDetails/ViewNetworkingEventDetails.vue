<template>
    <article>
        <div v-for="detail in details" :key="detail.networkingEventId">
            <v-container>
                <v-row>
                    <v-col cols="9">
                        <v-btn text class="mt-16" @click="goToNetworkingEventsPage"><v-icon>mdi-keyboard-backspace</v-icon>Back</v-btn>
                    </v-col>
                    <v-col cols="3">
                        <v-menu offset-y>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn dark text color="black" v-bind="attrs" v-on="on" class="mt-16">
                                    <v-icon class="mr-n5">mdi-dots-horizontal</v-icon>
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item>
                                    <edit-networking-event :networkingEventId="Number(detail.networkingEventId)" @networkingEventDetailsUpdated="handleUpdatedNetworkEventDetails"></edit-networking-event>
                                </v-list-item>
                                <v-list-item>
                                    <delete-networking-event :networkingEventId="Number(detail.networkingEventId)"></delete-networking-event>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </v-col>
                </v-row>
            </v-container>
            <h3 id="event">{{ detail.eventName }}</h3>
            <h3>{{ detail.eventDate }}</h3>
            <h3 v-if="detail.endTime !== null && detail.endTimePeriod !== ''">{{ detail.startTime }} {{ detail.startTimePeriod }} - {{ detail.endTime }} {{ detail.endTimePeriod }} ({{ detail.timeZone }})</h3>
            <h3 v-else-if="detail.endTime === null && detail.endTime === ''">{{ detail.startTime }} {{ detail.startTimePeriod }} ({{ detail.timeZone }})</h3>
            <v-chip label :color="secondaryColor" :text-color="primaryColor">{{ detail.eventStatus }}</v-chip>
            <v-tabs centered background-color="transparent" :color="primaryColor" class="mt-3">
                <v-tab>Details</v-tab>
                <v-tab>Connections</v-tab>
                <v-tab-item>
                    <div id="detailsContainer" class="px-8 pt-5">
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
                    <article class="connectionsContainer">
                        <div v-for="connection in connections" :key="connection.connectionId">
                            <div v-if="detail.networkingEventId === connection.networkingEventId" class="connectionCard">
                                <v-container>
                                    <v-row>
                                        <v-col cols="10" class="align-self-center">
                                            <h4 id="name">{{ connection.name }}</h4>
                                        </v-col>
                                        <v-col cols="2">
                                            <v-menu offset-y>
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-btn dark text color="black" v-bind="attrs" v-on="on">
                                                        <v-icon class="ml-n6">mdi-dots-horizontal</v-icon>
                                                    </v-btn>
                                                </template>
                                                <v-list>
                                                    <v-list-item>
                                                        <edit-connection :connectionId="connection.connectionId"></edit-connection>
                                                    </v-list-item>
                                                    <v-list-item>
                                                        <delete-connection :connectionId="connection.connectionId"></delete-connection>
                                                    </v-list-item>
                                                </v-list>
                                            </v-menu>
                                        </v-col>
                                    </v-row>
                                </v-container>
                                <h4 v-if="connection.company !== '' && connection.company !== null">{{ connection.company }}</h4>
                                <h4 v-if="connection.role !== '' && connection.role !== null">{{ connection.role }}</h4>
                                <a :href="`mailto:${connection.email}`" v-if="connection.email !== '' && connection.email !== null">{{ connection.email }}</a>
                                <h4 v-if="connection.phoneNumber !== '' && connection.phoneNumber !== null">{{ connection.phoneNumber }}</h4>
                                <a v-if="connection.linkedIn !== '' && connection.linkedIn !== null" :href="connection.LinkedIn">{{ connection.linkedIn }}</a>
                                <a :href="connection.website" v-if="connection.website !== '' || connection.website !== null">{{ connection.website }}</a>
                                <h4 v-if="connection.other !== '' && connection.other !== null">{{ connection.other }}</h4>
                                <h4 v-if="connection.notes !== '' && connection.notes !== null" class="heading mt-5">Notes:</h4>
                                <h4 v-if="connection.notes !== '' && connection.notes !== null">{{ connection.notes }}</h4>
                            </div>
                        </div>
                    </article>
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

    export default {
        name: "view-networking-event-details",

        components: {
            EditNetworkingEvent,
            DeleteNetworkingEvent,
            AddConnection
        },

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

            // Listening to the 'AddConnection' component and notifying the Networking Event Details page that a connection has been added
            handleConnectionAdded(data) {
                this.$emit('notifyNetworkingEventDetailsPage', data);
            },

            // Listening to the 'EditNetworkingEvent' component and notifying the Networking Event Details page that a connection has been added
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

    article, article > div, #detailsContainer, #detailsContainer div {
        display: grid;
    }

    article, article > div {
        place-items: center;
    }

    .v-btn {
        text-transform: capitalize;
        justify-self: start;
    }

    #event {
        color: var(--primaryColor);
        font-weight: 700;
        font-size: 1.3rem;
    }

    #detailsContainer {
        justify-items: start;
        row-gap: 20px;
        background: var(--backgroundColorTwo);
    }

    #detailsContainer div {
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

    .connectionsContainer {
        display: grid;
        place-items: center;
        padding: 3vh 0vw 2vh 0vw;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        width: 100%;
        background: var(--backgroundColorTwo);
    }

    .connectionCard {
        display: grid;
        justify-items: start;
        align-items: center;
        row-gap: 5px;
        background: white;
        box-shadow: 0px 0px 5px rgba(82, 104, 143, 0.251);
        padding: 2% 3% 5% 3%;
        width: 90%;
    }

    .connectionCard > h4, .connectionCard a {
        margin-left: 12px;
    }

    .v-application a {
        text-decoration: none;
        color: black;
    }

    #name {
        color: var(--primaryColor);
        font-weight: 700;
    }
</style>