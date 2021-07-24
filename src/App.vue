<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import cookies from "vue-cookies";

export default {
  name: 'App',

  data() {
    return {
      loginToken: cookies.get("loginToken"),
      userData: cookies.get("userData")
    }
  },

  mounted() {
    // If the user does not have a login token, take the user to the Home page
    // if(this.loginToken !== '' && this.loginToken !== null) {
    //   this.$router.push("/JobApplications");
    // }

    if(this.userData !== null && this.userData !== '') {
      this.$store.dispatch('getInterviews', this.userData.userId);
      this.$store.dispatch('getConnections', this.userData.userId);
      this.$store.dispatch('getJobReferences', this.userData.userId);
      this.$store.dispatch('getJobApps', this.userData.userId);
      this.$store.dispatch('getConnections', this.userData.userId);
      this.$store.dispatch('getNetworkingEvents', this.userData.userId);
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&family=Open+Sans:wght@300;400;600;700;800&display=swap');

  :root {
    --titleFont: 'Lato', sans-serif;
    --bodyFont: 'Open Sans', sans-serif;
    --primaryColor: #52688F;
    --secondaryColor: #E3E7F1;
    --tertiaryColor: #BDC6D9;
    --accentColor: #7391C8;
    --backgroundColorOne: #FCFDFD;
    --backgroundColorTwo: #FAFBFC; 
  }

  .v-main__wrap {
    background: var(--backgroundColorTwo);
    font-family: var(--bodyFont);
  }
</style>