<template>
  <v-app>
    <!-- <h4>Upload Resume</h4>
    <form action="javascript:void(0)">
      <input type="file" name="resumeFile" id="resumeFile">
      <input type="submit" value="Upload" @click="uploadResume">
    </form>
    <button @click="getResumeName">Download</button>
    <h4>Upload Cover Letter</h4>
    <form action="javascript:void(0)">
      <input type="file" name="coverLetterFile" id="coverLetterFile">
      <input type="submit" value="Upload" @click="uploadCoverLetter">
    </form>
    <button @click="getCoverLetterName">Download</button> -->
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";

export default {
  name: 'App',

  data() {
    return {
      resumeFilename: "",
      coverLetterFilename: "",
      loginToken: cookies.get("loginToken")
    }
  },

  mounted() {
    // If the user does not have a login token, take the user to the Home page
    if(this.loginToken === null) {
      this.$router.push("/");
    }
  },

  methods: {
    uploadResume() {
      let formData = new FormData();
      formData.append('resumeFile', document.getElementById("resumeFile").files[0])
      formData.append('loginToken', "")
      formData.append('jobAppId', 1)

      axios.request({
        url: `${process.env.VUE_APP_API_URL}/upload-resume`,
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data"
        },
        data: formData
      }).then((res) => {
        console.log(res);
      }).catch((err) => {
        err;
      });
    },

    getResumeName() {
      axios.request({
        url: `${process.env.VUE_APP_API_URL}/download-resume`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Login-Token": ""
        },
        params: {
          resumeId: 17
        }
      }).then((res) => {
        console.log(res);
        this.resumeFilename = res.data;
        this.downloadResume()
      }).catch((err) => {
        err;
      });
    },

    downloadResume() {
      axios.request({
        url: `${process.env.VUE_APP_API_URL}/download-resume/${this.resumeFileName}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Login-Token": ""
        },
        params: {
          resumeId: 17
        },
        // The response type is binary not a string
        responseType: 'blob'
      }).then((res) => {
        console.log(res);
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', this.resumeFilename);
        document.body.appendChild(link);
        link.click();
      }).catch((err) => {
        err;
      });
    },

    uploadCoverLetter() {
      let formData = new FormData();
      formData.append('coverLetterFile', document.getElementById("coverLetterFile").files[0])
      formData.append('loginToken', "")
      formData.append('jobAppId', 2)

      axios.request({
        url: `${process.env.VUE_APP_API_URL}/upload-cover-letter`,
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data"
        },
        data: formData
      }).then((res) => {
        console.log(res);
      }).catch((err) => {
        err;
      });
    },

    getCoverLetterName() {
      axios.request({
        url: `${process.env.VUE_APP_API_URL}/download-cover-letter`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Login-Token": ""
        },
        params: {
          coverLetterId: 1
        }
      }).then((res) => {
        console.log(res);
        this.coverLetterFilename = res.data;
        this.downloadCoverLetter()
      }).catch((err) => {
        err;
      });
    },

    downloadCoverLetter() {
      axios.request({
        url: `${process.env.VUE_APP_API_URL}/download-cover-letter/${this.coverLetterFilename}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Login-Token": ""
        },
        params: {
          coverLetterId: 1
        },
        responseType: 'blob'
      }).then((res) => {
        console.log(res);
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', this.coverLetterFilename);
        document.body.appendChild(link);
        link.click();
      }).catch((err) => {
        err;
      });
    },
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
    --accentColor: #7391C8;
    --backgroundColorOne: #FCFDFD;
    --backgroundColorTwo: #FAFBFC; 
  }

  .v-main__wrap {
    background: var(--backgroundColorTwo);
    font-family: var(--bodyFont);
  }
</style>