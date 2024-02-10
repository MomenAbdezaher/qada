<template>
    <AdminHeader/>
    <div class="terms">
        <div class="row">   
            <div class="col-10 bg-primary">
            <div class="login-box">
            <h2>انشاء شروط واحكام</h2>
     <form>
    <div class="user-box">
      <input v-model="sendterm.termTitle" type="text" style="text-align: right;direction: rtl;">
      <label class="d-block w-100 text-end"><span class="d-inline-block"> عنوان الشرط</span></label>
    </div>
    <div class="user-box">
        <textarea v-model="sendterm.termDetails" style="text-align: right;direction: rtl;" cols="15" rows="5"></textarea>
        <label class="d-block w-100 text-end"><span class="d-inline-block">التفاصيل</span></label>
    </div>
    <div @click="sendterm.postTerms('https://test.m-aboelela.online/api/admin/terms/create','https://test.m-aboelela.online/api/admin/terms/index')" class="text-center">
        <a href="#">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <div v-if="sendterm.loading == false">إرسال</div>
      <div v-if="sendterm.loading == true">
              <orbit-spinner  :animation-duration="1200" :size="55" color="#ff1d5e"/>
      </div>
      
    </a>
    </div>
    <div class="text-center"><span class="fs-4 text-danger">{{ sendterm.sent }}</span></div>
  </form>
</div>
        </div>
        <!--
<div class="col-2 d-flex justify-content-end bg-secondary">
                <Sidecard style="position: absolute;top: 20%;"/>
            </div>
        -->
        
        </div>
       <div class="row cards">
        <section id="team" class="pb-5">
    <div class="container">
        <div class="row" style="direction: rtl;">
            <!-- Team member -->
            <div class="col-xs-12 col-sm-6 col-md-4" v-for="term , index in sendterm.data" :key="index">
                <div class="image-flip" >
                    <div class="mainflip flip-0">
                        <div class="frontside">
                            <div class="card">
                                <div class="card-body text-center pt-5">
                                    <h4 style="direction: rtl;" class="card-title">{{ term.term_title }}</h4>
                                    <p class="card-text mt-5">انقر لعرض شروط واحكام ميداني</p>
                                    <a href="https://www.fiverr.com/share/qb8D02" class="btn btn-primary btn-sm mt-5"><i class="fa fa-plus"></i></a>
                                </div>
                            </div>
                        </div>
                        <div class="backside">
                            <div class="card">
                                <div class="card-body text-center mt-4">
                                    <p class="card-text" style="text-align: right;direction: rtl;">
                                    {{ term.term_details }}
                                    </p>
                                   <div class="text-center"><span class="fs-4 text-success" style="font-weight: 700;">مہيہدأنہى</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
        </div>
    </div>
</section>

       </div>
    </div>
   
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";
import { OrbitSpinner } from 'epic-spinners'
import { usebackgroundStore } from "../../../stores/background"
import AdminHeader from './AdminHeader.vue';
//import Sidecard from "./sidecard.vue";
import {apis} from '@/stores/termsAndQuestionsApis/apis'
const backgroundStore = usebackgroundStore()
const sendterm = apis();
onMounted(() => {
    backgroundStore.setBgColor(1);
    sendterm.getWithAuth('https://test.m-aboelela.online/api/admin/terms/index')

});
onUnmounted(() => {
    backgroundStore.setBgColor(0)
});

</script>

<style lang="css" scoped>
.terms{
    min-height: 100vh;
    max-width: 100%;
    overflow-x: hidden;
}
html {
  height: 100%;
}
body {
  margin:0;
  padding:0;
  font-family: sans-serif;
  background: linear-gradient(#141e30, #243b55);
}

.login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  padding: 40px;
  transform: translate(-50%, -50%);
  background: rgba(0,0,0,.5);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0,0,0,.6);
  border-radius: 10px;
}

.login-box h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
}

.login-box .user-box {
  position: relative;
}

.login-box .user-box input , .login-box .user-box textarea {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}
.login-box .user-box label {
  position: absolute;
  top:0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: .5s;
}

