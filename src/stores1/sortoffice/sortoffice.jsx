import { defineStore } from "pinia";

export const sortOffice = defineStore ('sorting' , {
    state:()=>({
      allPartenrs:[
        {num:1 , city:'الرياض' , office:'شركة المهندسين'} 
        ,{num:2, city:'الرياض', office:'شركة الرواد'}
        ,{num:3, city:'الرياض', office:'شركة الموزعين'}
        ,{num:4, city:'الرياض' , office:'شركة الاستشاريين'}
        ,{num:5, city:'الرياض', office:'شركة المبرمجين'}
        ,{num:6, city:'الرياض', office:'شركة المناديب الهندسية'}
        ,{num:7, city:'الرياض', office:'شركة الخبراء'}
        ,{num:8, city:'الرياض', office:'شركة المخططين'}
        ,{num:9, city:'الرياض', office:'شركة العروض'}
        ,{num:10, city:'الرياض', office:'شركة التطبيقات'}
      ],
      allData:[],
      num:'الكل',
      sortNums:[],        
    }),
    actions:{
        collect_sort_num(){
        for(let i = 0 ; i< this.allPartenrs.length ; i++){
        this.sortNums.push(this.allPartenrs[i].num);
           }
          },
            sort_rank(){
            if(this.num == 'الكل'){
              console.log(this.num);
               this.allPartenrs = this.allData
               console.log(this.allData);
          }else{
             this.allPartenrs = this.allData.filter((office) =>{
             return office.num == this.num;
          });
          }
          }
          }
})