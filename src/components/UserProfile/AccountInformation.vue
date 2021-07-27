<template>
    <article>
        <v-container> 
            <v-row>
                <v-col cols="10" sm="11">
                    <h3>Account Information</h3>
                </v-col>
                <v-col cols="2" sm="1" class="mt-md-5">
                    <edit-profile @userProfileUpdated="handleUpdatedProfile"></edit-profile>
                </v-col>
            </v-row>
        </v-container>
        <v-divider></v-divider>
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-row>
                        <v-col cols="12">
                            <h4 class="heading mt-3">First Name</h4>
                        </v-col>
                        <v-col cols="12">
                            <h4>{{ userData.firstName }}</h4>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12">
                    <v-row>
                        <v-col cols="12">
                            <h4 class="heading">Last Name</h4>
                        </v-col>
                        <v-col cols="12">
                            <h4>{{ userData.lastName }}</h4>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12">
                    <v-row>
                        <v-col cols="12">
                            <h4 class="heading">Email</h4>
                        </v-col>
                        <v-col cols="12">
                            <h4>{{ userData.email }}</h4>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </article>
</template>

<script>
    import EditProfile from "./EditProfile.vue";

    export default {
        name: "account-information",

        components: {
            EditProfile,
        },

        // Receiving the user's data from the User Profile page
        props: {
            userData: Object
        },

        methods: {
            // Listening to the Edit Profile component for when the user's data has been updated and send the data to the User Profile page
            handleUpdatedProfile(data) {
                // Notifying and sending the updated user's data to the User Profile page
                this.$emit('sendUpdatedProfileToPage', data);
            }
        },
    }
</script>

<style scoped>
    article {
        width: 90%;
    }

    h3 {
        font-family: var(--titleFont);
    }

    h4 {
        font-weight: 400;
    }

    .heading {
        font-weight: 600;
    }

    @media only screen and (min-width: 768px) {

        article {
            width: 70%;
            margin-left: 20%;
            margin-top: 4vh;
        }

        h3 {
            font-size: 1.5rem;
        }

        h4 {
            font-size: 1.2rem;
        }
    }

    @media only screen and (min-width: 1024px) {

        article {
            margin-left: 15%;
        }

        h3 {
            font-size: 1.3rem;
            margin-top: 5vh;
        }

        h4 {
            font-size: 1rem;
        }
    }
</style>