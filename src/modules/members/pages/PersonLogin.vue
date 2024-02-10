<template>
  <div>
    <PHeader/>
    <div class="container mx-auto my-5" v-if="getData.data.length >=0">
    <div class="header">
      <p>تسجيل الدخول للأفراد</p>
      <div v-if="getData.data.length > 0">
    <div class="text-center" v-for="collec in getData.data" :key="collec">
           <!-- <span class="text-danger fs-1"> {{ collec.thename }}</span>   -->
    </div>
    </div>
    </div>
    <div class="row">
    <form class=" mt-5">
      <div class="col-md-4 col-sm-8 mx-auto">
        <div class="mb-2">
        <img src="../../../assets/Vector.png" class="mx-2" alt="" />
        <label for="name">اسم المستخدم</label>
      </div>
      <input @input="state.firstName = loginApi.loginName" type="text" class="form-control" v-model="loginApi.loginName" />
      <div class="mt-2" v-if="v$.firstName.$error"><span class="text-danger fs-6">{{v$.firstName.$errors[0].$message == 'Value is required' ? "رجاء ادخال اسم المستخدم" :'' }}</span></div>
      <div class="mb-2">
        <img src="../../../assets/passwd.png" class="mx-2" alt="" />
        <label class="my-3" for="password mx-2">كلمة السر</label>
        <div v-if="getData.data.length > 0">
    <div class="text-center" v-for="collec in getData.data" :key="collec">
           <!-- <span class="text-danger fs-1"> {{ collec.thename }}</span>   -->
    </div>
    </div>
      </div>
      <input v-if="getData.data.length >=0" @input="state.password = loginApi.loginPassword" type="password" class="form-control" v-model="loginApi.loginPassword" />
      <!-- <div class="mt-2" v-if="v$.password.$error"><span class="text-danger fs-6">{{v$.password.$errors[0].$message == 'Value is required' ? "رجاء ادخال الرقم السرى" :'' }}</span></div>  -->
      <div class="text-center">
        <!--
        <div class="mt-2" v-if="loginApi.registerd"><span class="fs-6 text-danger">{{ loginApi.registerd }}</span></div>
        -->
        <button @click.prevent="loginApi.loginUserApi() , v$.$validate()" class="btn mt-4">
          <span v-if="loginApi.loading == false" class="fs-6 text-white">دخول</span>
          <div class="loading w-100 " v-if="loginApi.loading == true">
            <img :src="require('@/assets/DoubleRing.gif')" style="width: 60px;height: 60px;">
          </div>
          <!-- <atom-spinner v-if="loginApi.loading == true" :animation-duration="1000" :size="40" color="#ff1d5e" /> -->
        </button>
      </div>
      </div>
    </form>
  </div>
  <div v-if="getData.data.length > 0">
    <div class="text-center" v-for="collec in getData.data" :key="collec">
           <!-- <span class="text-danger fs-1"> {{ collec.thename }}</span>   -->
    </div>
    </div>
    <div class="text-center">
      <button type="button" class="register mt-4">
        <img src="../../../assets/Vector2.png" class="mx-2" alt="" />
        <router-link class="link" to="register"> حساب جديد </router-link>
      </button>
    </div>
  </div>
</div>

</template>

<script>
import {addData} from '@/stores/addData';
import { onUnmounted, onMounted, reactive } from 'vue' // "from '@vue/composition-api'" if you are using Vue <2.7
import { useVuelidate } from '@vuelidate/core'
// import { AtomSpinner } from 'epic-spinners'
import { required, email } from '@vuelidate/validators'
import PHeader from "../components/PHeader.vue";
import { ref } from "vue";
import authService from "../services/AuthService";
import router from "@/router";
import { useregister } from "@/stores/register";
export default {
  components: {
    PHeader,
    // AtomSpinner,

  },
  setup() {
    const state = reactive({
      firstName: '',
      password:''
    })
    const rules = {
      firstName: { required , email }, // Matches state.firstName
      password: { required }, // Matches state.lastName
    }

    const v$ = useVuelidate(rules, state)
    const getData = addData();
    const loginApi = useregister();
    const form = ref({
      email: "",
      password: "",
    });

    const loginSuccess = ref(false);

    const login = () => {
      authService
        .login(form.value)
        .then((response) => {
          loginSuccess.value = true;
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("name", response.data.name);
          localStorage.setItem("id", response.data.id);
          localStorage.setItem("phone", response.data.phone);
          localStorage.setItem("email", response.data.email);

         alert(response.data.name);
          router.push("/");
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const goToRegister = () => {
      router.push("/register");
    };
onMounted(() => {
  getData.getData();
});
    onUnmounted(() => {
  loginApi.loginName='';
  loginApi.email='';
  loginApi.password='';
  loginApi.userName='';
  loginApi.confirmPassword='';
  loginApi.loginPassword='';
  loginApi.phone = '';
  loginApi.terms=false;
});
    return {
      loginApi,
      form,
      loginSuccess,
      state,
      getData,
      v$,
      login,
      goToRegister,
      
    };
  },
};
</script>

<style scoped>
* {
  direction: rtl;
}
.container{
  min-height: 70vh;
  padding-top: 10vh;
}
.header {
  text-align: center;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  font-weight: 700px;
}

p {
  color: #0378ae;
  font-weight: 700;
  font-size: 3rem;
}

form span {
  color: #000000;
  font-size: 2rem;
  margin: 0;
  padding: 0;
}

input {
  height: 55px;
  border-radius: 20px;
  text-align: center;
  background-color: #eaeaea;
}

.btn {
  padding: 10px 55px;
  border-radius: 20px;
  background-color: #0378ae;
}

.register {
  border-color: #616567;
  padding: 5px 20px;
  border-radius: 20px;
}

.link {
  text-decoration: none;
  color: #6a6868;
}

hr {
  border: 1px solid rgba(53, 53, 53, 0.7);
}
@media (max-width:500px) {
 
 .header p{
   font-size: 2.5rem !important;
 }
}
@media (max-width:370px) {
  .header p {
    font-size: 10vw !important;
  }
  
}
</style>
