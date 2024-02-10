<template>
  
  <div id="scrollDiv" class="container m-auto notify-menu" style="height: 62vh; overflow-y:auto ;">
    <div class="row justify-content-center text-center">
      <!-- end add comment -->

      <!-- display the comment depend on project id  -->
        <!-- <div class="col-md-8 col-sm-12 mt-5">
          <div v-for="comment in comments" :key="comment.id" class="d-flex my-3">
            <div class="avatar">
              <img src="../../../../assets/ahmedmohsen1.png" alt="" />
            </div>
            <div class="card py-2 px-3">
              <div class="card-body-title">شركة المهندسين المحدودة</div>
              <div class="sub-title my-2">{{ comment.comment }}</div>
            </div>
          </div>
        </div> -->

        <div class="col-md-8 col-sm-12 mt-5 pb-5 " v-for="comment , index in comments" :key="index">
    <span class="d-flex">
      <div class="avatar">
        <img src="../../../../assets/ahmedmohsen1.png" alt="" />
      </div>
      <div class="card">
        <div class="card-body-title">{{ comment.user ? comment.user.name : 'qada-office' }}</div>
        <div class="sub-title my-2">
{{ comment.comment }}
        </div>
      </div>
    </span>

      <div class="additional-texts my-1 me-5">
        <span class="text">{{ comment.created_at.slice(0,comment.created_at.indexOf('T')) }}</span>
        <span class="text">{{ 'رد'}}</span>
        <!--
<span class="text">{{ 'مراسلة'}}</span>
        -->
        
      </div>
    </div>
        <div v-if="comments.length == 0">
          No comments available.
        </div>
      </div>
    </div>
    <div class="row justify-content-center text-center px-2 me-1" >
      <div class="col-lg-10 col-md-10 col-sm-12 col-12 mt-5" style="position: sticky;display: block;top: 0;">
        <form @submit.prevent="addComment">
          <div class="input-group mb-3">
          <div @click.prevent="addComment" class="input-group-prepend" style="cursor: pointer;">
          <span class="input-group-text fs-4 text-primary px-4" id="basic-addon1">
          <i class="fa-solid fa-paper-plane p-1"></i>
          </span>
          </div>
          <input type="text" v-model="form.comment" class="form-control" placeholder="" />
          </div>
          <div class="mb-3"><span class="text-danger">{{ register }}</span></div>
        </form>
      </div>
    </div>
</template>

<script>
import { ref, onMounted } from "vue";
import globalService from "../../../../services/globalservice";
import { useRoute } from "vue-router";
//import engineerofficesService from "../../services/engineeroffice";
import axios from "axios";
export default {
  setup() {
    const route = useRoute();
    const project_id = route.params.id;
    const user_id = localStorage.getItem("id");
    const comments = ref([]);
    const form = ref({
      project_id: "",
      comment: "",
      user_id:''
    });
    const register = ref(null)
    const addComment =async () => {
      const token = localStorage.getItem('token');
      form.value.project_id = project_id;
      form.value.user_id = user_id;
      await axios.post('https://test.m-aboelela.online/api/office/comments/create',{
         project_id:form.value.project_id,
         comment:form.value.comment
      },{
        headers: {
    'Content-Type': 'multipart/form-data',
        "Accept": "*/*",
        "Content-Length": '',
        "Accept-Encoding": 'gzip, deflate, br',
        "Connection": 'keep-alive',
        "Host": '',
        'Authorization': 'Bearer ' + token
      },
      }
      )
      .then((comment)=>{
        if(comment.status == 200){
          register.value = 'تم ارسال تعليقك بنجاح' 
          getAllComments();
          form.value.comment= '';
          setTimeout(() => {
            register.value = '';
          }, 3000);
        }
      }).catch((err)=>{
        console.log(err)
      
      if(err){
        register.value = 'لم يتم ارسال التعليق رجاء التأكد من بيانات تسجيل الدخول'
        setTimeout(() => {
            register.value = '';
          }, 3000);
      
      }
      }

        )

       
    };



// 



const getAllComments = () => {
  globalService.getAllProjectForlandingpage()
    .then((res) => {
       res.data.data.find((project) => project.id === project_id);
      const filterproject = res.data.data.filter((project) => project.id == project_id);
      comments.value = filterproject[0].comments;
    })
    .catch((error) => {
      console.error(error);
    });
};
   
onMounted(async() => {
     await getAllComments();
     
    });

    return {
      form,
      register,
      addComment,
      comments,
      project_id,
    };
  },
};
</script>

<style scoped>
* {
  direction: rtl;
}
.notify-menu::-webkit-scrollbar{
display: none;
}
.add-comment {
  border: none;
  transition: 0.5s;
}
.add-comment:hover{
  scale: 1.2;
}
.card {
  border-radius: 14px;
  border: 1px solid #48847b;
  background: #fff;
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.25);
  padding: 10px 30px;

}
.card-body-title {
  color: #4b4b4b;
  text-align: right;
  font-family: Cairo;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 21px; /* 105% */
}

.sub-title {
  color: #000;
  text-align: right;
  font-family: Cairo;
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: 21px; /* 123.529% */
}
.additional-texts {
  color: #484848;
  text-align: right;
  font-family: Cairo;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 21px; /* 131.25% */
}
.additional-texts span {
  margin-left: 2.25rem;
}
.avatar {
  border-radius: 40px;
  margin-left: 0.5rem;
}
.sub-title-reply {
  color: #000;
  text-align: right;
  font-family: Cairo;
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: 21px; /* 123.529% */
}
.contract-text {
  color: #0043a8;
  text-align: right;
  font-family: Cairo;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 21px; /* 150% */
}
.contract-text svg {
  margin-left: 10px;
}
</style>
