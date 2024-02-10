import router from "@/router";
import {defineStore} from "pinia"

export const regAuth = defineStore('authredirect' , {
    state:()=>({
        auth:'',
    }),
    actions:{
        authRedirect(){     
        this.auth = localStorage.getItem('token') ? localStorage.getItem('token') : '';
        if(this.auth == ''){
          router.push({name:'home'});
        }
    }
}
})