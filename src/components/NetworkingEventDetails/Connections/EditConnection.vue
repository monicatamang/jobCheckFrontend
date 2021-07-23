<template>
    <v-dialog v-model="dialog" max-width="600px">
        <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on" id="editButton">Edit</v-btn>
        </template>
        <v-card>
            <v-card-title>Edit Connection</v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="newConnection.name" label="Name" :color="primaryColor"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="newConnection.company" label="Company" :color="primaryColor"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-select v-model="newConnection.role" label="Role" :color="primaryColor"></v-select>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="newConnection.email" label="Email" :color="primaryColor"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-select v-model="newConnection.phoneNumber" label="Phone Number" :color="primaryColor"></v-select>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="newConnection.linkedIn" label="LinkedIn" :color="primaryColor"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="newConnection.website" label="Website" :color="primaryColor"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="newConnection.other" label="Other Contact Information" :color="primaryColor"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-textarea v-model="newConnection.notes" label="Notes" auto-grow clearable clear-icon="mdi-close-circle" :color="primaryColor"></v-textarea>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="formButtons" large color="grey" text @click="dialog = false">Cancel</v-btn>
                <v-btn class="formButtons" large :color="primaryColor" text @click="editConnection(); dialog = false">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "edit-connection",

        props: {
            networkingEventId: Number
        },

        data() {
            return {
                dialog: false,
                primaryColor: "#52688F",
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
                },
                replaceConnection: {
                    loginToken: cookies.get("loginToken"),
                    networkingEventId: this.networkingEventId,
                    name: "",
                    company: "",
                    role: "",
                    email: "",
                    phoneNumber: "",
                    linkedIn: "",
                    website: "",
                    other: "",
                    notes: ""
                }
            }
        },

        methods: {
            // Creating a PATCH request to update a user's connection
            editNetworkingEvent() {
                // Configuring the request with the url, type and data
                axios.request({
                url: `${process.env.VUE_APP_API_URL}/networking-connections`,
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                data: this.replaceConnection
                }).then((res) => {
                    // If the network is done and there are no errors, delete the old connection and insert the updated connection in the store
                    console.log(res);
                    for(let i = 0; i < this.currentConnections.length; i++) {
                        if(this.currentConnections[i].connectionId === this.connectionId) {
                            let editedConnection = {
                                index: i,
                                connection: res.data
                            }
                            this.$store.commit('deleteConnection', editedConnection.index)
                            this.$store.commit('editConnection', editedConnection);
                        }
                    }
                    // Notifying the store and show a success message to the user
                    this.successStatus.message = "Your connection was successfully updated";
                    this.$store.commit('updateNetworkingEventStatus', this.successStatus);
                }).catch((err) => {
                    // If the network is done but the page errors, notify the store and show an error message to the user
                    console.log(err);
                    this.errorStatus.message = "Failed to update connection. Please refresh the page and try again.";
                    this.$store.commit('updateNetworkingEventStatus', this.errorStatus);
                });
            }
        },

        computed: {
            // Getting all the user's connections from the store
            currentConnections() {
                return this.$store.state.allConnections; 
            }
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

    .formButtons {
        font-size: 1.1rem;
    }

    .v-card__title {
        font-family: var(--titleFont);
    }

    .v-text-field, .v-menu {
        font-family: var(--bodyFont);
    }
</style>