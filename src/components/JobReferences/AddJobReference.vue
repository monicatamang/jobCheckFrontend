<template>
    <v-dialog v-model="dialog" max-width="600px">
        <template v-slot:activator="{ on, attrs }">
            <v-btn depressed dark large fixed tile :color="primaryColor" id="addButton" v-bind="attrs" v-on="on"><v-icon>mdi-plus</v-icon>Add Job Reference</v-btn>
        </template>
        <v-card>
            <v-card-title>Create Job Reference</v-card-title>
            <v-card-subtitle class="mb-n5 mt-3">* Indicates required field</v-card-subtitle>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="newJobReference.name" label="Name*" :color="primaryColor" required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="newJobReference.position" label="Job Position*" :color="primaryColor" required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="newJobReference.companyName" label="Company" :color="primaryColor"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="9">
                            <v-text-field v-model="newJobReference.companyAddress" label="Address" :color="primaryColor"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3">
                            <v-text-field v-model="newJobReference.postalCode" label="Postal Code" :color="primaryColor"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="newJobReference.city" label="City*" :color="primaryColor" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="newJobReference.province" label="Province*" :color="primaryColor" required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="newJobReference.email" label="Email" :color="primaryColor"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="newJobReference.phoneNumber" label="Phone Number" :color="primaryColor"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-textarea v-model="newJobReference.notes" label="Notes" auto-grow clearable clear-icon="mdi-close-circle" :color="primaryColor"></v-textarea>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="formButtons" large color="grey" text @click="dialog = false">Cancel</v-btn>
                <v-btn class="formButtons" large :color="primaryColor" text @click="createJobReference(); dialog = false">Add</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "add-job-reference",

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
                newJobReference: {
                    loginToken: cookies.get("loginToken"),
                    name: "",
                    position: "",
                    companyName: "",
                    companyAddress: "",
                    postalCode: "",
                    city: "",
                    province: "",
                    email: "",
                    phoneNumber: "",
                    notes: ""
                }
            }
        },

        methods: {
            // Creating a POST request to create a new job reference
            createJobReference() {
                // Configuring the request with the url, type and data
                axios.request({
                url: `${process.env.VUE_APP_API_URL}/job-references`,
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                data: this.newJobReference
                }).then((res) => {
                    // If the network is done and there are no errors, add the new job reference to the store
                    console.log(res);
                    this.$store.commit('addNewJobReference', res.data);
                    // Update the store with a success message and display it on the Job References page
                    this.successStatus.message = "You have successfully added a job reference";
                    this.$store.commit('updateJobReferenceStatus', this.successStatus);
                }).catch((err) => {
                    // If the network is done and the page errors, update the store wtih an error message and display it on the Job References page
                    console.log(err);
                    this.errorStatus.message = "Failed to add job reference. Please refresh the page and try again.";
                    this.$store.commit('updateJobReferenceStatus', this.errorStatus);
                });
            }
        }
    }
</script>

<style scoped>
    #addButton {
        font-family: var(--titleFont);
        bottom: 7%;
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
            left: 17.5vw;
        }

        .v-btn.v-size--large {
            font-size: 0.7rem;
            border-radius: 40px;
        }
    }
</style>