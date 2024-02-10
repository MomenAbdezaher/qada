import axios from "axios";
import { defineStore } from "pinia";

export const projectFile = defineStore('file' , {
    state:()=>({
        loading:false,
        file:[],
        fileName:null,
        sent:null, 
        projects:{},
        files:[],
        projectId:null

    }),
    actions:{
        async sendFile(api , projectId, getOneProjectApi){
   this.loading = true
    await axios.post(api , {
    project_id : projectId,
    other_files:this.file
},{
    headers: {
        'Content-Type': 'multipart/form-data',
        "Accept": "*/*",
        "Content-Length": '',
        "Accept-Encoding": 'gzip, deflate, br',
        "Connection": 'keep-alive',
        "Host": '',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
},
}).then((res)=>{
    if(res.status == 200){
        this.sent = 'تم ارسال الملف'
        this.fileName = '';
        this.file = [];
        this.getOneProject(getOneProjectApi);
        setTimeout(() => {
            this.sent = ''
        }, 3000);
    this.loading = false
        console.log(res);
    }

}).catch((rej)=>{
    this.sent = 'فشل الارسال'
    console.log(rej);
    this.loading = false
    this.sent = ''
})
},
handleFile(e){
    this.file = [];
    this.file.push(e.target.files[0])
    this.fileName = e.target.files[0].name
    console.log(this.fileName);
},
async getOneProject(api){
await axios.get(api , 
    {
        headers:{
            'Content-Type': 'multipart/form-data',
            "Accept": "*/*",
            "Content-Length": '',
            "Accept-Encoding": 'gzip, deflate, br',
            "Connection": 'keep-alive',
            "Host": '',
            'Authorization': 'Bearer ' + localStorage.getItem('token')

        }
    }
    )
    .then((res)=>{
        this.projects = res.data;
        this.files = this.projects.other_files;
        this.projectId = this.projects.user_id
        console.log('projectID =>' +  this.projectId);
        }).then((rej)=> console.log(rej)) 

}
    }
})