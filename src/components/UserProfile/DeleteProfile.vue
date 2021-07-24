<template>
    <v-dialog v-model="dialog" width="500px">
        <template v-slot:activator="{ on, attrs }">
            <v-btn text outlined v-bind="attrs" v-on="on" id="deleteProfileButton">Delete Profile</v-btn>
        </template>
        <v-card>
            <v-card-title>Delete Profile</v-card-title>
            <v-card-subtitle class="mt-1">Please re-type your password to confirm</v-card-subtitle>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" class="mt-n5">
                            <v-text-field full-width type="password" v-model="password" single-line label="Password" required :color="primaryColor"></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions class="mt-n8">
                <v-btn text color="grey" @click="dialog = false">Cancel</v-btn>
                <v-btn text color="#B34C59" @click="deleteUserProfile(); dialog = false">Delete</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import axios from "axios";
    import cookies from "vue-cookies";

    export default {
        name: "delete-profile",

        data() {
            return {
                dialog: false,
                password: "",
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
                }
            }
        },

        methods: {
            // Creating a DELETE request to delete a user
            deleteUserProfile() {
                // Configuring the request with the url, type and data
                axios.request({
                url: `${process.env.VUE_APP_API_URL}/users`,
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                data: {
                    loginToken: cookies.get("loginToken"),
                    password: this.password
                }
                }).then((res) => {
                    // If the network is done and there are not errors, delete the user's cookies
                    console.log(res);
                    cookies.remove("loginToken");
                    cookies.remove("userData");
                    // Taking the user to the Home page
                    this.$router.push('/');
                }).catch((err) => {
                    // If the network is done but the page errors, notify the store and show an error message to the user
                    console.log(err);
                    this.errorStatus.message = "Failed to delete profile. Please refresh the page and try again.";
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

    #deleteProfileButton {
        width: 90%;
    }
    
    .v-card__title, .v-card__subtitle {
        font-family: var(--titleFont);
    }
</style>