import axios from "axios";
import { defineStore } from "pinia";

export const contractOffer = defineStore('contract' , {
    state:()=>({
     contracted:null
    }),
    actions:{
       async contractNewOffer(api , projectId , offerId){
         await axios.post(api , {
         project_id : projectId,
         offer_id:offerId
         },{
            headers:{
     "Content-Type": "application/json",
      Accept: "application/json",
      'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
         }).then((res)=>{
            if(res.status == 200){
                this.contracted  = 'تم التعاقد بنجاح';
                setTimeout(() => {
                    this.contracted=''
                }, 3000);
            }
         }).catch((rej)=>{
            if(rej){
                this.contracted='فشل التعاقد هناك خطا ما'
                setTimeout(() => {
                    this.contracted=''
                }, 3000);
                console.log(rej);
            }
         })


        }
    }
})