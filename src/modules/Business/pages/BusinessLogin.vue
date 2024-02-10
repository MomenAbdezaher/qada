<template>
  <div>
    <BHeader />
    <div class="container m-auto my-5">
      <div class="header">
        <p>تسجيل الدخول للأعمال</p>
      </div>
      <div class="row">
        <form @submit.prevent="login()" class="mt-5">
          <div class="col-md-4 col-sm-8 mx-auto">
            <div class="mb-2">
              <img src="../../../assets/login_business.png" class="mx-2" alt="" />
              <label for="name">اسم المستخدم</label>
            </div>
            <input @input="state.firstName = loginApi.loginName" type="text" class="form-control"
              v-model="loginApi.loginName" />
            <div class="mt-2" v-if="v$.firstName.$error"><span class="text-danger fs-6">{{ v$.firstName.$errors[0].$message
              == 'Value is required' ? "رجاء ادخال اسم المستخدم" : '' }}</span></div>
            <div class="mb-2">
              <img src="../../../assets/login_business2.png" class="mx-2" alt="" />
              <label class="my-3 mx-2" for="password">كلمة السر</label>
            </div>
            <input @input="state.password = loginApi.loginPassword" type="password" class="form-control"
              v-model="loginApi.loginPassword" />
            <div class="mt-2" v-if="v$.password.$error"><span class="text-danger fs-6">{{ v$.password.$errors[0].$message
              == 'Value is required' ? "رجاء ادخال الرقم السرى" : '' }}</span></div>
            <div class="text-center">
              <div class="text-center">
                <!--
        <div class="mt-2" v-if="loginApi.registerd"><span class="fs-6 text-danger">{{ loginApi.registerd }}</span></div>
        -->
                <button @click.prevent="loginApi.loginBuisnessApi(), v$.$validate()" class="btn mt-4">
                  <span v-if="loginApi.loading == false" class="fs-6 text-white">دخول</span>
                  <div class="loading w-100 " v-if="loginApi.loading == true">
                    <img :src="require('@/assets/DoubleRing.gif')" style="width: 60px;height: 60px;">
                  </div>
                  <!-- <atom-spinner v-if="loginApi.loading == true" :animation-duration="1000" :size="40" color="#ff1d5e" /> -->
                </button>
              </div>
              <div class="text-center mt-3" v-if="loginApi.registerd"><span class="fs-6 fw-bold text-danger">{{
                loginApi.registerd }}</span></div>

            </div>
          </div>
        </form>
      </div>
      <div class="text-center">
        <button type="button" class="register mt-4">
          <img src="../../../assets/Vector2.png" class="mx-2" alt="" />
          <router-link class="link" :to="{ name: 'bussnessRegister' }">
            حساب جديد
          </router-link>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { onUnmounted, reactive } from 'vue' // "from '@vue/composition-api'" if you are using Vue <2.7
// import { AtomSpinner } from 'epic-spinners'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import BHeader from "../components/BHeader.vue";
import { ref } from "vue";
import authService from "../services/AuthService";
import router from "@/router";
import { useregister } from '@/stores/register';

export default {
  components: {
    BHeader,
    // AtomSpinner
  },
  setup() {
    const state = reactive({
      firstName: '',
      password: ''
    })
    const rules = {
      firstName: { required, email }, // Matches state.firstName
      password: { required }, // Matches state.lastName
    }
    const v$ = useVuelidate(rules, state)

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
          localStorage.setItem("name", response.data.data.name);
          localStorage.setItem("id", response.data.data.id);
          localStorage.setItem("phone", response.data.data.phone);
          localStorage.setItem("email", response.data.data.email);
          localStorage.setItem('type', 'business');

          router.push("/business");
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const goToRegister = () => {
      router.push("/register");
    };
    onUnmounted(() => {
      loginApi.loginName = '';
      loginApi.email = '';
      loginApi.password = '';
      loginApi.userName = '';
      loginApi.confirmPassword = '';
      loginApi.loginPassword = '';
      loginApi.phone = '';
      loginApi.terms = false;
    });
    return {
      loginApi,
      form,
      loginSuccess,
      state,
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

.container {
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

.header p {
  color: #259f5a;
}

p {
  color: #259f5a;
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

label {
  color: #259f5a;
}

.btn {
  color: #fff;
  padding: 10px 55px;
  background-color: #259f5a;
  border-radius: 20px;
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

  .header p {
    font-size: 2.5rem !important;
  }
}

@media (max-width:370px) {
  .header p {
    font-size: 10vw !important;
  }

}</style>
