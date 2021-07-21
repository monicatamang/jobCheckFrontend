<template>
    <section>
        <v-alert :icon="showLogoutStatus.icon" :color="showLogoutStatus.color" dismissible dark tile :class="{ showAlert: showLogoutStatus.show }">{{ showLogoutStatus.message }}</v-alert>
        <logout-user></logout-user>
    </section>
</template>

<script>
    import LogoutUser from "../components/LogoutUser.vue";

    export default {
        name: "User-Profile",

        components: {
            LogoutUser,
        },

        computed: {
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