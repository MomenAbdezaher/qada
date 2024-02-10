//import axios from "axios";
import { defineStore } from "pinia";

export const addoffer = defineStore('addstore',{
    state:()=>({
        projectId:null,
        offerDuration:null,
        offerDetails:null,
        offerValue:null,
        offerStage:null,
        registerd:null
    })
    ,
    actions:{
       async senOffer(){
              }
    }

})