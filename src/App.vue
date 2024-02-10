<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/> -->
  <div :class="[backgroundStore.bgColor==1? 'tmn':'']">
    <router-view />
    <MainFooter />
  </div>
</template>
<script>
import MainFooter from './components/MainFooter.vue'
import {usebackgroundStore} from "./stores/background"
import { notify } from './stores/notifications';
import { onBeforeMount } from 'vue';
export default {
  name: 'App',
  setup(){
    const backgroundStore = usebackgroundStore();
    const notifications = notify();
  onBeforeMount(async()=>{
    await notifications.getAllProjects();
   notifications.accepted = notifications.allprojects.filter((project)=> project.state == 1);
   notifications.underVision = notifications.allprojects.filter((project)=> project.state == 0);
   notifications.rejected = notifications.allprojects.filter((project)=> project.state == 2);
   sessionStorage.setItem('acceptedProjects' , JSON.stringify(notifications.accepted));
   sessionStorage.setItem('underVisionProjects' , JSON.stringify(notifications.underVision));
   sessionStorage.setItem('rejectedProjects' , JSON.stringify(notifications.rejected));
   sessionStorage.setItem('allProjects' , JSON.stringify(notifications.allprojects));
  });
return{
  backgroundStore,
  notifications,
}  
},
  components: {
    MainFooter,
  },
}
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Cairo&display=swap");

* {
  font-family: "Cairo", sans-serif;
  box-sizing: border-box;
}

.tmn {
  background: linear-gradient(121.09deg, #59467C 30.12%, #000000 173.77%);
}

/* *{
  direction: rtl;
} */
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}   */
</style>