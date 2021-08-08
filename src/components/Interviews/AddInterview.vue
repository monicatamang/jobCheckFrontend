<template>
    <v-dialog v-model="dialog" max-width="600px">
        <template v-slot:activator="{ on, attrs }">
            <v-btn depressed dark large fixed tile :color="primaryColor" id="addButton" v-bind="attrs" v-on="on"><v-icon>mdi-plus</v-icon>Add Interview</v-btn>
        </template>
        <v-card>
            <v-card-title>Create Interview</v-card-title>
            <v-card-subtitle class="mb-n5 mt-3">* Indicates required field</v-card-subtitle>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-menu ref="menu" v-model="dateMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field v-model="newInterview.interviewDate" :color="primaryColor" label="Date*" prepend-inner-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" clearable clear-icon="mdi-close-circle" required></v-text-field>
                                </template>
                                <v-date-picker v-model="newInterview.interviewDate" :color="primaryColor" no-title scrollable @input="dateMenu = false"></v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-row>
                                <v-col cols="6">
                                    <v-text-field v-model="newInterview.interviewTime" label="Start Time*" hint="HH:MM" :color="primaryColor" required></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-select v-model="newInterview.interviewTimePeriod" label="AM/PM*" :items="timePeriods" :color="primaryColor" required></v-select>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="newInterview.interviewTimeZone" label="Time Zone*" hint="MST, EST, PST, etc." :color="primaryColor" required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="newInterview.interviewType" label="Type of Interview" hint="In-Person, Phone, Video Conference, etc." :color="primaryColor"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="newInterview.interviewLocation" label="Location" :color="primaryColor"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-textarea v-model="newInterview.notes" label="Notes" auto-grow clearable clear-icon="mdi-close-circle" :color="primaryColor"></v-textarea>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="formButtons" large color="grey" text @click="dialog = false">Cancel</v-btn>
                <v-btn class="formButtons" large :color="primaryColor" text @click="createInterview(); dialog = false">Add</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "add-interview",

        // Receiving the job application id from the Interview Card component
        props: {
            jobAppId: Number
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
                newInterview: {
                    loginToken: cookies.get("loginToken"),
                    jobAppId: this.jobAppId,
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
            // Creating a POST request to create a new interview
            createInterview() {
                // Configuring the request with the url, type and data
                axios.request({
                url: `${process.env.VUE_APP_API_URL}/interviews`,
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                data: this.newInterview
                }).then((res) => {
                    // If the network is done and there are no errors, add the new interview to the store
                    res;
                    this.$store.commit('addNewInterview', res.data);
                    // Notifying the View Job Application Details page that a new interview has been created
                    this.$emit("newInterviewCreated", res.data);
                    // Updating the store with a success message to the store and displaying it on the Job Application Details pae
                    this.successStatus.message = "You have successfully added an interview";
                    this.$store.commit('updateInterviewStatus', this.successStatus);
                }).catch((err) => {
                    // If the network is done and the page errors, update the store with an error message and display it on the Job Application Details page
                    err;
                    this.errorStatus.message = "Failed to add interview. Please refresh the page and try again.";
                    this.$store.commit('updateInterviewStatus', this.errorStatus);
                });
            }
        }
    }
</script>

<style scoped>
    #addButton {
        font-family: var(--titleFont);
        bottom: 0%;
        width: 100%;
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
            right: 0%;
            bottom: 0%;
        }

        .v-btn.v-size--large {
            font-size: 1.2rem;
            letter-spacing: 1px;
            height: 5%;
        }
    }

    @media only screen and (min-width: 1024px) {

        #addButton {
            position: fixed;
            height: 6vh;
            width: 15%;
            bottom: 2vh;
            left: 80vw;
            font-size: 0.7rem;
            border-radius: 40px;
        }
    }
</style>