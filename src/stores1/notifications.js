import axios from "axios";
import { defineStore } from "pinia";

export const notify = defineStore('notify' , {
    state:()=>({
     allprojects:[],
     underVision:[],
     rejected:[],
     accepted:[],
     officeProjects:[],
     officeProjectsAccepted:[],
     officeProjectsRejected:[],
     officeProjectsUnderVistion:[],
     old_notifications:[],
     notificationsLength:null,
     old_notifications_office:[],
     notificationsLength_office:null,
     userId:null
    }),
    actions:{
        async getAllProjects(){
             this.userId = localStorage.getItem('id');
            await axios.get('https://test.m-aboelela.online/api/welcome')
            .then((res) => {
                if(res.status == 200){
                    this.allprojects = res.data.data.filter((project)=> project.user_id == this.userId);
                    this.underVision = this.allprojects.filter((project)=> project.state == 0);
                    this.accepted = this.allprojects.filter((project)=> project.state == 1);
                    this.rejected = this.allprojects.filter((project)=> project.state == 2);
                    if(!localStorage.getItem(`notifications${this.userId}`)){
                       // localStorage.setItem('notifications' , JSON.stringify(this.allprojects));
                        this.notificationsLength = this.allprojects.length;
                     }else{
                         this.oldNotifications = JSON.parse(localStorage.getItem(`notifications${this.userId}`));
                         if(this.allprojects.length == this.oldNotifications.length){
                           this.notificationsLength = 0;   
                         }else{
                           this.notificationsLength = this.allprojects.length - this.oldNotifications.length;
                         }
                     }
                    /**office projects and admin part */
                    this.officeProjects = res.data.data;
                    this.officeProjectsUnderVistion = this.officeProjects.filter((project)=> project.state == 0);
                    this.officeProjectsAccepted = this.officeProjects.filter((project)=> project.state == 1);
                    this.officeProjectsRejected= this.officeProjects.filter((project)=> project.state == 2);
                    console.log(res.data);
                    if(!localStorage.getItem(`office_notifications${this.userId}`)){
                       // localStorage.setItem('office_notifications' , JSON.stringify(this.officeProjects));
                        this.notificationsLength_office = this.officeProjects.length;
                     }else{
                         this.old_notifications_office = JSON.parse(localStorage.getItem(`office_notifications${this.userId}`));
                         if(this.officeProjects.length == this.old_notifications_office.length){
                           this.notificationsLength_office = 0;   
                         }else{
                           this.notificationsLength = this.officeProjects.length - this.old_notifications_office.length;
                         }
                     }
                }
            })
            .catch((error) => {
              console.error(error);
            });
        },
       async hideProjects(){
        localStorage.setItem(`notifications${this.userId}` , JSON.stringify(this.allprojects));
        this.notificationsLength = 0;
        await this.getAllProjects();         
        },
       async hideProjects_office(){
      localStorage.setItem(`office_notifications${this.userId}` , JSON.stringify(this.officeProjects));
      this.notificationsLength_office = 0;
      await this.getAllProjects();
        }
    }
})