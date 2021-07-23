<template>
    <v-dialog v-model="dialog" width="500px">
        <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on">Delete</v-btn>
        </template>
        <v-card>
            <v-card-title>Confirm Deletion</v-card-title>
            <v-card-subtitle class="mt-5">Are you sure you want to permanently delete this networking event and all of its contents?</v-card-subtitle>
            <v-card-actions>
                <v-btn text color="grey" @click="dialog = false">Cancel</v-btn>
                <v-btn text color="#B34C59" @click="deleteNetworkingEvent(); dialog = false">Delete</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "delete-networking-event",

        props: {
            networkingEventId: Number
        },

        data() {
            return {
                dialog: false,
                errorStatus: {
                    show: true,
                    message: "",
                    icon: "mdi-alert-circle",
                    color: "#B34C59"
                },
                successStatus: {
                    show: true,
                    message: "",
                    icon: "mdi-check-circle",
                    color: "#53AC84"
                }
            }
        },

        methods: {
            // Creating a DELETE request to delete a user's networking event
            deleteNetworkingEvent() {
                // Configuring the request with the url, type and data
                axios.request({
                url: `${process.env.VUE_APP_API_URL}/networking-events`,
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                data: {
                    loginToken: cookies.get("loginToken"),
                    networkingEventId: this.networkingEventId
                }
                }).then((res) => {
                    // If the network is done and there are not errors, find the index of the deleted networking event and send it to the store
                    console.log(res);
                    for(let i = 0; i < this.currentNetworkingEvents.length; i++) {
                        if(this.currentNetworkingEvents[i].networkingEventId === this.networkingEventId) {
                            let index = i;
                            this.$store.commit('deleteNetworkingEvent', index);
                        }
                    }
                    // Notifying the store that the user's networking event is deleted and showing a success message to the user
                    this.successStatus.message = "Your networkinge event was successfully deleted";
                    this.$store.commit('updateNetworkingEventStatus', this.successStatus);
                    // Taking the user to the Networking Events page
                    this.$router.push('/NetworkingEvents');
                }).catch((err) => {
                    // If the network is done but the page errors, notify the store and show an error message to the user
                    console.log(err);
                    this.errorStatus.message = "Failed to delete networking event. Please refresh the page and try again.";
                    this.$store.commit('updateNetworkingEventStatus', this.errorStatus);
                });
            },

            computed: {
                // Getting all the user's networking events from the store
                currentNetworkingEvents() {
                    return this.$store.state.allNetworkingEvents;
                }
            },
        }
    }
</script>

<style scoped>
    .v-btn {
        text-transform: capitalize;
        font-weight: 400;
        font-family: var(--titleFont);
        letter-spacing: 0px;
        font-size: 1rem;
    }
    
    .v-card__title, .v-card__subtitle {
        font-family: var(--titleFont);
    }
</style>