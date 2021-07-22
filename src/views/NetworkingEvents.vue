<template>
    <section>
        <mobile-header></mobile-header>
        <div id="searchBarContainer">
            <h1>Networking Events</h1>
        </div>
        <mobile-bottom-nav :value="2"></mobile-bottom-nav>
    </section>
</template>

<script>
    import cookies from "vue-cookies";
    import MobileHeader from "../components/MobileHeader.vue";
    import MobileBottomNav from "../components/MobileBottomNav.vue";

    export default {
        name: "Networking-Events",

        components: {
            MobileHeader,
            MobileBottomNav
        },

        data() {
            return {
                loginToken: cookies.get("loginToken")
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
    h1 {
        font-family: var(--titleFont);
        text-transform: uppercase;
        font-weight: 800;
        color: var(--primaryColor);
        margin-top: 3vh;
        font-size: 1.4rem;
        letter-spacing: 1px;
    }

    section, #searchBarContainer {
        display: grid;
        place-items: center;
    }

    #searchBarContainer {
        row-gap: 3vh;
    }

    #searchBarContainer {
        width: 100%;
        background: white;
        position: fixed;
        top: 6%;
        z-index: 1;
        border-bottom: 1px solid whitesmoke;
    }

    section {
        margin-top: 7vh;
    }
</style>