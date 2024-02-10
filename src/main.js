import { createApp } from 'vue'
import App from './App.vue'
import { MotionPlugin } from '@vueuse/motion'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import "@fortawesome/fontawesome-free/css/all.min.css"
import {createPinia} from 'pinia'
import Echo from 'laravel-echo'
  window.Pusher = require('pusher-js');
 window.Echo = new Echo({
     broadcaster: process.env.BROADCAST_DRIVER,
     key: process.env.PUSHER_APP_KEY,
     cluster: process.env.PUSHER_APP_CLUSTER,
     secret:process.env.PUSHER_APP_SECRET,
     authEndpoint:'https://test.m-aboelela.online/api/broadcasting/auth',
     //forceTLS: false,
     auth:{
        headers: {
            Authorization:'Bearer ' + localStorage.getItem('token'),
            'X-CSRF-Token': "CSRF_TOKEN",
            
         }

     }
 });


/*
window.Echo = new Echo({
    broadcaster:'pusher',
    key:'305974013564f3ca6a87',
    wsHost:process.env.VUE_APP_WEBSOCKETS_SERVER,
    wsPort:'',
    cluster: 'eu',
    authEndpoint:'/pusher/auth',
    app_id:"1612481",
    secret : "01e0cc127de3ebb7f48d",
    auth:{
        Authorization:'Bearer'
    }
})
*/
const app = createApp(App);
app.use(createPinia())
app.use(MotionPlugin)
app.use(router);
app.mount('#app')
