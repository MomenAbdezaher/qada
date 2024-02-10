<template>
  <div class="content">
    <nav class="navbar navbar-expand-lg ">
      <div class="container-fluid ">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="text-end d-flex responsive-header" v-if="x.matches" style="direction:rtl;flex-wrap: wrap;">
          <button v-if="x.matches" :class="auth != '' ? 'd-none' : ''" @click="router.push('/loginPanal')" type="button"
            class="btn ms-2 mt-2  login">تسجيل الدخول</button>

          <button v-if="x.matches" :class="auth != '' ? 'd-none' : ''" @click="router.push('/loginPanal')" type="button"
            class="btn ms-2  create">إنشاء حساب</button>

          <button @click="logout()" class="btn create" :class="auth != '' ? '' : 'd-none'" v-if="checklogin">تسجيل
            الخروج</button>

          <div class="dropdown" v-if="auth">
            <button @click="getAllProjects.hideProjects()" class="bg-transparent border-0" type="button"
              id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <li class="nav-item res-li mx-lg-5 ms-5 position-relative mt-2 pl-5">
                <i class="fa-regular fa-bell"></i>
                <span v-if="getAllProjects.notificationsLength > 0"
                  class="position-absolute unread top-0 start-lg-100  badge rounded-pill bg-danger text-light">
                  {{ getAllProjects.notificationsLength }}
                  <span class="visually-hidden">unread messages</span>
                </span>
              </li>
            </button>
            <div v-motion-fade-visible
              style="width: 310px;transition: 0.5s; height:360px ;background-color: #0c550b;padding-right: 10px;"
              class="dropdown-menu notify-menu" aria-labelledby="dropdownMenuButton">
              <div v-for="project in getAllProjects.accepted" :key="project" class="accepted d-flex mt-1">
                <div class="svg ms-2" v-if="getAllProjects.accepted.length > 0">
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_344_8289)">
                      <path
                        d="M14.9997 0C6.72848 0 0 6.729 0 15C0 23.271 6.72848 30 14.9997 30C23.2709 30 30 23.271 30 15C30 6.729 23.2709 0 14.9997 0ZM14.9997 28.0328C7.8135 28.0328 1.96725 22.1862 1.96725 15C1.96725 7.81372 7.81343 1.96733 14.9997 1.96733C22.186 1.96733 28.0325 7.8138 28.0325 15C28.0326 22.1862 22.1859 28.0328 14.9997 28.0328Z"
                        fill="url(#paint0_linear_344_8289)" />
                      <path
                        d="M20.4304 10.0895L12.6956 17.824L9.56893 14.698C9.1847 14.3142 8.56228 14.314 8.17805 14.6982C7.79368 15.0826 7.79368 15.7051 8.17805 16.0893L12.0003 19.9109C12.1924 20.1028 12.444 20.1988 12.6956 20.1988C12.9472 20.1988 13.1995 20.1028 13.3915 19.9106C13.3921 19.9098 13.3926 19.909 13.3936 19.908L21.8212 11.4804C22.2056 11.0964 22.2056 10.4734 21.8212 10.0894C21.4371 9.7052 20.8142 9.7052 20.4304 10.0895Z"
                        fill="url(#paint1_linear_344_8289)" />
                    </g>
                    <defs>
                      <linearGradient id="paint0_linear_344_8289" x1="4" y1="-11.5" x2="15" y2="30"
                        gradientUnits="userSpaceOnUse">
                        <stop stop-color="white" />
                        <stop offset="1" stop-color="#8CFE9E" stop-opacity="0.8" />
                      </linearGradient>
                      <linearGradient id="paint1_linear_344_8289" x1="14.9996" y1="9.80127" x2="26.5" y2="30"
                        gradientUnits="userSpaceOnUse">
                        <stop stop-color="white" />
                        <stop offset="1" stop-color="#8CFE9E" stop-opacity="0.8" />
                      </linearGradient>
                      <clipPath id="clip0_344_8289">
                        <rect width="30" height="30" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>

                </div>
                <div v-if="getAllProjects.accepted.length > 0" class="info">
                  <span class="accept-reason">
                    تم الموافقة على {{ project.project_title }}
                  </span>
                </div>

              </div>
              <!--rejected projects-->
              <div class="rejected-projects d-flex mt-1" type="button" data-toggle="modal" data-target="#exampleModal"
                v-for="project in getAllProjects.rejected" :key="project" @click="refuseReasone(project)">
                <div v-if="getAllProjects.rejected.length > 0" class="svg ms-2">
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_344_8376)">
                      <path
                        d="M14.9997 0C6.72848 0 0 6.729 0 15C0 23.271 6.72848 30 14.9997 30C23.2709 30 30 23.271 30 15C30 6.729 23.2709 0 14.9997 0ZM14.9997 28.0328C7.8135 28.0328 1.96725 22.1862 1.96725 15C1.96725 7.81372 7.81343 1.96733 14.9997 1.96733C22.186 1.96733 28.0325 7.8138 28.0325 15C28.0326 22.1862 22.1859 28.0328 14.9997 28.0328Z"
                        fill="url(#paint0_linear_344_8376)" />
                      <path d="M20.5 10L10 20.5M10 10L20.5 20.5" stroke="#FF9696" stroke-width="2" />
                    </g>
                    <defs>
                      <linearGradient id="paint0_linear_344_8376" x1="4" y1="-11.5" x2="15" y2="30"
                        gradientUnits="userSpaceOnUse">
                        <stop stop-color="white" />
                        <stop offset="1" stop-color="#FE8C8C" stop-opacity="0.8" />
                      </linearGradient>
                      <clipPath id="clip0_344_8376">
                        <rect width="30" height="30" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div v-if="getAllProjects.rejected.length > 0" class="info">
                  <span class="reject-reason d-inline-block">تم رفض مشروع {{ project.project_title }} لأن {{ project.note
                  }}</span>

                </div>
              </div>
              <!--end rejected projects-->
              <!--accepted projects-->
              <div v-for="project in getAllProjects.underVision" :key="project" class="accepted d-flex mt-1">
                <div class="svg ms-2" v-if="getAllProjects.underVision.length > 0">
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_344_8289)">
                      <path
                        d="M14.9997 0C6.72848 0 0 6.729 0 15C0 23.271 6.72848 30 14.9997 30C23.2709 30 30 23.271 30 15C30 6.729 23.2709 0 14.9997 0ZM14.9997 28.0328C7.8135 28.0328 1.96725 22.1862 1.96725 15C1.96725 7.81372 7.81343 1.96733 14.9997 1.96733C22.186 1.96733 28.0325 7.8138 28.0325 15C28.0326 22.1862 22.1859 28.0328 14.9997 28.0328Z"
                        fill="url(#paint0_linear_344_8289)" />
                      <path
                        d="M20.4304 10.0895L12.6956 17.824L9.56893 14.698C9.1847 14.3142 8.56228 14.314 8.17805 14.6982C7.79368 15.0826 7.79368 15.7051 8.17805 16.0893L12.0003 19.9109C12.1924 20.1028 12.444 20.1988 12.6956 20.1988C12.9472 20.1988 13.1995 20.1028 13.3915 19.9106C13.3921 19.9098 13.3926 19.909 13.3936 19.908L21.8212 11.4804C22.2056 11.0964 22.2056 10.4734 21.8212 10.0894C21.4371 9.7052 20.8142 9.7052 20.4304 10.0895Z"
                        fill="url(#paint1_linear_344_8289)" />
                    </g>
                    <defs>
                      <linearGradient id="paint0_linear_344_8289" x1="4" y1="-11.5" x2="15" y2="30"
                        gradientUnits="userSpaceOnUse">
                        <stop stop-color="white" />
                        <stop offset="1" stop-color="#8CFE9E" stop-opacity="0.8" />
                      </linearGradient>
                      <linearGradient id="paint1_linear_344_8289" x1="14.9996" y1="9.80127" x2="26.5" y2="30"
                        gradientUnits="userSpaceOnUse">
                        <stop stop-color="white" />
                        <stop offset="1" stop-color="#8CFE9E" stop-opacity="0.8" />
                      </linearGradient>
                      <clipPath id="clip0_344_8289">
                        <rect width="30" height="30" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>

                </div>
                <div v-if="getAllProjects.accepted.length > 0" class="info">
                  <span class="accept-reason">تم طرح مشروع {{ project.project_title }}</span>
                </div>

              </div>
              <!--end accepted projects-->
            </div>
          </div>

        </div>

        <div class="collapse navbar-collapse" id="navbarSupportedContent" style="z-index: 1000;">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-baseline ">
            <li class="nav-item mx-lg-2">
              <router-link class="nav-link qada" to="/member">ميدان<span>ي</span></router-link>
            </li>
            <li class="nav-item mx-lg-2">
              <router-link
                :class="$route.fullPath == '/member' || $route.fullPath == '/' ? 'nav-link ra2esia' : 'nav-link'"
                to="/member"> الرئيسية</router-link>
            </li>
            <li class="nav-item mx-lg-2">
              <router-link :class="$route.fullPath == '/aboutus' ? 'nav-link ra2esia' : 'nav-link'" to="/aboutus"
                class="nav-link">من نحن؟</router-link>
            </li>
            <li class="nav-item mx-lg-2">
              <router-link :class="$route.fullPath == '/member/addproject' ? 'nav-link ra2esia' : 'nav-link'" router-link
                to="/member/addproject" v-if="auth">لوحة التحكم</router-link>
            </li>
            <li class="nav-item mx-lg-2">
              <router-link to="/faq" :class="$route.fullPath == '/faq' ? 'nav-link ra2esia' : 'nav-link'">الاسئلة
                المتكررة</router-link>
            </li>
            <li class="nav-item mx-lg-2">
              <router-link to="/termsandconditions"
                :class="$route.fullPath == '/termsandconditions' ? 'nav-link ra2esia' : 'nav-link'">الشروط
                والاحكام</router-link>
            </li>
            <li class="nav-item mx-lg-2">
              <router-link to="/successPartners"
                :class="$route.fullPath == '/successPartners' ? 'nav-link ra2esia' : 'nav-link'"> المكاتب
                الهندسية</router-link>
            </li>
            <li class="nav-item mx-lg-2">
              <router-link to="/contactus" :class="$route.fullPath == '/contactus' ? 'nav-link ra2esia' : 'nav-link'">إتصل
                بنا</router-link>
            </li>


            <button v-if="!x.matches" :class="auth != '' ? 'd-none' : ''" @click="router.push('/loginPanal')"
              type="button" class="btn ms-2   login">تسجيل الدخول</button>


            <button v-if="!x.matches" :class="auth != '' ? 'd-none' : ''" @click="router.push('/loginPanal')"
              type="button" class="btn ms-2  create">إنشاء حساب</button>



            <router-link @click="logout()" v-if="!x.matches" :class="auth != '' ? '' : 'd-none'" to="/loginPanal">
              <button class="btn create">تسجيل الخروج</button>
            </router-link>


            <div class="dropdown" v-if="auth">
              <button @click="getAllProjects.hideProjects()" class="bg-transparent border-0" type="button"
                id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <li v-if="!x.matches" class="nav-item mx-lg-5 position-relative">
                  <i class="fa-regular fa-bell"></i>
                  <span v-if="getAllProjects.notificationsLength > 0"
                    class="position-absolute unread top-0 start-lg-100  badge rounded-pill bg-danger text-light">

                    {{ getAllProjects.notificationsLength }}
                    <span class="visually-hidden">unread messages</span>
                  </span>
                </li>
              </button>
              <div v-motion-fade-visible
                style="width: 310px;transition: 0.5s; height:360px; background-color: #0b5a08;padding-right: 10px;"
                class="dropdown-menu notify-menu" aria-labelledby="dropdownMenuButton">
                <div v-for="project in getAllProjects.accepted" :key="project" class="accepted d-flex mt-1">
                  <div class="svg ms-2" v-if="getAllProjects.accepted.length > 0">
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_344_8289)">
                        <path
                          d="M14.9997 0C6.72848 0 0 6.729 0 15C0 23.271 6.72848 30 14.9997 30C23.2709 30 30 23.271 30 15C30 6.729 23.2709 0 14.9997 0ZM14.9997 28.0328C7.8135 28.0328 1.96725 22.1862 1.96725 15C1.96725 7.81372 7.81343 1.96733 14.9997 1.96733C22.186 1.96733 28.0325 7.8138 28.0325 15C28.0326 22.1862 22.1859 28.0328 14.9997 28.0328Z"
                          fill="url(#paint0_linear_344_8289)" />
                        <path
                          d="M20.4304 10.0895L12.6956 17.824L9.56893 14.698C9.1847 14.3142 8.56228 14.314 8.17805 14.6982C7.79368 15.0826 7.79368 15.7051 8.17805 16.0893L12.0003 19.9109C12.1924 20.1028 12.444 20.1988 12.6956 20.1988C12.9472 20.1988 13.1995 20.1028 13.3915 19.9106C13.3921 19.9098 13.3926 19.909 13.3936 19.908L21.8212 11.4804C22.2056 11.0964 22.2056 10.4734 21.8212 10.0894C21.4371 9.7052 20.8142 9.7052 20.4304 10.0895Z"
                          fill="url(#paint1_linear_344_8289)" />
                      </g>
                      <defs>
                        <linearGradient id="paint0_linear_344_8289" x1="4" y1="-11.5" x2="15" y2="30"
                          gradientUnits="userSpaceOnUse">
                          <stop stop-color="white" />
                          <stop offset="1" stop-color="#8CFE9E" stop-opacity="0.8" />
                        </linearGradient>
                        <linearGradient id="paint1_linear_344_8289" x1="14.9996" y1="9.80127" x2="26.5" y2="30"
                          gradientUnits="userSpaceOnUse">
                          <stop stop-color="white" />
                          <stop offset="1" stop-color="#8CFE9E" stop-opacity="0.8" />
                        </linearGradient>
                        <clipPath id="clip0_344_8289">
                          <rect width="30" height="30" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>

                  </div>
                  <div v-if="getAllProjects.accepted.length > 0" class="info">
                    <span class="accept-reason">
                      تم الموافقة على {{ project.project_title }}
                    </span>
                  </div>

                </div>
                <!--rejected projects-->
                <div class="rejected-projects d-flex mt-1" type="button" data-toggle="modal" data-target="#exampleModal"
                  v-for="project in getAllProjects.rejected" :key="project" @click="refuseReasone(project)">
                  <div v-if="getAllProjects.rejected.length > 0" class="svg ms-2">
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_344_8376)">
                        <path
                          d="M14.9997 0C6.72848 0 0 6.729 0 15C0 23.271 6.72848 30 14.9997 30C23.2709 30 30 23.271 30 15C30 6.729 23.2709 0 14.9997 0ZM14.9997 28.0328C7.8135 28.0328 1.96725 22.1862 1.96725 15C1.96725 7.81372 7.81343 1.96733 14.9997 1.96733C22.186 1.96733 28.0325 7.8138 28.0325 15C28.0326 22.1862 22.1859 28.0328 14.9997 28.0328Z"
                          fill="url(#paint0_linear_344_8376)" />
                        <path d="M20.5 10L10 20.5M10 10L20.5 20.5" stroke="#FF9696" stroke-width="2" />
                      </g>
                      <defs>
                        <linearGradient id="paint0_linear_344_8376" x1="4" y1="-11.5" x2="15" y2="30"
                          gradientUnits="userSpaceOnUse">
                          <stop stop-color="white" />
                          <stop offset="1" stop-color="#FE8C8C" stop-opacity="0.8" />
                        </linearGradient>
                        <clipPath id="clip0_344_8376">
                          <rect width="30" height="30" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div v-if="getAllProjects.rejected.length > 0" class="info">
                    <span class="reject-reason d-inline-block">تم رفض مشروع {{ project.project_title }} لأن {{
                      project.note }}</span>
                  </div>
                </div>
                <!--end rejected projects-->
                <!--accepted projects-->
                <div v-for="project in getAllProjects.underVision" :key="project" class="accepted d-flex mt-1">
                  <div class="svg ms-2" v-if="getAllProjects.underVision.length > 0">
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_344_8289)">
                        <path
                          d="M14.9997 0C6.72848 0 0 6.729 0 15C0 23.271 6.72848 30 14.9997 30C23.2709 30 30 23.271 30 15C30 6.729 23.2709 0 14.9997 0ZM14.9997 28.0328C7.8135 28.0328 1.96725 22.1862 1.96725 15C1.96725 7.81372 7.81343 1.96733 14.9997 1.96733C22.186 1.96733 28.0325 7.8138 28.0325 15C28.0326 22.1862 22.1859 28.0328 14.9997 28.0328Z"
                          fill="url(#paint0_linear_344_8289)" />
                        <path
                          d="M20.4304 10.0895L12.6956 17.824L9.56893 14.698C9.1847 14.3142 8.56228 14.314 8.17805 14.6982C7.79368 15.0826 7.79368 15.7051 8.17805 16.0893L12.0003 19.9109C12.1924 20.1028 12.444 20.1988 12.6956 20.1988C12.9472 20.1988 13.1995 20.1028 13.3915 19.9106C13.3921 19.9098 13.3926 19.909 13.3936 19.908L21.8212 11.4804C22.2056 11.0964 22.2056 10.4734 21.8212 10.0894C21.4371 9.7052 20.8142 9.7052 20.4304 10.0895Z"
                          fill="url(#paint1_linear_344_8289)" />
                      </g>
                      <defs>
                        <linearGradient id="paint0_linear_344_8289" x1="4" y1="-11.5" x2="15" y2="30"
                          gradientUnits="userSpaceOnUse">
                          <stop stop-color="white" />
                          <stop offset="1" stop-color="#8CFE9E" stop-opacity="0.8" />
                        </linearGradient>
                        <linearGradient id="paint1_linear_344_8289" x1="14.9996" y1="9.80127" x2="26.5" y2="30"
                          gradientUnits="userSpaceOnUse">
                          <stop stop-color="white" />
                          <stop offset="1" stop-color="#8CFE9E" stop-opacity="0.8" />
                        </linearGradient>
                        <clipPath id="clip0_344_8289">
                          <rect width="30" height="30" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>

                  </div>
                  <div v-if="getAllProjects.accepted.length > 0" class="info">
                    <span class="accept-reason">
                      تم طرح مشروع {{ project.project_title }}
                    </span>
                  </div>
                </div>
                <!--end accepted projects-->
              </div>
            </div>

          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import router from '@/router';
