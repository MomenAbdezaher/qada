import {defineStore} from "pinia";
import db from "./fb";

export const addData = defineStore('addData' , {
    state:()=>({
        data:[]
    }),
    actions:{
       async getData(){
        const myData =  await db.collection('myMoney').get();
        for(let i = 0 ; i <myData.docs.length ; i++ ){
            this.data.push(myData.docs[i].data());
        }
       }
    }
})