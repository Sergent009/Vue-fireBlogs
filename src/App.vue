<template>
  <div class="app-wrapper">
    <div class="app" v-if="$store.state.postLoaded">
      <navigation v-if="!navigation" />
      <router-view />
      <Footer v-if="!navigation" />
    </div>
  </div>
</template>

<script>
import navigation from './components/MyNavigation.vue'
import Footer from './components/MyFooter.vue'

import firebase from "firebase/app"
import "firebase/auth"

export default {
  name: "app",
  components: {
    navigation,
    Footer
    },
  data() {
    return {
      navigation: null
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.$store.commit("updateUser", user)
      if(user){
        this.$store.dispatch("getCurrentUser")
        console.log(this.$store.state.profileEmail)
      }
    })
    this.checkRoute()
    this.$store.dispatch("getPost")
  },
  
  mounted() {},
  // the navigation and footer will be hidden on login or register or forgotPassword Page.
  methods: {
    checkRoute(){
      if(this.$route.name === "Login" || this.$route.name === "Register" || this.$route.name === "ForgotPassword"){
        this.navigation = true
        return
      }{
      this.navigation = false
    }
  },
  watch: {
    $route(){
      this.checkRoute();
    }
  }
}
}
</script>


<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
}

.link {
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
}

.link-light {
  color: #fff;
}

.arrow{
  margin-left: 8px;
  width: 12px;
  path{
    fill: #000;
  }
}

.arrow-light{
  path{
    fill: #fff;
  }
}

.blog-card-wrap{
  position: relative;
  padding: 80px 16px;
  background-color: #f1f1f1;
}
@media (min-width: 500px){
  .blog-card-wrap{
    padding: 100px 16px;
  }
}

.blog-cards{
  display: grid;
  gap: 32px;
  grid-template-columns: 1fr;
}
@media (min-width: 500px){
  .blog-cards{
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 900px){
  .blog-cards{
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (min-width: 1200px){
  .blog-cards{
    grid-template-columns: repeat(4, 1fr);
  }
}

button, .router-button{
  transition: .5s ease all;
  cursor: pointer;
  margin-top: 24px;
  padding: 12px 24px;
  background-color: #303030;
  color: #fff;
  border-radius: 20px;
  border: none;
  text-transform: uppercase;
}

button:hover, .router-button:hover{
  background-color: rgba(48, 48, 48, 0.7);
}

button:focus, .router-button:focus{
  outline: none;
}

.button-ghost{
  color: #000;
  padding: 0;
  border-radius: 0;
  margin-top: 50px;
  font-weight: 500;
  font-size: 15px;
  background-color: transparent;
}
@media (min-width: 700px){
  .button-ghost{
    margin-top: 0;
    margin-left: auto;
  }
  i{
    margin-left: 8px;
  }
}

.button-light{
  background-color: transparent;
  border: 2px solid #fff;
  color: #fff;
}

.button-inactive{
  pointer-events: none !important;
  cursor: none !important;
  background-color: rgba(128, 128, 128, 0.5) !important;
}

.error{
  text-align: center;
  font-size: 12px;
  color: red;
}

</style>
