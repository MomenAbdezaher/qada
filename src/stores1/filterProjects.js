import { defineStore } from "pinia";


export const filterProject = defineStore('filter' , {
    state:()=>({
        area:'الكل',
        city:'الكل',
        type:'الكل',
        lastFilterd:[]
       
    }),
    actions:{
        filterArea(filteredProjects){
            if(this.area == 'الكل'){
              this.lastFilterd = filteredProjects
            }else{
                this.lastFilterd = filteredProjects.filter((project)=> project.area == this.area);
            }

         },
         filterCity(filteredProjects){
            if(this.city == 'الكل'){
                this.lastFilterd = filteredProjects

            }else{
                this.lastFilterd = filteredProjects.filter((project)=> project.city_name == this.city);

            }
        },
        filterType(filteredProjects){
            if(this.type == 'الكل'){
                this.lastFilterd = filteredProjects
            }else{
                this.lastFilterd = filteredProjects.filter((project)=> project.service_category.name == this.type);
            }
        }
    }
})