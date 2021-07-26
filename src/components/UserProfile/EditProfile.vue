<template>
    <v-dialog v-model="dialog" max-width="600px">
        <template v-slot:activator="{ on, attrs }">
            <v-btn small fab text outlined :color="primaryColor" v-bind="attrs" v-on="on" class="ml-n3">
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-card-title>Edit Profile</v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="editedProfile.firstName" label="First Name" :color="primaryColor"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="editedProfile.lastName" label="Last Name" :color="primaryColor"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="editedProfile.email" label="Email" :color="primaryColor"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field type="password" v-model="editedProfile.password" label="Password" :color="primaryColor"></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="formButtons" large color="grey" text @click="dialog = false">Cancel</v-btn>
                <v-btn class="formButtons" large :color="primaryColor" text @click="editProfile(); dialog = false">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "edit-profile",

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
                editedProfile: {
                    loginToken: cookies.get("loginToken"),
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: ""
                }
            }
        },

        methods: {
            // Creating a PATCH request to update a user
            editProfile() {
                // Configuring the request with the url, type and data
                axios.request({
                url: `${process.env.VUE_APP_API_URL}/users`,
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                data: this.editedProfile
                }).then((res) => {
                    // If the network is done and there are no errors, update the user's cookie
                    console.log(res);
                    let updatedUserProfile = JSON.stringify(res.data);
                    cookies.set("userData", updatedUserProfile);
                    // Notify the User Profile page that the user has been updated
                    this.$emit('userProfileUpdated', res.data);
                    // Update the store with a success message and display it on the User's Profile page
                    this.successStatus.message = "Your profile was successfully updated";
                    this.$store.commit('updateUserProfileStatus', this.successStatus);
                }).catch((err) => {
                    // If the network is done but the page errors, update the store with an error message and display it on the User's Profile page
                    console.log(err);
                    this.errorStatus.message = "Failed to update profile. Please refresh the page and try again.";
                    this.$store.commit('updateUserProfileStatus', this.errorStatus);
                });
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