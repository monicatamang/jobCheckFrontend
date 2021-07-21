<template>
    <section>
        <status-alert :showStatus="showLogoutStatus"></status-alert>
        <logout-user></logout-user>
    </section>
</template>

<script>
    import LogoutUser from "../components/LogoutUser.vue";
    import StatusAlert from "../components/StatusAlert.vue";

    export default {
        name: "User-Profile",

        components: {
            LogoutUser,
            StatusAlert
        },

        computed: {
            // Getting the API request status from the status when a user logs out
            showLogoutStatus() {
                return this.$store.state.logoutStatus; 
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