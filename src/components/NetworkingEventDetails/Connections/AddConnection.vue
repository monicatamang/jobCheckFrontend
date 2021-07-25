<template>
    <v-dialog v-model="dialog" max-width="600px">
        <template v-slot:activator="{ on, attrs }">
            <v-btn depressed block dark large fixed tile :color="primaryColor" id="addButton" v-bind="attrs" v-on="on"><v-icon>mdi-plus</v-icon>Add Connection</v-btn>
        </template>
        <v-card>
            <v-card-title>Create a Connection</v-card-title>
            <v-card-subtitle class="mb-n5 mt-3">* Indicates required field</v-card-subtitle>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="newConnection.name" label="Name*" :color="primaryColor" required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="newConnection.company" label="Company" :color="primaryColor"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="newConnection.role" label="Role" :color="primaryColor"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="newConnection.email" label="Email" :color="primaryColor"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="newConnection.phoneNumber" label="Phone Number" :color="primaryColor"></v-text-field>
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
                <v-btn class="formButtons" large :color="primaryColor" text @click="createConnection(); dialog = false">Add</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "add-connection",

        // Receiving the networking event id from the View Networking Event Details component
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
                newConnection: {
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
            // Creating a POST request to create a new connection
            createConnection() {
                // Configuring the request with the url, type and data
                axios.request({
                url: `${process.env.VUE_APP_API_URL}/networking-connections`,
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                data: this.newConnection
                }).then((res) => {
                    // If the network is done and there are no errors, add the new connection to the store
                    console.log(res);
                    // Updating the store with a success message and displaying it on the Networking Event Details page
                    this.successStatus.message = "You have successfully added a connection";
                    this.$store.commit('updateNetworkingEventStatus', this.successStatus);
                    // Notifying the View Networking Events Details component that a connection has been added
                    this.$emit('connectionAdded', res.data);
                }).catch((err) => {
                    // If the network is done and the page errors, update the store with an error message and display it on the Networking Event Details page
                    console.log(err);
                    this.errorStatus.message = "Failed to add a connection. Please refresh the page and try again.";
                    this.$store.commit('updateNetworkingEventStatus', this.errorStatus);
                });
            }
        }
    }
</script>

<style scoped>
    #addButton {
        font-family: var(--titleFont);
        bottom: 0;
    }

    .v-card__title {
        font-family: var(--titleFont);
    }

    .v-text-field, .v-menu {
        font-family: var(--bodyFont);
    }

    .formButtons {
        text-transform: capitalize;
        font-family: var(--titleFont);
        font-size: 1rem;
    }    
</style>