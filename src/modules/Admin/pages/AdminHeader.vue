<template>
  <div>

    <div class="modal fade" id="exampleModal-2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <div class="input-group">
              <div class="input-group-prepend w-100 text-center">
                <span class="input-group-text d-inline-block w-50">سبب الرفض
                </span>
              </div>
              <div class="input-group-prepend w-100 text-center">
                <div class="text-center mt-2">
                  <span class="fs-5 text-danger">{{
                    myrefusedProject.note
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="content">
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="text-end d-flex responsive-header" v-if="x.matches" style="direction: rtl; flex-wrap: wrap">
            <button :class="auth != '' ? 'd-none' : ''" @click="$router.push('/loginPanal')" type="button"
              class="btn ms-2 create">
              تسجيل الدخول
            </button>

            <button :class="auth != '' ? 'd-none' : ''" @click="$router.push('/loginPanal')" type="button"
              class="btn ms-2 create">
              إنشاء حساب
            </button>

            <router-link @click="logout()" :class="auth != '' ? '' : 'd-none'" to="/loginPanal">
              <button class="btn create">تسجيل الخروج</button>
            </router-link>

            <div class="dropdown">
              <button @click="notifications.hideProjects_office()" class="bg-transparent border-0" type="button"
                id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <li class="nav-item res-li mx-lg-5 ms-5 position-relative mt-2 pl-5">
                  <i class="fa-regular fa-bell"></i>
                  <span v-if="notifications.notificationsLength_office > 0"
                    class="position-absolute unread top-0 start-lg-100 badge rounded-pill bg-danger text-light">
                    {{ notifications.notificationsLength_office }}
                    <span class="visually-hidden">unread messages</span>
                  </span>
                </li>
              </button>
              <div v-motion-fade-visible style="
                  width: 310px;
                  transition: 0.5s;
                  height: 360px;
                  overflow-y: auto;
                  background-color: #0c550b;
                  padding-right: 10px;
                " class="dropdown-menu notify-menu" aria-labelledby="dropdownMenuButton">
                <div v-for="project in notifications.officeProjectsAccepted" :key="project" class="accepted d-flex mt-1">
                  <div class="svg ms-2" v-if="notifications.officeProjectsAccepted.length > 0">

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
                  <div v-if="notifications.officeProjectsAccepted.length > 0" class="info">
                    <span class="accept-reason">
                      تم الموافقة على {{ project.project_title }}
                    </span>
                  </div>
                </div>
                <!--rejected projects-->
                <div class="rejected-projects d-flex mt-1" v-for="project in notifications.officeProjectsRejected"
                  :key="project" @click="refuseReasone(project)" type="button" data-toggle="modal"
                  data-target="#exampleModal-2">
                  <div v-if="notifications.officeProjectsRejected.length > 0" class="svg ms-2">
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
                          <stop stop-color="red" />
                          <stop offset="1" stop-color="#FE8C8C" stop-opacity="0.8" />
                        </linearGradient>
                        <clipPath id="clip0_344_8376">
                          <rect width="30" height="30" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div v-if="notifications.officeProjectsRejected.length > 0" class="info">
                    <span class="reject-reason d-inline-block">تم رفض مشروع {{ project.project_title }} لأن
                      {{ project.note }}</span>
                  </div>
                </div>
                <!--end rejected projects-->
                <!--accepted projects-->
                <div v-for="project in notifications.officeProjectsUnderVistion" :key="project"
                  class="accepted d-flex mt-1">
                  <div class="svg ms-2" v-if="notifications.officeProjectsAccepted.length > 0">
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
                  <div v-if="notifications.officeProjectsAccepted.length > 0" class="info">
                    <span class="accept-reason">تم طرح مشروع {{ project.project_title }}</span>
                  </div>
                </div>
                <!--end accepted projects-->
              </div>
            </div>
          </div>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav m-auto mb-2 mb-lg-0 align-items-lg-baseline">
              <li class="nav-item mx-lg-2">
                <router-link class="nav-link ra2esia" to="/admin/homepage">
                  الرئيسية</router-link>
              </li>
              <li class="nav-item mx-lg-2">
                <router-link to="" class="nav-link">من نحن؟</router-link>
              </li>
              <li class="nav-item mx-lg-2">
                <router-link class="nav-link" router-link to="">لوحة التحكم</router-link>
              </li>
              <li class="nav-item mx-lg-2">
                <!--
                to="/adminQuestiosn"
              -->
                <router-link to="" class="nav-link">الاسئلة المتكررة</router-link>
              </li>
              <li class="nav-item mx-lg-2">
                <!--
                to="/adminTerms"
              -->
                <router-link to="" class="nav-link">الشروط والاحكام</router-link>
              </li>
              <li class="nav-item mx-lg-2">
                <router-link to="" class="nav-link">شركاء النجاح</router-link>
              </li>
              <li class="nav-item mx-lg-2">
                <router-link to="" class="nav-link">إتصل بنا</router-link>
              </li>
              <button @click="$router.push('/loginPanal')" :class="auth != '' ? 'd-none' : ''" type="button"
                class="btn login mx-lg-4">
                تسجيل دخول
              </button>

              <button :class="auth != '' ? 'd-none' : ''" @click="$router.push('/loginPanal')" type="button"
                class="btn ms-2 create">
                إنشاء حساب
              </button>

              <button v-if="!x.matches" @click="logout()" :class="auth != '' ? '' : 'd-none'" class="btn create">
                تسجيل الخروج
              </button>
              <div class="dropdown">
                <button @click="notifications.hideProjects_office()" class="bg-transparent border-0" type="button"
                  id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <li v-if="!x.matches" class="nav-item mx-lg-5 position-relative">
                    <i class="fa-regular fa-bell"></i>
                    <span v-if="notifications.notificationsLength_office > 0"
                      class="position-absolute unread top-0 start-lg-100 badge rounded-pill bg-danger text-light">
                      {{ notifications.notificationsLength_office }}
                      <span class="visually-hidden">unread messages</span>
                    </span>
                  </li>
                </button>
                <div v-motion-fade-visible style="
                    width: 310px;
                    transition: 0.5s;
                    height: 360px;
                    overflow-y: auto;
                    background-color: #0c550b;
                    padding-right: 10px;
                  " class="dropdown-menu notify-menu" aria-labelledby="dropdownMenuButton">
                  <div v-for="project in notifications.officeProjectsAccepted" :key="project"
                    class="accepted d-flex mt-1">
                    <div class="svg ms-2" v-if="notifications.officeProjectsAccepted.length > 0">
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
                    <div v-if="notifications.officeProjectsAccepted.length > 0" class="info">
                      <span class="accept-reason">
                        تم الموافقة على {{ project.project_title }}
                      </span>
                    </div>
                  </div>
                  <!--rejected projects-->
                  <div class="rejected-projects d-flex mt-1" v-for="project in notifications.officeProjectsRejected"
                    :key="project" @click="refuseReasone(project)" type="button" data-toggle="modal"
                    data-target="#exampleModal-2">
                    <div v-if="notifications.officeProjectsRejected.length > 0" class="svg ms-2">
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
                    <div v-if="notifications.officeProjectsRejected.length > 0" class="info">
                      <span class="reject-reason d-inline-block">تم رفض مشروع {{ project.project_title }} لأن
                        {{ project.note }}</span>
                    </div>
                  </div>
                  <!--end rejected projects-->
                  <!--accepted projects-->
                  <div v-for="project in notifications.officeProjectsUnderVistion" :key="project"
                    class="accepted d-flex mt-1">
                    <div class="svg ms-2" v-if="notifications.officeProjectsAccepted.length > 0">
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
                    <div v-if="notifications.officeProjectsAccepted.length > 0" class="info">
                      <span class="accept-reason">تم طرح مشروع {{ project.project_title }}</span>
                    </div>
                  </div>
                  <!--end accepted projects-->
                </div>
              </div>
            </ul>
          </div>
        </div>
      </nav>
      <!--
    <div class="container artcl">
      <p class="text-light">لوحة التحكم</p>
      <h3 class="mt-4">المشاريع</h3>
    </div>  
    -->
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
const myrefusedProject = ref({});
const refuseReasone = (refusedProject) => {
  myrefusedProject.value = refusedProject;
};
import { onMounted, ref } from "vue";
const logout = () => {
  if (
    localStorage.getItem(`notifications${notifications.userId}`) ||
    localStorage.getItem(`office_notifications${notifications.userId}`)
  ) {
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("type");
    localStorage.removeItem("token");
    localStorage.removeItem("phone");
    localStorage.removeItem("id");
    router.push("/admin");
  } else {
    localStorage.clear();
    router.push("/admin");
  }
};
const x = ref(window.matchMedia("(max-width:991px)"));
const auth = ref(null);
import { notify } from "@/stores/notifications";
const notifications = notify();
onMounted(() => {
  notifications.getAllProjects();
  console.log("notiiiii", notifications.getAllProjects());
  let token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "";
  auth.value = token != "" ? token : "";
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
  background: -webkit-linear-gradient(#ffffff, #fe8c8c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.accept-reason {
  display: inline-block;
  text-align: right;
  font-size: small;
  font-weight: bold;
  background: -webkit-linear-gradient(#ffffff, #8cfe9e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.notify-menu {
  overflow-y: scroll;
}

.notify-menu::-webkit-scrollbar {
  display: none !important;
}

nav {
  font-family: "Cairo", sans-serif;
  padding: 20px;
}

.nav-link:hover {
  color: #fff;
}

.content {
  /*height: 50vh;*/
  width: 100%;
  /* background-color: #59467C; */
}

.artcl {
  position: absolute;
  top: 20%;
  left: 8%;
}

.artcl h3 {
  font-size: 3rem;
  font-weight: 700;
  color: #fff;
}

p {
  font-size: 20px;
}

.navBg-img {
  width: 100vw;
  object-fit: cover;
}

li a {
  color: #ffffffcc;
  /* color: rgba(0, 0, 0, 0.80); */
  font-weight: 500;
  font-size: 18px;
}

li .qada {
  font-size: 35px;
}

.fa-bell {
  /* font-size: 2rem; */
  color: rgba(0, 0, 0, 0.8);
  color: #fff;
}

.create {
  background-color: #fff;
  color: #59467c;
  border-color: #59467c;
  border-radius: 1rem;
  width: 150px;
  height: 40px;
  color: linear-gradient(121.09deg, #59467c 30.12%, #000000 173.77%);
}

.login {
  /* background-color: #2A665D; */
  color: #59467c;
  /* color: linear-gradient(121.09deg, #59467C 30.12%, #000000 173.77%); */
  background-color: #fff;
  width: 150px;
  height: 40px;
  border-radius: 1rem;
  border-color: #59467c;
}

a {
  text-decoration: none;
}

li .ra2esia {
  text-decoration-line: underline;
}

li span {
  color: #48ac9d;
}

/* section{
    width: 100%;
    height: 50vh;
    background: url(../assets/bg-color.png);
    background-size: cover;
    background-position: center;
    top: 0;
  } */
/* .rounded-pill{
  background-color: #FF4B4B;
  color: #fff;
  } */
@media (max-width: 991px) {
  #navbarSupportedContent {
    z-index: 999;
    background-color: #2a665d;
    margin-left: 70%;
    margin-top: 20px;
  }

  .ra2esia {
    color: #fff !important;
  }
}

@media (max-width: 710px) {
  #navbarSupportedContent {
    z-index: 999;
    background-color: #2a665d;
    margin-left: 50%;
  }
}

@media (max-width: 576px) {
  .artcl {
    left: 0;
  }
}

@media (max-width: 500px) {
  #navbarSupportedContent {
    position: relative;
    top: -80px;
    right: -20px !important;
  }

  .responsive-header {
    display: flex;
    position: absolute;
    top: 20px;
    left: -40px;
    justify-content: end !important;
    flex-wrap: nowrap;
    min-height: 100px;
  }

  .create {
    margin-left: 50px !important;
  }

  .responsive-header .res-li {
    position: relative;
    left: 20px !important;
  }

  .notify-menu {
    position: absolute !important;
    top: 70px !important;
    left: 40px !important;
  }

  .navbar-toggler {
    margin-bottom: 100px !important;
  }
}

@media (max-width: 457px) {
  #navbarSupportedContent {
    z-index: 999;
    background-color: #2a665d;
    margin-left: 30%;
  }
}

@media (max-width: 390px) {
  #navbarSupportedContent {
    min-width: 70%;
  }
}

@media (max-width: 360px) {
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

  .notify-menu {
    max-width: 95vw !important;
  }
}

@media (max-width: 302px) {
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
