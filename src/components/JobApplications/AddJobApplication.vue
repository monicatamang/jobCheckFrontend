<template>
    <v-dialog v-model="dialog" max-width="600px">
        <template v-slot:activator="{ on, attrs }">
            <v-btn depressed dark large fixed tile :color="primaryColor" id="addButton" v-bind="attrs" v-on="on"><v-icon>mdi-plus</v-icon>Add Application</v-btn>
        </template>
        <v-card>
            <v-card-title>Create Job Application</v-card-title>
            <v-card-subtitle class="mb-n5 mt-3">* Indicates required field</v-card-subtitle>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="createJobApp.jobPostingUrl" label="Job Posting URL" :color="primaryColor"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="createJobApp.company" label="Company*" :color="primaryColor" required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="createJobApp.jobPosition" label="Position*" :color="primaryColor" required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="createJobApp.jobLocation" label="Location" :color="primaryColor"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="createJobApp.employmentType" label="Type of Employment" hint="Full-Time, Part-Time, Contract, etc." :color="primaryColor"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-row>
                                <v-col cols="6">
                                    <v-text-field v-model="createJobApp.salaryAmount" label="Salary" prepend-inner-icon="mdi-currency-usd" :color="primaryColor"></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-select v-model="createJobApp.salaryType" label="Salary Rate" :items="salaryRates" :color="primaryColor"></v-select>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-menu ref="menu" v-model="startDateMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field v-model="createJobApp.jobStartDate" :color="primaryColor" label="Start Date" prepend-inner-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" clearable clear-icon="mdi-close-circle"></v-text-field>
                                </template>
                                <v-date-picker v-model="createJobApp.jobStartDate" :color="primaryColor" no-title scrollable @input="startDateMenu = false"></v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-menu ref="menu" v-model="dueDateMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field v-model="createJobApp.dueDate" :color="primaryColor" label="Due Date" prepend-inner-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" clearable clear-icon="mdi-close-circle"></v-text-field>
                                </template>
                                <v-date-picker v-model="createJobApp.dueDate" :color="primaryColor" no-title scrollable @input="dueDateMenu = false"></v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-select v-model="createJobApp.status" label="Application Status*" :items="statusOptions" :color="primaryColor" required></v-select>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-menu ref="menu" v-model="appliedDateMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field v-model="createJobApp.appliedDate" :color="primaryColor" label="Applied Date" prepend-inner-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" clearable clear-icon="mdi-close-circle"></v-text-field>
                                </template>
                                <v-date-picker v-model="createJobApp.appliedDate" :color="primaryColor" no-title scrollable @input="appliedDateMenu = false"></v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-col cols="12">
                            <v-textarea v-model="createJobApp.notes" label="Notes" auto-grow clearable clear-icon="mdi-close-circle" :color="primaryColor"></v-textarea>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="formButtons" large color="grey" text @click="dialog = false">Cancel</v-btn>
                <v-btn class="formButtons" large :color="primaryColor" text @click="createJobApplication(); dialog = false">Add</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "add-job-application",

        data() {
            return {
                dialog: false,
                primaryColor: "#52688F",
                salaryRates: ['Hourly', 'Weekly', 'Monthly', 'Yearly'],
                statusOptions: ['Not Applied', 'Applied', 'Closed'],
                startDateMenu: false,
                dueDateMenu: false,
                appliedDateMenu: false,
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
                createJobApp: {
                    loginToken: cookies.get("loginToken"),
                    company: "",
                    jobPostingUrl: "",
                    jobPosition: "",
                    jobLocation: "",
                    employmentType: "",
                    salaryAmount: undefined,
                    salaryType: "",
                    jobStartDate: undefined,
                    dueDate: undefined,
                    status: "",
                    appliedDate: undefined,
                    notes: ""
                }
            }
        },

        methods: {
            // Creating a POST request to create a new job application
            createJobApplication() {
                // Configuring the request with the url, type and data
                axios.request({
                url: `${process.env.VUE_APP_API_URL}/job-applications`,
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                data: this.createJobApp
                }).then((res) => {
                    // If the network is done and there are no errors, add the new job application to the store
                    console.log(res);
                    this.$store.commit('addNewJobApp', res.data);
                    // Updating the store with a success message and displaying it on the Job Application page
                    this.successStatus.message = "You have successfully added a job application";
                    this.$store.commit('updateJobAppStatus', this.successStatus);
                }).catch((err) => {
                    // If the network is done and the page errors, update the store with error message and display it on the Job Application page
                    console.log(err);
                    this.errorStatus.message = "Failed to add job application. Please refresh the page and try again.";
                    this.$store.commit('updateJobAppStatus', this.errorStatus);
                });
            }
        }
    }
</script>

<style scoped>
    #addButton {
        font-family: var(--titleFont);
        bottom: 6.9%;
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

    @media only screen and (min-width: 1024px) {

        #addButton {
            position: fixed;
            height: 6vh;
            width: 15%;
            bottom: 63.5vh;
            left: 81vw;
            font-size: 0.7rem;
            border-radius: 40px;
        }
    }
</style>