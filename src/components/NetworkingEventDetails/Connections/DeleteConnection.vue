<template>
    <v-dialog v-model="dialog" width="500px">
        <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on">Delete</v-btn>
        </template>
        <v-card>
            <v-card-title>Confirm Deletion</v-card-title>
            <v-card-subtitle class="mt-5">Are you sure you want to permanently delete this connection and all of its contents?</v-card-subtitle>
            <v-card-actions>
                <v-btn text color="grey" @click="dialog = false">Cancel</v-btn>
                <v-btn text color="#B34C59" @click="deleteConnection(); dialog = false">Delete</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "delete-connection",

        props: {
            connectionId: Number
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
            // Creating a DELETE request to delete a user's connection
            deleteConnection() {
                // Configuring the request with the url, type and data
                axios.request({
                url: `${process.env.VUE_APP_API_URL}/networking-connections`,
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                data: {
                    loginToken: cookies.get("loginToken"),
                    connectionId: this.connectionId
                }
                }).then((res) => {
                    // If the network is done and there are not errors, find the index of the deleted connection and send it to the store
                    console.log(res);
                    for(let i = 0; i < this.currentConnections.length; i++) {
                        if(this.currentConnections[i].connectionId === this.connectionId) {
                            let index = i;
                            this.$store.commit('deleteConnection', index);
                        }
                    }
                    // Notifying the store that the user's networking event is deleted and showing a success message to the user
                    this.successStatus.message = "Your connection was successfully deleted";
                    this.$store.commit('updateNetworkingEventStatus', this.successStatus);
                }).catch((err) => {
                    // If the network is done but the page errors, notify the store and show an error message to the user
                    console.log(err);
                    this.errorStatus.message = "Failed to delete connection. Please refresh the page and try again.";
                    this.$store.commit('updateNetworkingEventStatus', this.errorStatus);
                });
            }
        },

        computed: {
            // Getting all the user's connections from the store
            currentConnections() {
                return this.$store.state.allConnections;
            }
        },
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