.login-box .user-box input:focus ~ label,
.login-box .user-box textarea:focus ~ label
{
  top: -20px;
  left: 0;
  color: #03e9f4;
  font-size: 12px;
}

.login-box form a {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #03e9f4;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: .5s;
  margin-top: 40px;
  letter-spacing: 4px
}

.login-box a:hover {
  background: #03e9f4;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #03e9f4,
              0 0 25px #03e9f4,
              0 0 50px #03e9f4,
              0 0 100px #03e9f4;
}

.login-box a span {
  position: absolute;
  display: block;
}

.login-box a span:nth-child(1) {
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #03e9f4);
  animation: btn-anim1 1s linear infinite;
}

@keyframes btn-anim1 {
  0% {
    left: -100%;
  }
  50%,100% {
    left: 100%;
  }
}

.login-box a span:nth-child(2) {
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, #03e9f4);
  animation: btn-anim2 1s linear infinite;
  animation-delay: .25s
}

@keyframes btn-anim2 {
  0% {
    top: -100%;
  }
  50%,100% {
    top: 100%;
  }
}
/**card */
/* FontAwesome for working BootSnippet :> */

@import url('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');

.cards{
    margin-top: 50vh;
}
.btn-primary:hover,
.btn-primary:focus {
    background-color: #108d6f;
    border-color: #108d6f;
    box-shadow: none;
    outline: none;
}

.btn-primary {
    color: #fff;
    background-color: #007b5e;
    border-color: #007b5e;
}

section {
    padding: 60px 0;
}

section .section-title {
    text-align: center;
    color: #007b5e;
    margin-bottom: 50px;
    text-transform: uppercase;
}

#team .card {
    border: none;
    background: #ffffff;
}

.image-flip:hover .backside,
.image-flip.hover .backside {
    -webkit-transform: rotateY(0deg);
    -moz-transform: rotateY(0deg);
    -o-transform: rotateY(0deg);
    -ms-transform: rotateY(0deg);
    transform: rotateY(0deg);
    border-radius: .25rem;
}

.image-flip:hover .frontside,
.image-flip.hover .frontside {
    -webkit-transform: rotateY(180deg);
    -moz-transform: rotateY(180deg);
    -o-transform: rotateY(180deg);
    transform: rotateY(180deg);
}

.mainflip {
    -webkit-transition: 1s;
    -webkit-transform-style: preserve-3d;
    -ms-transition: 1s;
    -moz-transition: 1s;
    -moz-transform: perspective(1000px);
    -moz-transform-style: preserve-3d;
    -ms-transform-style: preserve-3d;
    transition: 1s;
    transform-style: preserve-3d;
    position: relative;
}

.frontside {
    position: relative;
    -webkit-transform: rotateY(0deg);
    -ms-transform: rotateY(0deg);
    z-index: 2;
    margin-bottom: 30px;
}

.backside {
    position: absolute;
    top: 0;
    left: 0;
    background: white;
    -webkit-transform: rotateY(-180deg);
    -moz-transform: rotateY(-180deg);
    -o-transform: rotateY(-180deg);
    -ms-transform: rotateY(-180deg);
    transform: rotateY(-180deg);
    -webkit-box-shadow: 5px 7px 9px -4px rgb(158, 158, 158);
    -moz-box-shadow: 5px 7px 9px -4px rgb(158, 158, 158);
    box-shadow: 5px 7px 9px -4px rgb(158, 158, 158);
}

.frontside,
.backside {
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -ms-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transition: 1s;
    -webkit-transform-style: preserve-3d;
    -moz-transition: 1s;
    -moz-transform-style: preserve-3d;
    -o-transition: 1s;
    -o-transform-style: preserve-3d;
    -ms-transition: 1s;
    -ms-transform-style: preserve-3d;
    transition: 1s;
    transform-style: preserve-3d;
}

.frontside .card,
.backside .card {
    min-height: 312px;
}

.backside .card a {
    font-size: 18px;
    color: #007b5e !important;
}

.frontside .card .card-title,
.backside .card .card-title {
    color: #007b5e !important;
}

.frontside .card .card-body img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}
</style>