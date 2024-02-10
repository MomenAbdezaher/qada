import axios from 'axios';
import {defineStore} from 'pinia';
export const apis = defineStore('api' , {
    
    state:()=>({
     data:[],
     termTitle:null,
     termDetails:null,
     loading:false,
     sent:null
    }),
    actions:{
       async getWithoutAuth(api){
        await axios.get(api)
        .then((res)=> {
            if(res.status == 200){
              this.data =  res.data.data;
              console.log(this.data);
            }
        }
          )
        .catch((rej)=> console.log(rej))
       },
  /************************* */
       async getWithAuth(api){
        await axios.get(api,{
          headers: {
            'Content-Type': 'multipart/form-data',
            "Accept": "*/*",
            "Content-Length": '',
            "Accept-Encoding": 'gzip, deflate, br',
            "Connection": 'keep-alive',
            "Host": '',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        })
        .then((res)=> {
          if(res.status == 200){
            this.data = res.data.data;
            console.log('iam terms');
            console.log(this.data);
          }
        })
        .catch((rej)=> console.log(rej))
       },
       // post terms from admin
      async  postTerms(api , api2){
        this.loading = true;
      axios.post(api , {
        term_title:this.termTitle,
        term_details:this.termDetails,
      },
      {
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
            this.getWithAuth(api2)
            this.loading = false
            this.termTitle = '';
            this.termDetails = '';
            this.sent = 'تم الارسال';
            console.log(res.data);
            setTimeout(() => {
              this.sent = '';
            }, 3000);
          }
      }).catch((rej)=> {
        if(rej){
          this.loading = false;
          console.log(rej);
          this.sent = 'فشل الارسال'
          setTimeout(() => {
            this.sent = ''
          }, 3000);
        }
      });
       }

    }
})