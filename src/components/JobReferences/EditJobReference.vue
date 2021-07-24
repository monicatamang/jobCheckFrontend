<template>
    <v-dialog v-model="dialog" max-width="600px">
        <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on" id="editButton">Edit</v-btn>
        </template>
        <v-card>
            <v-card-title>Edit Job Reference</v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="replaceJobReference.name" label="Name" :color="primaryColor"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="replaceJobReference.position" label="Job Position" :color="primaryColor"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="replaceJobReference.companyName" label="Company" :color="primaryColor"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="replaceJobReference.companyAddress" label="Address" :color="primaryColor"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="replaceJobReference.postalCode" label="Postal Code" :color="primaryColor"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="replaceJobReference.city" label="City" :color="primaryColor"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="replaceJobReference.province" label="Province" :color="primaryColor"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="replaceJobReference.email" label="Email" :color="primaryColor"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="replaceJobReference.phoneNumber" label="Phone Number" :color="primaryColor"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-textarea v-model="replaceJobReference.notes" label="Notes" auto-grow clearable clear-icon="mdi-close-circle" :color="primaryColor"></v-textarea>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="formButtons" large color="grey" text @click="dialog = false">Cancel</v-btn>
                <v-btn class="formButtons" large :color="primaryColor" text @click="editJobReference(); dialog = false">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "edit-job-reference",

        props: {
            jobRefId: Number
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
                replaceJobReference: {
                    loginToken: cookies.get("loginToken"),
                    jobRefId: this.jobRefId,
                    name: "",
                    position: undefined,
                    companyName: undefined,
                    companyAddress: "",
                    postalCode: undefined,
                    city: "",
                    province: "",
                    email: "",
                    phoneNumber: "",
                    notes: ""
                }
            }
        },

        methods: {
            // Creating a PATCH request to update a user's job reference
            editJobReference() {
                // Configuring the request with the url, type and data
                axios.request({
                url: `${process.env.VUE_APP_API_URL}/job-references`,
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                data: this.replaceJobReference
                }).then((res) => {
                    // If the network is done and there are no errors, delete the old connection and insert the updated job reference in the store
                    console.log(res);
                    for(let i = 0; i < this.currentJobReferences.length; i++) {
                        if(this.currentJobReferences[i].jobRefId === this.jobRefId) {
                            let editedJobRef = {
                                index: i,
                                jobRef: res.data
                            }
                            this.$store.commit('deleteJobReference', editedJobRef.index)
                            this.$store.commit('editJobReference', editedJobRef);
                        }
                    }
                    // Notifying the store and show a success message to the user
                    this.successStatus.message = "Your job reference was successfully updated";
                    this.$store.commit('updateJobReferenceStatus', this.successStatus);
                }).catch((err) => {
                    // If the network is done but the page errors, notify the store and show an error message to the user
                    console.log(err);
                    this.errorStatus.message = "Failed to update job reference. Please refresh the page and try again.";
                    this.$store.commit('updateJobReferenceStatus', this.errorStatus);
                });
            }
        },

        computed: {
            // Getting all the user's job references from the store
            currentJobReferences() {
                return this.$store.state.allJobReferences; 
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