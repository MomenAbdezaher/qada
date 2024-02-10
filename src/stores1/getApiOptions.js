import axios from "axios";
import { defineStore } from "pinia";
export const getOptionsApi = defineStore('getOptions',{
    state:()=>({
       cities:[],
       services:[],
       service_category:[],
       last_offers_date:'',
       eng_offices_class:[],
    }),
    actions:{
      getCities(){
        axios.get('https://test.m-aboelela.online/api/cities')
        .then((res)=>{
            if(res.status == 200){
              this.cities = res.data.data
              console.log(this.cities);
            }
           
        }).catch((err)=>{
            if(err){
                console.log(err);
            }
        })
      } ,
      getElectronicServices(){
        axios.get('https://test.m-aboelela.online/api/services')
        .then((res)=>{
            if(res.status == 200){
              this.services = res.data.data
              console.log(this.services);
            }
           
        }).catch((err)=>{
            if(err){
                console.log(err);
            }
        })
      }  ,
      setservice_category(){
        axios.get('https://test.m-aboelela.online/api/service_categories')
        .then((res)=>{
            if(res.status == 200){
              this.service_category = res.data.data
              console.log(this.services);
            }
           
        }).catch((err)=>{
            if(err){
                console.log(err);
            }
        })
      },
      setlast_offers_date(e){
        this.last_offers_date = e.target.options[e.target.selectedIndex].text;
        console.log(this.last_offers_date);
  },
  seteng_offices_class(){
    axios.get('https://test.m-aboelela.online/api/office_classes')
    .then((res)=>{
        if(res.status == 200){
          this.eng_offices_class = res.data.data
          console.log(this.services);
        }
       
    }).catch((err)=>{
        if(err){
            console.log(err);
        }
    })
    
}
    }
}) 