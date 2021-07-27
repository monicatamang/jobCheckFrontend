<template>
    <v-dialog v-model="dialog" max-width="600px">
        <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on" id="editButton">Edit</v-btn>
        </template>
        <v-card>
            <v-card-title>Edit Networking Event</v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="replaceNetworkingEvent.eventName" label="Event Name" :color="primaryColor"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-menu ref="menu" v-model="eventDateMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field v-model="replaceNetworkingEvent.eventDate" :color="primaryColor" label="Date" prepend-inner-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" clearable clear-icon="mdi-close-circle"></v-text-field>
                                </template>
                                <v-date-picker v-model="replaceNetworkingEvent.eventDate" :color="primaryColor" no-title scrollable @input="eventDateMenu = false"></v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-col cols="12">
                            <v-row>
                                <v-col cols="6">
                                    <v-text-field v-model="replaceNetworkingEvent.startTime" label="Start Time" hint="HH:MM" :color="primaryColor"></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-select v-model="replaceNetworkingEvent.startTimePeriod" label="AM/PM" :items="timePeriods" :color="primaryColor"></v-select>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12">
                            <v-row>
                                <v-col cols="6">
                                    <v-text-field v-model="replaceNetworkingEvent.endTime" label="End Time" hint="HH:MM" :color="primaryColor"></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-select v-model="replaceNetworkingEvent.endTimePeriod" label="AM/PM" :items="timePeriods" :color="primaryColor"></v-select>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="replaceNetworkingEvent.timeZone" label="Time Zone" hint="MST, EST, PST, etc." :color="primaryColor"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="replaceNetworkingEvent.eventType" label="Type of Event" hint="In-Person, Virtual, etc." :color="primaryColor"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="replaceNetworkingEvent.eventLocation" label="Location" :color="primaryColor"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-select v-model="replaceNetworkingEvent.eventStatus" label="Networking Event Status" :items="statusOptions" :color="primaryColor"></v-select>
                        </v-col>
                        <v-col cols="12">
                            <v-textarea v-model="replaceNetworkingEvent.notes" label="Notes" auto-grow clearable clear-icon="mdi-close-circle" :color="primaryColor"></v-textarea>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="formButtons" large color="grey" text @click="dialog = false">Cancel</v-btn>
                <v-btn class="formButtons" large :color="primaryColor" text @click="editNetworkingEvent(); dialog = false">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "edit-job-application",

        props: {
            networkingEventId: Number
        },

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
                replaceNetworkingEvent: {
                    loginToken: cookies.get("loginToken"),
                    networkingEventId: this.networkingEventId,
                    eventName: "",
                    eventDate: undefined,
                    startTime: undefined,
                    startTimePeriod: "",
                    endTime: undefined,
                    endTimePeriod: "",
                    timeZone: "",
                    eventType: "",
                    eventLocation: "",
                    eventStatus: "",
                    notes: ""
                }
            }
        },

        methods: {
            // Creating a PATCH request to update a user's job application
            editNetworkingEvent() {
                // Configuring the request with the url, type and data
                axios.request({
                url: `${process.env.VUE_APP_API_URL}/networking-events`,
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                data: this.replaceNetworkingEvent
                }).then((res) => {
                    // If the network is done and there are no errors, delete the old networking event and insert the updated networking event in the store
                    console.log(res);
                    for(let i = 0; i < this.currentNetworkingEvents.length; i++) {
                        if(this.currentNetworkingEvents[i].networkingEventId === this.networkingEventId) {
                            let editedNetworkingEvent = {
                                index: i,
                                networkingEvent: res.data
                            }
                            this.$store.commit('deleteNetworkingEvent', editedNetworkingEvent.index)
                            this.$store.commit('editNetworkingEvent', editedNetworkingEvent);
                            // Notifying the View Networking Event Details component that the user's networking event has been updated
                            this.$emit('networkingEventDetailsUpdated', true);
                        }
                    }
                    // Updating the store with a success message and displaying it on the Networking Events page
                    this.successStatus.message = "Your networking event was successfully updated";
                    this.$store.commit('updateNetworkingEventStatus', this.successStatus);
                }).catch((err) => {
                    // If the network is done but the page errors, updating the store with an error message and display it on the Networking Events page
                    console.log(err);
                    this.errorStatus.message = "Failed to update networking event. Please refresh the page and try again.";
                    this.$store.commit('updateNetworkingEventStatus', this.errorStatus);
                });
            }
        },

        computed: {
            // Getting all the user's networking events from the store
            currentNetworkingEvents() {
                return this.$store.state.allNetworkingEvents; 
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

    @media only screen and (min-width: 768px) {

        .v-btn {
            font-size: 1.3rem;
        }
    }

    @media only screen and (min-width: 1024px) {

        .v-btn {
            font-size: 0.9rem;
        }

        .formButtons {
            font-size: 1.1rem;
        }
    }
</style>