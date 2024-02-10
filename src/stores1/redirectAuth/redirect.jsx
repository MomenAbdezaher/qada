import router from "@/router";
import { defineStore } from "pinia";

export const redirectAuth = defineStore('auth' , {
    state:()=>({

    }),
    actions:{
        redirectToMain(){
            if(localStorage.getItem('type') == 'business'){
                router.push('/business')
            }else if(localStorage.getItem('type') == 'office'){
                router.push('/EngineeringOffices')
            }else if(localStorage.getItem('type' == 'user')){
                router.push('/member')
            }else{
                router.push('/')
            }
        },
        redirectToControlPanel(){
            if(localStorage.getItem('type') == 'business'){
                router.push('/business/addProjectBussiness')
            }else if(localStorage.getItem('type') == 'user'){
                router.push('/member/addproject')
            }else if(localStorage.getItem('type') == 'office'){
                router.push('/EngineeringOffices/officePanelVue')
            }else{
                router.push('/loginPanal')
            }
        }
    }
})