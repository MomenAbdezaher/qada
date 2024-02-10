import axios from 'axios';
import {defineStore} from 'pinia';

export const getAllProjctsForOne = defineStore('projects' , {
    state:()=>({
        allProjects:[],
        projectId:null
    }),
    actions:{
      async getprojects(api){
        this.projectId = localStorage.getItem('id');
           await axios.get(api,{
        
           })
           .then((res)=>{
            if(res.status == 200){
                 this.allProjects = res.data.data.filter((project)=> project.user_id == this.projectId);            
            }
           }).catch((error)=> console.log(error));
        }
    }
    
})