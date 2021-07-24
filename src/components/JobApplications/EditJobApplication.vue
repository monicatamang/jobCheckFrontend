<template>
    <v-dialog v-model="dialog" max-width="600px">
        <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on" id="editButton">Edit</v-btn>
        </template>
        <v-card>
            <v-card-title>Edit Job Application</v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="editJobApp.jobPostingUrl" label="Job Posting URL" :color="primaryColor"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="editJobApp.company" label="Company" :color="primaryColor"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="editJobApp.position" label="Position" :color="primaryColor"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="editJobApp.location" label="Location" :color="primaryColor"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="editJobApp.employmentType" label="Employment Type" hint="Full-Time, Part-Time, Contract, etc." :color="primaryColor"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-row>
                                <v-col cols="6">
                                    <v-text-field v-model="editJobApp.salaryAmount" label="Salary" prepend-inner-icon="mdi-currency-usd" :color="primaryColor"></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-select v-model="editJobApp.salaryRate" label="Salary Rate" :items="salaryRates" :color="primaryColor"></v-select>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12">
                            <v-menu ref="menu" v-model="startDateMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field v-model="editJobApp.startDate" :color="primaryColor" label="Start Date" prepend-inner-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" clearable clear-icon="mdi-close-circle"></v-text-field>
                                </template>
                                <v-date-picker v-model="editJobApp.startDate" :color="primaryColor" no-title scrollable @input="startDateMenu = false"></v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-col cols="12">
                            <v-menu ref="menu" v-model="dueDateMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field v-model="editJobApp.dueDate" :color="primaryColor" label="Due Date" prepend-inner-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" clearable clear-icon="mdi-close-circle"></v-text-field>
                                </template>
                                <v-date-picker v-model="editJobApp.dueDate" :color="primaryColor" no-title scrollable @input="dueDateMenu = false"></v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-col cols="12">
                            <v-select v-model="editJobApp.status" label="Application Status" :items="statusOptions" :color="primaryColor"></v-select>
                        </v-col>
                        <v-col cols="12">
                            <v-menu ref="menu" v-model="appliedDateMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field v-model="editJobApp.appliedDate" :color="primaryColor" label="Applied Date" prepend-inner-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" clearable clear-icon="mdi-close-circle"></v-text-field>
                                </template>
                                <v-date-picker v-model="editJobApp.appliedDate" :color="primaryColor" no-title scrollable @input="appliedDateMenu = false"></v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-col cols="12">
                            <v-textarea v-model="editJobApp.notes" label="Notes" auto-grow clearable clear-icon="mdi-close-circle" :color="primaryColor"></v-textarea>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="formButtons" large color="grey" text @click="dialog = false">Cancel</v-btn>
                <v-btn class="formButtons" large :color="primaryColor" text @click="editJobApplication(); dialog = false">Save</v-btn>
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
            jobAppId: Number
        },

        data() {
            return {
                dialog: false,
                primaryColor: "#52688F",
                secondaryColor: "#E3E7F1",
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
                editJobApp: {
                    loginToken: cookies.get("loginToken"),
                    jobAppId: this.jobAppId,
                    jobPostingUrl: "",
                    company: "",
                    position: "",
                    location: "",
                    employmentType: "",
                    salaryAmount: undefined,
                    salaryRate: "",
                    startDate: undefined,
                    dueDate: undefined,
                    status: "",
                    appliedDate: undefined,
                    notes: ""
                }
            }
        },

        methods: {
            // Creating a PATCH request to update a user's job application
            editJobApplication() {
                // Configuring the request with the url, type and data
                axios.request({
                url: `${process.env.VUE_APP_API_URL}/job-applications`,
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                data: this.editJobApp
                }).then((res) => {
                    // If the network is done and there are no errors, delete the old job application and insert the updated job application in the store
                    console.log(res);
                    for(let i = 0; i < this.currentJobApps.length; i++) {
                        if(this.currentJobApps[i].jobAppId === this.jobAppId) {
                            let editedJobApp = {
                                index: i,
                                jobApp: res.data
                            }
                            this.$store.commit('deleteJobApp', editedJobApp.index)
                            this.$store.commit('editJobApp', editedJobApp);
                            this.$emit('jobAppUpdated', true);
                        }
                    }
                    // Notifying the store and show a success message to the user
                    this.successStatus.message = "Your job application was successfully updated";
                    this.$store.commit('updateJobAppStatus', this.successStatus);
                }).catch((err) => {
                    // If the network is done but the page errors, notify the store and show an error message to the user
                    console.log(err);
                    this.errorStatus.message = "Failed to update job application. Please refresh the page and try again.";
                    this.$store.commit('updateJobAppStatus', this.errorStatus);
                });
            }
        },

        computed: {
            // Getting all the user's job applications from the store
            currentJobApps() {
                return this.$store.state.allJobApps; 
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