<template>
    <section>
        <status-alert :showStatus="showLogoutStatus"></status-alert>
        <logout-user></logout-user>
    </section>
</template>

<script>
    import cookies from "vue-cookies";
    import LogoutUser from "../components/LogoutUser.vue";
    import StatusAlert from "../components/StatusAlert.vue";

    export default {
        name: "User-Profile",

        components: {
            LogoutUser,
            StatusAlert
        },

        data() {
            return {
                loginToken: cookies.get("loginToken")
            }
        },

        computed: {
            // Getting the API request status from the status when a user logs out
            showLogoutStatus() {
                return this.$store.state.logoutStatus; 
            }
        },

        mounted() {
            // If the user does not have a login token, take the user back to the Home page
            if(this.loginToken === null || this.loginToken === '') {
                this.$router.push("/");
            }
        },
    }
</script>

<style scoped>
    .v-alert {
        position: fixed;
        top: 0;
        display: none;
        z-index: 5;
    }

    .showAlert {
        display: block;
    }
</style>