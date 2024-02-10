<template>
  <footer class="text-light text-center py-3">
    <div class="container">
      
    <div class="row mb-5 text-center" style="direction: rtl;">
      <div @click="routeToMain()" 
      :class="$route.fullPath == '/member' || $route.fullPath == '/' || $route.fullPath == '/business' || $route.fullPath == '/EngineeringOffices'
      ? 'nav col-xl-2 col-lg-2 col-md-4 col-sm-6 col-6 main'
       : 'nav col-xl-2 col-lg-2 col-md-4 col-sm-6 col-6'"
      >الرئيسية</div>
      <div @click="routeToAboutUs()" 
      :class="$route.fullPath == '/aboutus'  || $route.fullPath == '/business/aboutus' || $route.fullPath == '/EngineeringOffices/aboutus'
      ? 'nav col-xl-2 col-lg-2 col-md-4 col-sm-6 col-6 main' 
      : 'nav col-xl-2 col-lg-2 col-md-4 col-sm-6 col-6'"
      >من نحن؟</div>
      <div @click="routeToQuestions()" 
      :class="$route.fullPath == '/faq' ||  $route.fullPath == '/business/faq' ||  $route.fullPath == '/EngineeringOffices/faq'
      ? 'nav col-xl-2 col-lg-2 col-md-4 col-sm-6 col-6 main' 
      : 'nav col-xl-2 col-lg-2 col-md-4 col-sm-6 col-6'"
      >الأسئلة المتكررة</div>
      <div @click="routeToTerms()" 
      :class="$route.fullPath == '/termsandconditions' || $route.fullPath == '/business/termsandconditions' || $route.fullPath == '/EngineeringOffices/termsandconditions'
      ? 'nav col-xl-2 col-lg-2 col-md-4 col-sm-6 col-6 main'
      : 'nav col-xl-2 col-lg-2 col-md-4 col-sm-6 col-6'"
      > الشروط والأحكام</div>
      <div @click="routeToparteners()" 
      :class="$route.fullPath == '/successPartners' ||  $route.fullPath == '/business/successPartners' || $route.fullPath == '/EngineeringOffices/successPartners'
      ? 'nav col-xl-2 col-lg-2 col-md-4 col-sm-6 col-6 main' 
      : 'nav col-xl-2 col-lg-2 col-md-4 col-sm-6 col-6'"
      > المكاتب الهندسية</div>
      <div @click="routeToCallUs()" 
      :class="$route.fullPath == '/contactus' ||  $route.fullPath == '/business/contactus' || $route.fullPath == '/EngineeringOffices/contactus'
      ? 'nav col-xl-2 col-lg-2 col-md-4 col-sm-6 col-6 main' 
      : 'nav col-xl-2 col-lg-2 col-md-4 col-sm-6 col-6'"
      >إتصل بنا</div>
   
      </div>
   
      <div class="row ">
        <p class="text-align-center">
          مرحبًا بك في ميداني للمهندسين. يرجى قراءة  الشروط والأحكام بعناية قبل استخدام المنصة والتسجيل كمهندس حر. من خلالاستخدام المنصة والتسجيل فيها، فإنك توافق على هذه الشروط والأحكام وتلتزم بها بشكل قانوني. إذا كنت غير موافق على هذه الشروط والأحكام، فيُرجى عدم استخدام المنصة.         
        </p>
      </div>

      <div class="iqon">
        <i class="fa-brands fa-facebook-f text-light mx-2"></i>
        <i class="fa-brands fa-twitter text-light mx-2"></i>
        <i class="fa-brands fa-linkedin-in text-light mx-2"></i>
        <i class="fa-brands fa-instagram text-light mx-2"></i>
      </div>
    </div>

  </footer>
</template>
  
<script setup>
import router from '@/router';

const routeToMain = ()=>{
  localStorage.getItem('type') == 'user' || !localStorage.getItem('type') ? 
    router.push('/member') 
  : localStorage.getItem('type') == 'business'
  ? router.push('/business') 
  : router.push('/EngineeringOffices')
}
const routeToAboutUs = ()=>{
  localStorage.getItem('type') == 'user' || !localStorage.getItem('type')? 
    router.push('/aboutus') 
  : localStorage.getItem('type') == 'business'
  ? router.push('/business/aboutus') 
  : router.push('/EngineeringOffices/aboutus')
  
}
const routeToQuestions = ()=>{
  localStorage.getItem('type') == 'user' || !localStorage.getItem('type') ? 
    router.push('/faq') 
  : localStorage.getItem('type') == 'business'
  ? router.push('/business/faq') 
  : router.push('/EngineeringOffices/faq')
}
const routeToTerms = ()=>{
  localStorage.getItem('type') == 'user' || !localStorage.getItem('type') ? 
    router.push('/termsandconditions') 
  : localStorage.getItem('type') == 'business'
  ? router.push('/business/termsandconditions') 
  : router.push('/EngineeringOffices/termsandconditions')
  
}
const routeToparteners = ()=>{
  localStorage.getItem('type') == 'user' || !localStorage.getItem('type') ? 
    router.push('/successPartners') 
  : localStorage.getItem('type') == 'business'
  ? router.push('/business/successPartners') 
  : router.push('/EngineeringOffices/successPartners')
  
}
const routeToCallUs = ()=>{
  localStorage.getItem('type') == 'user' || !localStorage.getItem('type') ? 
    router.push('/contactus') 
  : localStorage.getItem('type') == 'business'
  ? router.push('/business/contactus') 
  : router.push('/EngineeringOffices/contactus')
  
}

</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Cairo&display=swap");

.main{
  text-decoration: underline;
  color: #30b8a3;
}
.nav{
  cursor: pointer;
  text-align: center;
  display: block;
  margin-top: 15px;
}
footer {
  position: relative;
  bottom: 0;
  width: 100%;
  background-color: #0c483f;
  font-family: "Cairo", sans-serif;
}

.endfooter {
  text-align: center;
}

.iqon:before {
  content: '';
  background-color: #00221D;
  position: absolute;
  width: 40%;
  height: 30px;
  left: 0;
  bottom: 0;
  border-top-right-radius: 61px;
}

.iqon:after {
  content: '';
  background-color: #00221D;
  position: absolute;
  width: 40%;
  height: 30px;
  right: 0;
  bottom: 0;
  border-top-left-radius: 61px;
}</style>
