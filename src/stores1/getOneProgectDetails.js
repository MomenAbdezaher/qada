import axios from "axios";
import { defineStore } from "pinia";

export const getOneProjetc = defineStore('projDetails' , {
    state:()=>({

        project:[],
        offers:[],
        ownerName:'',
        eng_offices_class:null
    }),
    actions:{
        async project_details(api){
            const token = localStorage.getItem('token')
            await axios.get(api,{
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                  'Authorization': 'Bearer ' + token
                },
            })
            .then((res)=>{
              console.log('iam data');
            console.log(res.data)
            localStorage.setItem('projectOne' , JSON.stringify(res.data))
            this.project = res.data
            this.offers = this.project.offers.length
            this.ownerName = this.offers[0].user.name
            this.eng_offices_class = this.project.eng_offices_class.name
            }).catch((err)=> console.log(err));
          }
    }
})