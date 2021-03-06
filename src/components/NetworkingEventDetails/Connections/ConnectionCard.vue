<template>
    <div class="connectionsContainer" v-if="networkingEventId">
        <div v-for="connection in connections" :key="connection.connectionId" class="connectionCard px-md-3 pb-md-5 pt-md-8">
            <div v-if="networkingEventId === connection.networkingEventId">
                <v-container>
                    <v-row>
                        <v-col cols="10" class="align-self-center">
                            <h4 class="name">{{ connection.name }}</h4>
                        </v-col>
                        <v-col cols="2">
                            <v-menu offset-y>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn dark text color="black" v-bind="attrs" v-on="on">
                                        <v-icon class="ml-n6 mr-sm-n10 mr-md-n3">mdi-dots-horizontal</v-icon>
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
                <a :href="`mailto:${connection.email}`" v-if="connection.email !== '' && connection.email !== null" target="_blank">{{ connection.email }}</a>
                <h4 v-if="connection.phoneNumber !== '' && connection.phoneNumber !== null">{{ connection.phoneNumber }}</h4>
                <a v-if="connection.linkedIn !== '' && connection.linkedIn !== null" :href="connection.LinkedIn" target="_blank">{{ connection.linkedIn }}</a>
                <a :href="connection.website" v-if="connection.website !== '' || connection.website !== null" target="_blank">{{ connection.website }}</a>
                <h4 v-if="connection.other !== '' && connection.other !== null">{{ connection.other }}</h4>
                <h4 v-if="connection.notes !== '' && connection.notes !== null" class="heading mt-5">Notes:</h4>
                <h4 v-if="connection.notes !== '' && connection.notes !== null">{{ connection.notes }}</h4>
            </div>
        </div>
    </div>
</template>

<script>
    import EditConnection from "./EditConnection.vue";
    import DeleteConnection from "./DeleteConnection.vue";

    export default {
        name: "connection-card",

        components: {
            EditConnection,
            DeleteConnection
        },

        // Receiving the user's connections and networking event id from the View Networking Event Details component
        props: {
            connections: Array,
            networkingEventId: Number
        },
    }
</script>

<style scoped>
    .connectionsContainer {
        display: grid;
        place-items: center;
    }

    .connectionsContainer {
        padding: 3vh 0vw 5vh 0vw;
        row-gap: 15px;
        width: 100%;
        background: var(--backgroundColorTwo);
    }

    .connectionCard {
        width: 90%;
    }

    .connectionCard > div {
        display: grid;
        justify-items: start;
        align-items: center;
        row-gap: 5px;
        box-shadow: 0px 0px 5px rgba(82, 104, 143, 0.25);
        background: white;
        width: 100%;
        padding: 2% 3% 5% 3%;
    }

    .connectionCard > h4, .connectionCard a {
        margin-left: 12px;
    }

    .v-application a {
        text-decoration: none;
        color: black;
    }

    .heading {
        font-weight: 600;
    }

    .name {
        color: var(--primaryColor);
        font-weight: 700;
        padding: 0%;
    }

    h4 {
        font-size: 1rem;
        font-weight: 400;
        padding: 0% 4%;
    }

    @media only screen and (min-width: 768px) {

        .connectionCard {
            height: 100%;
            width: 70%;
        }

        .connectionCard > div {
            row-gap: 8px;
        }

        h4, a {
            font-size: 1.2rem;
        }

        .connectionCard > h4, .connectionCard a {
            margin-left: 18px;
            justify-self: start;
        }

        .name {
            margin-left: 5px;
        }
    }

    @media only screen and (min-width: 1024px) {

        .connectionsContainer {
            grid-template-columns: repeat(2, 1fr);
            padding-bottom: 0%;
            row-gap: 0px;
        }

        .connectionCard {
            row-gap: 10px;
            width: 100%;
        }

        h4, a {
            font-size: 0.8rem;
        }
    }
</style>