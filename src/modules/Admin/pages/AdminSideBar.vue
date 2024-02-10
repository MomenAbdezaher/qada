<template>
       <div id="sidebar" class="sideCard" style="transition: 1s;">
                    <ul>
                      <label for="rotate" class="icon">
                        <input id="rotate" @click="show_sidebar(), $emit('showComp' , showComponent)"  type="checkbox" class="d-none">
                        <div class="square">
                          <i class="fa-solid fa-backward"></i>
                        </div>
                      </label>
                      <li class="text-light">مرحبا</li>
                        <li class="authName">{{ personName }}</li>
                        <li class="mt-4" @click="showComponent = 'الرئيسية',$emit('showComp' , showComponent)" :style="{'cursor': 'pointer' , 'textDecoration' : showComponent == 'الرئيسية' ? 'underline' : ''}">الرئيسية</li>
                        <li class="mt-4" @click="showComponent = 'الاحصائيات',$emit('showComp' , showComponent)" :style="{'cursor': 'pointer' , 'textDecoration' : showComponent == 'الاحصائيات' ? 'underline' : ''}">الاحصائيات</li>
                        <li @click="showComponent = 'الفريق',$emit('showComp' , showComponent)" class="mt-4 sidbarLink" :style="{'cursor': 'pointer' , 'textDecoration' : showComponent == 'الفريق' ? 'underline' : ''}">الفريق</li>
                        <li @click="showComponent = 'المشاريع',$emit('showComp' , showComponent)" class="mt-4 sidbarLink" :style="{'cursor': 'pointer' , 'textDecoration' : showComponent == 'المشاريع' ? 'underline' : ''}">المشاريع</li>
                        <li @click="logOut" class="mt-4"><router-link class="sidbarLink" to="">تسجيل خروج</router-link></li>
                    </ul>
                    </div>
</template>

<script setup>
import router from '@/router';
import { notify } from '@/stores/notifications';
import {ref } from 'vue';
let showComponent = ref('الرئيسية');
const show_sidebar = ()=>{
      document.querySelector('#sidebar').classList.toggle('gear');
    }
    const notifications = notify();
    const logOut = ()=>{
      if(localStorage.getItem(`notifications${notifications.userId}`) ||  localStorage.getItem(`office_notifications${notifications.userId}`)){
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    localStorage.removeItem('type');
    localStorage.removeItem('token');
    localStorage.removeItem('phone');
    localStorage.removeItem('id');
    router.push('/admin')

  }else{
  localStorage.clear();
  router.push('/admin')
  }
     }
     const personName = ref( 
  localStorage.getItem('email') ?
  localStorage.getItem('email').slice(0,localStorage.getItem('email').indexOf('@'))
   : ''
  );
  
</script>

<style scoped>
.sideCard {
    position: fixed;
    top: 30%;
    right: -170px;
    z-index: 1000;
    background-color: #59467C !important;
    color: #fff;
    width: 170px;
    height: 380px;
    text-align: center;
    border-radius: 22px 0 0 22px;
    padding-top: 20px;
    transition: 1s;
}
.sideCard.gear{
  position: fixed;
    top: 30%;
    right: 0px;
    background-color: #54847D;
    color: #fff;
    width: 170px;
    height: 380px;
    text-align: center;
    border-radius: 22px 0 0 22px;
    padding-top: 20px;
    transition: 1s;
}
.sideCard:hover{
filter: brightness(1.3);
}
.sideCard li {
    list-style-type: none;

  }
  .sideCard .icon{
  cursor: pointer;
  position: absolute;
  left: -35px;
  top: 40%;
  font-size: 40px;
  color: #9b8db5;
  transform: rotate(0);
  animation: linear infinite;
  animation-direction: alternate-reverse;
  animation-name: run;
  animation-duration: 1s;
}
@keyframes run {
  0% {
    left: -35px;
  }
  50% {
    left: -50px;
  }
  100% {
    left: -35px;    
  }
}
.square{
  transition-property:all ;
  transition-duration: 1s;
}
#rotate:checked + .square {
  transform: rotate(180deg);
}
.sidbarLink {
    text-decoration: none;
    color: #FFFFFFB2;
    font-size: 18px;
    line-height: 33.73px;
}

.sideCard .authName {
    color: #ffffff;
    font-weight: 700;
    font-size: 25px;
    line-height: 46.85px;
}
@media (max-height:545px) {
  .sideCard.gear , .sideCard{
top: 25% !important;

  }
  
}
@media (max-height:500px) {
  .sideCard.gear , .sideCard{
top: 18% !important;

  }
  
}

</style>