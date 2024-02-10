import axios from "axios";
import { defineStore } from "pinia";

export const sortOffice = defineStore ('sorting' , {
    state:()=>({
      allPartenrs:[],
      allData:[],
      class:'الكل',
      sortNums:[1,2,3,4,5,6,7,8,9,10],        
    }),
    actions:{
        collect_sort_num(){
        for(let i = 0 ; i< this.allPartenrs.length ; i++){
        this.sortNums.push(this.allPartenrs[i].class);
           }
          },
            sort_rank(){
            if(this.class == 'الكل'){
               this.allPartenrs = this.allData
          }else{
             this.allPartenrs = this.allData.filter((office) =>{
             return office.class == this.class;
          });
          }
          },
          async getOffices(api){
            axios.get(api,{
              headers:{
                  'Content-Type': 'multipart/form-data',
                  "Accept": "*/*",
                  "Content-Length": '',
                  "Accept-Encoding": 'gzip, deflate, br',
                  "Connection": 'keep-alive',
                  "Host": '',
                  'Authorization': 'Bearer ' + localStorage.getItem('token')
              }
            }).then((res)=>{
              if(res.status == 200){
                  this.allPartenrs = res.data.data;
                  this.allData = res.data.data;
              }
            }).catch((rej)=>{
              console.log(rej.message);
            })
          }
          }
})