import { onMounted, ref } from 'vue';
import { notify } from '@/stores/notifications';
const myrefusedProject = ref({});
const getAllProjects = notify();
const refuseReasone = (refusedProject) => {
  myrefusedProject.value = refusedProject;
}
const x = ref(window.matchMedia("(max-width:991px)"));
const checklogin = ref(false);
const auth = ref(null)
const logout = () => {
  if (localStorage.getItem(`notifications${getAllProjects.userId}`) || localStorage.getItem(`office_notifications${getAllProjects.userId}`)) {
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    localStorage.removeItem('type');
    localStorage.removeItem('token');
    localStorage.removeItem('phone');
    localStorage.removeItem('id');
    router.push('/loginPanal')

  } else {
    localStorage.clear();
    router.push('/loginPanal')
  }
}
onMounted(async () => {
  await getAllProjects.getAllProjects();
  let token = localStorage.getItem('token') ? localStorage.getItem('token') : ''
  auth.value = token != '' ? token : '';
  if (token == "") {
    checklogin.value == true;
  }
});

</script>

<style scoped>
* {
  direction: rtl;
}

@import url("https://fonts.googleapis.com/css2?family=Cairo&display=swap");

.reject-reason {
  text-align: right;
  font-size: small;
  font-weight: bold;
  position: relative;
  background: -webkit-linear-gradient(#FFFFFF, #FE8C8C);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

}

.accept-reason {
  display: inline-block;
  text-align: right;
  font-size: small;
  font-weight: bold;
  background: -webkit-linear-gradient(#FFFFFF, #8CFE9E);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

nav {
  font-family: "Cairo", sans-serif;
}

/* .nav-link:hover {
  color: #fff;
} */
p {
  font-size: 20px;
}

.navBg-img {
  width: 100vw;
  object-fit: cover;
}

li a {
  color: #000000CC;
  font-weight: 500;
  font-size: 18px;
}

li .qada {
  font-size: 35px;
}

.fa-bell {
  font-size: 1.5rem;
  color: rgba(0, 0, 0, 0.80);
  color: #000000CC;
  ;
}

.create {
  background-color: #fff;
  color: #2A665D;
  border-color: #2A665D;
  border-radius: 1rem;
  width: 150px;
  height: 40px;
}

.login {
  background-color: #2A665D;
  color: #fff;
  width: 150px;
  height: 40px;
  border-radius: 1rem;
  border-color: #2A665D;
}

li .ra2esia {
  color: #2A665D;
  text-decoration-line: underline;
}

li span {
  color: #48ac9d;
}

.notify-menu {
  overflow-y: scroll;
}

.notify-menu::-webkit-scrollbar {
  display: none !important;

}

@media (max-width:991px) {
  .create {
    margin-top: 10px;
  }

  .fa-bell,
  .unread {
    margin-top: 10px;
    display: inline-block;
  }
}

@media (max-width:500px) {
  #navbarSupportedContent {
    position: relative;
    top: -80px;
    right: -20px !important;

  }

  .create {
    margin-left: 50px !important;
  }

  .responsive-header {
    display: flex;
    position: absolute;
    top: 0px;
    left: -40px;
    justify-content: end !important;
    flex-wrap: nowrap;
    min-height: 100px;

  }

  .responsive-header .res-li {
    position: relative;
    left: 20px !important;

  }

  .navbar-toggler {
   /* margin-bottom: 100px !important;*/
  }

  .notify-menu {
    position: absolute !important;
    top: 70px !important;
    left: 40px !important;

  }
}

@media (max-width:401px) {

  .login,
  .create {
    width: fit-content !important;
    height: 40px !important;
    font-size: 15px !important;
  }

  .login {
    margin-top: 10px !important;
  }

}

@media (max-width:331px) {
  .notify-menu {
    max-width: 97vw;
  }

}

@media (max-width:315px) {
  .create {
    width: 100px !important;
    height: 40px !important;
    font-size: 13px !important;
  }

  .login {
    width: 115px !important;
    height: 40px !important;
    font-size: 13px !important;
  }

}

@media (max-width:302px) {
  .create {
    width: 95px !important;
    height: 40px !important;

  }

  .login {
    width: 105px !important;
    height: 40px !important;
  }
}
</style>
