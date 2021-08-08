<template>
    <v-dialog v-model="dialog" max-width="600px">
        <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on" id="editButton">Edit</v-btn>
        </template>
        <v-card>
            <v-card-title>Edit Interview</v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="3">
                            <v-menu ref="menu" v-model="dateMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field v-model="replaceInterview.interviewDate" :color="primaryColor" label="Date" prepend-inner-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" clearable clear-icon="mdi-close-circle"></v-text-field>
                                </template>
                                <v-date-picker v-model="replaceInterview.interviewDate" :color="primaryColor" no-title scrollable @input="dateMenu = false"></v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-row>
                                <v-col cols="6">
                                    <v-text-field v-model="replaceInterview.interviewTime" label="Start Time" hint="HH:MM" :color="primaryColor"></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-select v-model="replaceInterview.interviewTimePeriod" label="AM/PM" :items="timePeriods" :color="primaryColor"></v-select>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12" sm="3">
                            <v-text-field v-model="replaceInterview.interviewTimeZone" label="Time Zone" hint="MST, EST, PST, etc." :color="primaryColor"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="replaceInterview.interviewType" label="Type of Interview" hint="In-Person, Phone, Video Conference, etc." :color="primaryColor"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="replaceInterview.interviewLocation" label="Location" :color="primaryColor"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-textarea v-model="replaceInterview.notes" label="Notes" auto-grow clearable clear-icon="mdi-close-circle" :color="primaryColor"></v-textarea>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="formButtons" large color="grey" text @click="dialog = false">Cancel</v-btn>
                <v-btn class="formButtons" large :color="primaryColor" text @click="editInterview(); dialog = false">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "edit-job-application",

        // Receiving the interview id from the Interview Card component
        props: {
            interviewId: Number
        },

        data() {
            return {
                dialog: false,
                primaryColor: "#52688F",
                timePeriods: ['AM', 'PM'],
                dateMenu: false,
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
                replaceInterview: {
                    loginToken: cookies.get("loginToken"),
                    interviewId: this.interviewId,
                    interviewDate: "",
                    interviewTime: undefined,
                    interviewTimePeriod: "",
                    interviewTimeZone: "",
                    interviewType: "",
                    interviewLocation: "",
                    notes: ""
                }
            }
        },

        methods: {
            // Creating a PATCH request to update a user's interview
            editInterview() {
                // Configuring the request with the url, type and data
                axios.request({
                url: `${process.env.VUE_APP_API_URL}/interviews`,
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                data: this.replaceInterview
                }).then((res) => {
                    // If the network is done and there are no errors, delete the old interview and insert the updated interview in the store
                    res;
                    for(let i = 0; i < this.currentInterviews.length; i++) {
                        if(this.currentInterviews[i].interviewId === this.interviewId) {
                            let editedInterview = {
                                index: i,
                                interview: res.data
                            }
                            this.$store.commit('deleteInterview', editedInterview.index);
                            this.$store.commit('editInterview', editedInterview);
                            // Notify the Interview Card component and View Interiew Details component that an interview has been updated
                            this.$emit('interviewUpdated', true);
                        }
                    }
                    // Updating the store with a success message and displaying it to the user on the Interviews page
                    this.successStatus.message = "Your interview was successfully updated";
                    this.$store.commit('updateInterviewStatus', this.successStatus);
                }).catch((err) => {
                    // If the network is done but the page errors, update the store with an error message and display it to the user on the Interviews page
                    err;
                    this.errorStatus.message = "Failed to update interview. Please refresh the page and try again.";
                    this.$store.commit('updateInterviewStatus', this.errorStatus);
                });
            }
        },

        computed: {
            // Getting all the user's interviews from the store
            currentInterviews() {
                return this.$store.state.allInterviews;
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

        #editButton {
            font-size: 1.3rem;
        }
    }

    @media only screen and (min-width: 1024px) {

        #editButton {
            font-size: 0.9rem;
        }
    }
</style>