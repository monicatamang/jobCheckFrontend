<template>
    <v-dialog v-model="dialog" max-width="600px">
        <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on">Edit</v-btn>
        </template>
        <v-card>
            <v-card-title>Edit Job Application</v-card-title>
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
                            <v-text-field v-model="createJobApp.position" label="Position*" :color="primaryColor" required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="createJobApp.location" label="Location" :color="primaryColor"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="createJobApp.employmentType" label="Employment Type" hint="Full-Time, Part-Time, Contract, etc." :color="primaryColor"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-row>
                                <v-col cols="6">
                                    <v-text-field v-model="createJobApp.salaryAmount" label="Salary" prepend-inner-icon="mdi-currency-usd" :color="primaryColor"></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-select v-model="createJobApp.salaryRate" label="Salary Rate" :items="salaryRates" :color="primaryColor"></v-select>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12">
                            <v-menu ref="menu" v-model="startDateMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field v-model="createJobApp.startDate" :color="primaryColor" label="Start Date" prepend-inner-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" clearable clear-icon="mdi-close-circle"></v-text-field>
                                </template>
                                <v-date-picker v-model="createJobApp.startDate" :color="primaryColor" no-title scrollable @input="startDateMenu = false"></v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-col cols="12">
                            <v-menu ref="menu" v-model="dueDateMenu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field v-model="createJobApp.dueDate" :color="primaryColor" label="Due Date" prepend-inner-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" clearable clear-icon="mdi-close-circle"></v-text-field>
                                </template>
                                <v-date-picker v-model="createJobApp.dueDate" :color="primaryColor" no-title scrollable @input="dueDateMenu = false"></v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-col cols="12">
                            <v-select v-model="createJobApp.status" label="Application Status*" :items="statusOptions" :color="primaryColor" required></v-select>
                        </v-col>
                        <v-col cols="12">
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
                <v-btn large color="grey" text @click="dialog = false">Cancel</v-btn>
                <v-btn large :color="primaryColor" text @click="editJobApplication(); dialog = false">Add</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "edit-job-application",

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
            editJobApplication() {
                axios.request({
                url: `${process.env.VUE_APP_API_URL}/job-applications`,
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                data: {
                    loginToken: cookies.get("loginToken"),
                    company: this.editJobApp.company,
                    jobPostingUrl: this.editJobApp.jobPostingUrl,
                    jobPosition: this.editJobApp.position,
                    jobLocation: this.editJobApp.location,
                    employmentType: this.editJobApp.employmentType,
                    salaryType: this.editJobApp.salaryRate,
                    salaryAmount: this.editJobApp.salaryAmount,
                    jobStartDate: this.editJobApp.startDate,
                    dueDate: this.editJobApp.dueDate,
                    status: this.editJobApp.status,
                    appliedDate: this.editJobApp.appliedDate,
                    notes: this.editJobApp.notes
                }
                }).then((res) => {
                    console.log(res);
                }).catch((err) => {
                    console.log(err);
                });
            }
        },
    }
</script>

<style scoped>
    .v-btn {
        text-transform: capitalize;
    }

    .v-card__title {
        font-family: var(--titleFont);
    }
</style>