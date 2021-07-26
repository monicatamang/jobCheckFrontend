<template>
    <v-dialog v-model="dialog" max-width="600px">
        <template v-slot:activator="{ on, attrs }">
            <v-btn depressed block dark large fixed tile :color="primaryColor" id="addButton" v-bind="attrs" v-on="on"><v-icon>mdi-plus</v-icon>Add Networking Event</v-btn>
        </template>
        <v-card>
            <v-card-title>Create Networking Event</v-card-title>
            <v-card-subtitle class="mb-n5 mt-3">* Indicates required field</v-card-subtitle>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="newNetworkingEvent.eventName" label="Event Name*" :color="primaryColor" required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-menu ref="menu" v-model="eventDateMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field v-model="newNetworkingEvent.eventDate" :color="primaryColor" label="Date*" prepend-inner-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" clearable clear-icon="mdi-close-circle" required></v-text-field>
                                </template>
                                <v-date-picker v-model="newNetworkingEvent.eventDate" :color="primaryColor" no-title scrollable @input="eventDateMenu = false"></v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-col cols="12">
                            <v-row>
                                <v-col cols="6">
                            <v-text-field v-model="newNetworkingEvent.startTime" label="Start Time*" hint="HH:MM" :color="primaryColor" required></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-select v-model="newNetworkingEvent.startTimePeriod" label="AM/PM*" :items="timePeriods" :color="primaryColor" required></v-select>
                            </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12">
                            <v-row>
                                <v-col cols="6">
                            <v-text-field v-model="newNetworkingEvent.endTime" label="End Time" hint="HH:MM" :color="primaryColor"></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-select v-model="newNetworkingEvent.endTimePeriod" label="AM/PM" :items="timePeriods" :color="primaryColor"></v-select>
                            </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="newNetworkingEvent.timeZone" label="Time Zone*" hint="MST, EST, PST, etc." :color="primaryColor" required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="newNetworkingEvent.eventType" label="Type of Event" hint="In-Person, Virtual, etc." :color="primaryColor"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="newNetworkingEvent.eventLocation" label="Location" :color="primaryColor"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-select v-model="newNetworkingEvent.eventStatus" label="Networking Event Status*" :items="statusOptions" :color="primaryColor" required></v-select>
                        </v-col>
                        <v-col cols="12">
                            <v-textarea v-model="newNetworkingEvent.notes" label="Notes" auto-grow clearable clear-icon="mdi-close-circle" :color="primaryColor"></v-textarea>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="formButtons" large color="grey" text @click="dialog = false">Cancel</v-btn>
                <v-btn class="formButtons" large :color="primaryColor" text @click="createNetworkingEvent(); dialog = false">Add</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "add-networking-event",

        data() {
            return {
                dialog: false,
                primaryColor: "#52688F",
                timePeriods: ['AM', 'PM'],
                statusOptions: ['Upcoming', 'Attended'],
                eventDateMenu: false,
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
                newNetworkingEvent: {
                    loginToken: cookies.get("loginToken"),
                    eventName: "",
                    eventDate: undefined,
                    startTime: undefined,
                    startTimePeriod: "",
                    endTime: undefined,
                    endTimePeriod: "",
                    timeZone: "",
                    eventLocation: "",
                    eventType: "",
                    eventStatus: "",
                    notes: ""
                }
            }
        },

        methods: {
            // Creating a POST request to create a new networking event
            createNetworkingEvent() {
                // Send the request only if the user has typed content into the input fields
                if(this.eventName !== '' && this.newNetworkingEvent.eventDate !== undefined && this.newNetworkingEvent.startTime !== undefined && this.newNetworkingEvent.startTimePeriod !== '' && this.newNetworkingEvent.endTime !== undefined && this.newNetworkingEvent.endTimePeriod !== '' && this.newNetworkingEvent.timeZone !== '' && this.newNetworkingEvent.eventLocation !== '' && this.newNetworkingEvent.eventType !== '' && this.newNetworkingEvent.eventStatus !== '' && this.newNetworkingEvent.notes !== '') {
                    // Configuring the request with the url, type and data
                    axios.request({
                    url: `${process.env.VUE_APP_API_URL}/networking-events`,
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: this.newNetworkingEvent
                    }).then((res) => {
                        // If the network is done and there are no errors, add the new networking event to the store
                        console.log(res);
                        this.$store.commit('addNewNetworkingEvent', res.data);
                        // Updating the store with a success message and displaying it on the Networking Events page
                        this.successStatus.message = "You have successfully added a networking event";
                        this.$store.commit('updateNetworkingEventStatus', this.successStatus);
                    }).catch((err) => {
                        // If the network is done and the page errors, update the store with an error message and display it on the Networking Events page
                        console.log(err);
                        this.errorStatus.message = "Failed to add networking event. Please refresh the page and try again.";
                        this.$store.commit('updateNetworkingEventStatus', this.errorStatus);
                    });
                }
            }
        }
    }
</script>

<style scoped>
    #addButton {
        font-family: var(--titleFont);
        bottom: 6.9%;
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
    
    @media only screen and (min-width: 768px) {

        #addButton {
            right: 0;
            bottom: 0;
            left: 10%;
        }

        .v-btn.v-size--large {
            font-size: 1.2rem;
            letter-spacing: 1px;
            height: 5%;
        }
    }
</style>