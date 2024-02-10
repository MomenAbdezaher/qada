import { defineStore } from "pinia";


export const electronicService = defineStore('service' , {
    getters:{
        elecService(param){
         return param;
        }
    }
})