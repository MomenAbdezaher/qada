<template>
    <div class="userSettings row justify-content-center">
      <div class="form bg-success pb-5 rounded-5 col-xl-10 col-lg-10 col-md-10 col-sm-10 col-10">
        <div class="header">
            <h2 class="text-center py-3 fw-bold text-warning">
            ** تسجيل عميل جديد**
        </h2>
        <div class="text-center">
          <span class="text-info" style="font-size: 80px;">
            <i class="fa-solid fa-user-tie"></i>
          </span>
        </div>
        </div>
        <form @submit.prevent="settings.registerUser()" class="px-5">
<!--start user name -->
<div class="input-group mb-2">
  <span class="input-group-text" id="basic-addon1">
    <i class="fa-solid fa-user"></i>
  </span>
  <input @change="state.name = $event.target.value" v-model="settings.theName" type="text" class="form-control" placeholder="الاسم" aria-label="Username" aria-describedby="basic-addon1">
</div>
<div v-if="v$.name.$error"><span class="fs-6 text-warning my-1">{{ v$.name.$errors[0].$message == 'Value is required'? 'الاسم مطلوب' : ''  }}</span></div>
<!--end user name -->
<!--start email name -->
<div class="input-group mb-2">
  <span class="input-group-text" id="basic-addon1">
    <i class="fa-solid fa-envelope"></i>    
</span>
  <input @change="state.email = $event.target.value" v-model="settings.email" type="text" class="form-control" placeholder="البريد الالكترونى" aria-label="Username" aria-describedby="basic-addon1">
</div>
<div v-if="v$.email.$error"><span class="fs-6 text-warning my-1">{{ v$.email.$errors[0].$message == 'Value is required' ? 'البريد الالكترونى مطلوب' : '' }}</span></div>

<!--end email name -->
<!--start password name -->
<div class="input-group mb-2">
  <span class="input-group-text" id="basic-addon1">
    <i class="fa-solid fa-lock"></i>
  </span>
  <input @change="state.password = $event.target.value" v-model="settings.password" type="password" class="form-control" placeholder="الرقم السرى" aria-label="Username" aria-describedby="basic-addon1">
</div>
<div v-if="v$.password.$error"><span class="fs-6 text-warning my-1">{{ v$.password.$errors[0].$message == 'Value is required' ? 'الرقم السرى مطلوب' : '' }}</span></div>

<!--end password name -->
<!--start phone name -->
<div class="input-group mb-2">
  <span class="input-group-text" id="basic-addon1">
    <i class="fa-solid fa-phone"></i>
  </span>
  <input @change="state.phone = $event.target.value" v-model="settings.phone" type="number" class="form-control" placeholder="رقم الجوال" aria-label="Username" aria-describedby="basic-addon1">
</div>
<div v-if="v$.phone.$error"><span class="fs-6 text-warning my-1">{{ v$.phone.$errors[0].$message == 'Value is required' ? 'رقم الهاتف مطلوب' : '' }}</span></div>

<!--end phone name -->
<!--start role name -->
<select @change="state.role = $event.target.value" v-model="settings.role" class="form-select" aria-label="Default select example">
  <option selected>اختر صلاحية المستخدم</option>
  <option v-for="role , index in settings.roles" :value="role.name" :key="index">{{ role.name }}</option>
  
</select>
<div v-if="v$.role.$error"><span class="fs-6 text-warning my-1">{{ v$.role.$errors[0].$message =='Value is required' ?  'ادخل صلاحية المستخدم' : '' }}</span></div>
<!--end role name -->
<div class="w-100 mt-4  text-center">
  <button @click.prevent="settings.registerUser() , v$.$validate()" type="submit" class="btn progress-bar-striped px-5 rounded-5 py-3 btn-secondary">
   <span v-if="settings.loading == false" class="fs-5 fw-bold"> تسجيل الحساب</span>
   <breeding-rhombus-spinner v-if="settings.loading == true" :animation-duration="2000" :size="65" color="#ff1d5e"/>
  </button>
</div>
<div class="text-center"><span class="fs-5 text-warning pt-3 fw-bold">{{ settings.registerd }}</span></div>
</form>
</div>
    </div>
</template>

<script setup>
import { BreedingRhombusSpinner } from 'epic-spinners'
import {userSettings} from '@/stores/user_settings/userSettings'
import { onMounted, reactive } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { required} from '@vuelidate/validators'
const settings = userSettings();
const state = reactive({
  name:'',
  email:'',
  password:'',
  phone:'',
  role:'',
})
const rules = {
  name:{required},
  email:{required},
  password:{required},
  phone:{required},
  role:{required},
}
const v$ = useVuelidate(rules , state)
onMounted(() => {
  settings.getRoles();
});
</script>
<style lang="css" scoped>
.userSettings{
  height: fit-content;
  max-width: 100%;
  overflow-x: hidden;
    min-height: 130vh;
    position: relative;
}
.userSettings .form{
    position: absolute;
    top: 15%;
}
.form-control , .form-select{
    height: 60px !important;
}
.input-group-text{
    border-radius: 2px;
    padding: 10px 20px;
    background-color: rgb(191, 135, 244);
    border: none;
}
@media (max-width:400px) {
  input{
    padding-left: 5px !important;
    padding-right: 5px !important;
  }
  
}
</style>