<template>
    <div class="row g-0 all">
        <div class="col-lg-12">
            <ul class="col-lg-12 me-5 d-flex res-li">
                <li @click="showComponent = 'الملف الشخصى'" class="tab"
                 :style="{'color':showComponent == 'الملف الشخصى' ? 'orangered' :'white'}">الملف الشخصى</li>
                <li @click="showComponent = 'الاعدادات'" class="me-5 tab" :style="{'color':showComponent == 'الاعدادات' ? 'orangered' :'white'}">الاعدادات</li>
            </ul>
            <userSettings v-if="showComponent == 'الاعدادات'"/>
            <div class=" col-lg-12 px-5 header" v-if="showComponent == 'الملف الشخصى'">
                <div class="px-4 parent-inf" :class="x.matches ? 'dropdown' : 'dropstart'">
  <span type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
    <p class="inf">معلومات العميل 
        <i class="fa-solid fa-bars"></i>
    </p>
  </span>
  <ul class="dropdown-menu py-2 rounded-4 pe-3 ps-5" aria-labelledby="dropdownMenuButton1" 
  style="background-color:#59467C;direction: rtl;text-align: right;width: 400px%;transition: 1s;position: relative !important;right: 50px;">
    <li
    @click="show_user = 'user',teamData.get_users_team(`${api}admin/users/index?type=user`) , teamData.userProjects = []" :style="{'cursor' : 'pointer' , 'textDecoration' : show_user == 'user' ? 'underline' : ''  , 'color' : show_user == 'user' ? 'orangered' : '#ffff'}"
    ><span>افراد</span></li>
    <li 
    @click="show_user = 'business',  teamData.userProjects = [],teamData.get_users_team(`${api}admin/users/index?type=business`)" :style="{'cursor' : 'pointer' , 'textDecoration' : show_user == 'business' ? 'underline' : '' , 'color' : show_user == 'business' ? 'orangered' : '#ffff'}"
    class="mt-3" style="cursor: pointer;"><span>اعمال</span></li>
    <li @click="show_user = 'office' ,teamData.userProjects = [],teamData.get_users_team(`${api}admin/users/index?type=office`)" :style="{'cursor' : 'pointer' , 'textDecoration' : show_user == 'office' ? 'underline' : '' , 'color' : show_user == 'office' ? 'orangered' : '#ffff'}"
    class="mt-3" style="cursor: pointer;"><span>مكاتب هندسية</span></li>
  </ul>
                </div>
            </div>
            <div class="loading d-flex justify-content-center" v-if="teamData.loading == true">
                <span class="mt-3 text-white fs-4 ms-3">
                    جارى التحميل...

                </span>
                <span>
                    <breeding-rhombus-spinner :animation-duration="2000" :size="65" color="#ff1d5e"/>
                </span>
            </div>
            <div class="team_data row justify-content-center" v-if="showComponent == 'الملف الشخصى' && teamData.loading == false">
                <div v-for="team , index in teamData.team_data" :key="index" class="col-xl-3 col-lg-3 col-md-5 col-sm-5 col-xs-3 py-5 mx-3 card1 container text-center rounded-5" 
                style="background-color: #59467C;"
                >
                <div class="user user_name">
            <span class="fs-5 text-primary"><i class="fa-solid fa-user"></i></span>
            <span class="fs-5 me-2">{{team.name  }} => {{ team.id }}</span>
                </div>
<hr>
                <div class="user user_mail mt-5">
                    <span class="fs-5 text-primary"><i class="fa-solid fa-envelope"></i></span>
                    <span class="fs-5 me-2">{{team.email  }}</span>
                </div>
                <hr>
                <div class="user user_phone mt-5">
    <span class="fs-5 text-primary"><i class="fa-solid fa-phone"></i></span>
 <span class="fs-5 me-2">{{team.phone  }}</span>
                </div>
                <hr>
                <div class="user user_status mt-5">
                <span class="fs-5 text-primary">الحالة :</span>
                <span class="fs-5 me-2">{{ team.active == 1 ? 'مفعل' : 'غير مفعل' }}</span>
                </div>
                <hr>
                <div class="actions">
                    
                    <button @click="teamData.activate_user_account(team ,`${api}admin/users/index?type=${show_user}` ,index)" :disabled="team.active == 1 ? true : false" class="btn btn-warning">{{ 'تفعيل' }}</button>
                    
                    <button :disabled="team.active == 1 ? false : true" @click="teamData.getUserProjects(`${api}admin/users/show/${team.id}` , index)" class="btn btn-danger me-2">عرض المشاريع</button>
                </div>
                <div class="loading d-flex justify-content-center pt-3" v-if="teamData.customLoading == index">
                <span class="mt-3 text-white fs-5 ms-3">
                    جارى التحميل...

                </span>
                <span>
                    <fulfilling-bouncing-circle-spinner :animation-duration="4000" :size="60" color="#ff1d5e"/>
                </span>
            </div>
            <div v-if="teamData.register == index" class="text-center"><span class="fw-bold fs-6 text-info">{{ teamData.register }}</span></div>
            </div>
            </div>
           
        </div>
        <div class=" col-lg-12 px-5  mt-5" v-if="showComponent == 'الملف الشخصى' && teamData.userProjects.length > 0">
            <div class="inf px-4">اخر المشاريع لهذا العميل</div>
        </div>
        <div class=" col-lg-12 px-5 py-5 mt-5" v-if="showComponent == 'الملف الشخصى' && teamData.userProjects.length == 0">
            <div class="inf px-4">لا يوجد مشاريع</div>
        </div>
       
        <div class="px-5 card-parent" v-if="showComponent == 'الملف الشخصى'">
            <div class="rounded-5 col-lg-12 m-auto my-5  card" v-for="project , index in teamData.userProjects" :key="index">
            <div class="row">
                <div class="col-12">
                    <div class="card-body me-5">{{ project.project_title }}</div>
                </div>
                <div class="row d-flex card2 justify-content-center">
                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 text-center">
                        <div class="card-content">
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                                <path
                                    d="M13 23.9375C6.96875 23.9375 2.0625 19.0312 2.0625 13C2.0625 6.96875 6.96875 2.0625 13 2.0625C19.0312 2.0625 23.9375 6.96875 23.9375 13C23.9375 19.0312 19.0312 23.9375 13 23.9375ZM13 3.625C7.82812 3.625 3.625 7.82812 3.625 13C3.625 18.1719 7.82812 22.375 13 22.375C18.1719 22.375 22.375 18.1719 22.375 13C22.375 7.82812 18.1719 3.625 13 3.625Z"
                                    fill="#48847B" />
                                <path
                                    d="M16.125 16.9062C15.9844 16.9062 15.8437 16.875 15.7187 16.7969L11.8125 14.4531C11.6968 14.3836 11.6013 14.285 11.5355 14.1671C11.4697 14.0493 11.4359 13.9162 11.4375 13.7812V7.53125C11.4375 7.09375 11.7812 6.75 12.2187 6.75C12.6562 6.75 13 7.09375 13 7.53125V13.3438L16.5312 15.4531C16.6767 15.5423 16.7891 15.6764 16.8515 15.8352C16.9138 15.994 16.9227 16.1688 16.8768 16.3331C16.8308 16.4974 16.7326 16.6422 16.5969 16.7456C16.4613 16.8491 16.2956 16.9055 16.125 16.9062Z"
                                    fill="#48847B" />
                            </svg>
                            <div class="card-content-text">تاريخ الطرح</div>
                        </div>
                        <div>
                            <span class="subContent">2023-6-8</span>
                        </div>
                        <div class="card-content">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                <g clip-path="url(#clip0_2773_5396)">
                                    <path
                                        d="M12.5 21C7.5 21 1.5 16 1.5 12C1.5 8 7.5 3 12.5 3C17.5 3 23.5 8 23.5 12C23.5 16 17.5 21 12.5 21ZM12.5 7C11.1739 7 9.90215 7.52678 8.96447 8.46447C8.02678 9.40215 7.5 10.6739 7.5 12C7.5 13.3261 8.02678 14.5979 8.96447 15.5355C9.90215 16.4732 11.1739 17 12.5 17C13.8261 17 15.0979 16.4732 16.0355 15.5355C16.9732 14.5979 17.5 13.3261 17.5 12C17.5 10.6739 16.9732 9.40215 16.0355 8.46447C15.0979 7.52678 13.8261 7 12.5 7Z"
                                        stroke="#48847B" stroke-width="2" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_2773_5396">
                                        <rect width="24" height="24" fill="white" transform="translate(0.5)" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <span class="card-content-text">المشاهدات</span>
                        </div>
                        <div>
                            <span class="subContent">500</span>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 text-center">
                        <div class="card-content">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                <path
                                    d="M18.157 5.80402C15.033 2.73102 9.968 2.73102 6.844 5.80402C6.10229 6.52865 5.51291 7.39425 5.11052 8.34993C4.70813 9.3056 4.50084 10.3321 4.50084 11.369C4.50084 12.406 4.70813 13.4324 5.11052 14.3881C5.51291 15.3438 6.10229 16.2094 6.844 16.934L12.5 22.499L18.157 16.934C18.8987 16.2094 19.4881 15.3438 19.8905 14.3881C20.2929 13.4324 20.5002 12.406 20.5002 11.369C20.5002 10.3321 20.2929 9.3056 19.8905 8.34993C19.4881 7.39425 18.8987 6.52865 18.157 5.80402ZM12.5 13.999C11.832 13.999 11.205 13.739 10.732 13.267C10.2638 12.7978 10.0008 12.1619 10.0008 11.499C10.0008 10.8361 10.2638 10.2003 10.732 9.73102C11.204 9.25902 11.832 8.99902 12.5 8.99902C13.168 8.99902 13.796 9.25902 14.268 9.73102C14.7363 10.2003 14.9992 10.8361 14.9992 11.499C14.9992 12.1619 14.7363 12.7978 14.268 13.267C13.796 13.739 13.168 13.999 12.5 13.999Z"
                                    fill="#48847B" />
                            </svg>
                            <span class="card-content-text">الموقع</span>
                        </div>
                        <div>
                      <span>{{ project.city_name }} - {{ project.area }}</span>
                    </div>
                        <div class="card-content">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                <path
                                    d="M5.5 4.5V10.525V10.5V20.5V4.5ZM7.5 14.5H11C11.15 14.1167 11.3333 13.7583 11.55 13.425C11.7667 13.0917 12.0167 12.7833 12.3 12.5H7.5V14.5ZM7.5 18.5H10.675C10.5917 18.1667 10.5373 17.8333 10.512 17.5C10.4867 17.1667 10.491 16.8333 10.525 16.5H7.5V18.5ZM3.5 22.5V2.5H13.5L19.5 8.5V11C19.1833 10.8667 18.8583 10.7623 18.525 10.687C18.1917 10.6117 17.85 10.5577 17.5 10.525V9.5H12.5V4.5H5.5V20.5H11.525C11.7917 20.9 12.0917 21.271 12.425 21.613C12.7583 21.955 13.125 22.2507 13.525 22.5H3.5ZM17 19.5C17.7 19.5 18.2917 19.2583 18.775 18.775C19.2583 18.2917 19.5 17.7 19.5 17C19.5 16.3 19.2583 15.7083 18.775 15.225C18.2917 14.7417 17.7 14.5 17 14.5C16.3 14.5 15.7083 14.7417 15.225 15.225C14.7417 15.7083 14.5 16.3 14.5 17C14.5 17.7 14.7417 18.2917 15.225 18.775C15.7083 19.2583 16.3 19.5 17 19.5ZM22.1 23.5L19.4 20.8C19.05 21.0333 18.671 21.2083 18.263 21.325C17.855 21.4417 17.434 21.5 17 21.5C15.75 21.5 14.6877 21.0623 13.813 20.187C12.9383 19.3117 12.5007 18.2493 12.5 17C12.5 15.75 12.9377 14.6873 13.813 13.812C14.6883 12.9367 15.7507 12.4993 17 12.5C18.25 12.5 19.3127 12.9377 20.188 13.813C21.0633 14.6883 21.5007 15.7507 21.5 17C21.5 17.4333 21.4417 17.8543 21.325 18.263C21.2083 18.6717 21.0333 19.0507 20.8 19.4L23.5 22.1L22.1 23.5Z"
                                    fill="#48847B" />
                            </svg>
                            <span class="card-content-text ">الرقم المرجعي</span>
                        </div>
                        <div>
                      <span>{{ project.id }}</span>
                    </div>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 text-center">
                        <div class="card-content">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                <path
                                    d="M18.157 5.80402C15.033 2.73102 9.968 2.73102 6.844 5.80402C6.10229 6.52865 5.51291 7.39425 5.11052 8.34993C4.70813 9.3056 4.50084 10.3321 4.50084 11.369C4.50084 12.406 4.70813 13.4324 5.11052 14.3881C5.51291 15.3438 6.10229 16.2094 6.844 16.934L12.5 22.499L18.157 16.934C18.8987 16.2094 19.4881 15.3438 19.8905 14.3881C20.2929 13.4324 20.5002 12.406 20.5002 11.369C20.5002 10.3321 20.2929 9.3056 19.8905 8.34993C19.4881 7.39425 18.8987 6.52865 18.157 5.80402ZM12.5 13.999C11.832 13.999 11.205 13.739 10.732 13.267C10.2638 12.7978 10.0008 12.1619 10.0008 11.499C10.0008 10.8361 10.2638 10.2003 10.732 9.73102C11.204 9.25902 11.832 8.99902 12.5 8.99902C13.168 8.99902 13.796 9.25902 14.268 9.73102C14.7363 10.2003 14.9992 10.8361 14.9992 11.499C14.9992 12.1619 14.7363 12.7978 14.268 13.267C13.796 13.739 13.168 13.999 12.5 13.999Z"
                                    fill="#48847B" />
                            </svg>
                            <span class="card-content-text">المدة المقترحة لنهاية المشروع</span>
                        </div>
                        <div>
                      <span>{{ project.project_days_limit }}</span>
                    </div>
                        <div class="card-content">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M5.5 7C5.10218 7 4.72064 6.84196 4.43934 6.56066C4.15804 6.27936 4 5.89782 4 5.5C4 5.10218 4.15804 4.72064 4.43934 4.43934C4.72064 4.15804 5.10218 4 5.5 4C5.89782 4 6.27936 4.15804 6.56066 4.43934C6.84196 4.72064 7 5.10218 7 5.5C7 5.89782 6.84196 6.27936 6.56066 6.56066C6.27936 6.84196 5.89782 7 5.5 7ZM21.41 11.58L12.41 2.58C12.05 2.22 11.55 2 11 2H4C2.89 2 2 2.89 2 4V11C2 11.55 2.22 12.05 2.59 12.41L11.58 21.41C11.95 21.77 12.45 22 13 22C13.55 22 14.05 21.77 14.41 21.41L21.41 14.41C21.78 14.05 22 13.55 22 13C22 12.44 21.77 11.94 21.41 11.58Z"
                                    fill="#48847B" />
                            </svg>
                            <span class="card-content-text ">العروض المستلمة</span>
                        </div>
                        <div>
                            <span class="subContent">0</span>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 text-center">
                        <div class="card-content">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                <path
                                    d="M4.29399 12.53C4.83099 9.842 5.09999 8.5 5.98699 7.634C6.15092 7.47444 6.32824 7.32924 6.51699 7.2C7.53999 6.5 8.90999 6.5 11.65 6.5H13.353C16.092 6.5 17.461 6.5 18.483 7.2C18.673 7.33 18.85 7.476 19.013 7.635C19.901 8.5 20.17 9.843 20.707 12.529C21.478 16.385 21.864 18.313 20.976 19.679C20.816 19.927 20.628 20.156 20.416 20.362C19.25 21.5 17.285 21.5 13.353 21.5H11.65C7.71699 21.5 5.75099 21.5 4.58499 20.362C4.37402 20.1557 4.18655 19.9266 4.02599 19.679C3.13799 18.313 3.52399 16.385 4.29599 12.529L4.29399 12.53Z"
                                    stroke="#48847B" stroke-width="1.5" />
                                <path
                                    d="M15.5 10.5C16.0523 10.5 16.5 10.0523 16.5 9.5C16.5 8.94772 16.0523 8.5 15.5 8.5C14.9477 8.5 14.5 8.94772 14.5 9.5C14.5 10.0523 14.9477 10.5 15.5 10.5Z"
                                    fill="#48847B" />
                                <path
                                    d="M9.5 10.5C10.0523 10.5 10.5 10.0523 10.5 9.5C10.5 8.94772 10.0523 8.5 9.5 8.5C8.94772 8.5 8.5 8.94772 8.5 9.5C8.5 10.0523 8.94772 10.5 9.5 10.5Z"
                                    fill="#48847B" />
                                <path
                                    d="M9.5 6.5V5.5C9.5 4.70435 9.81607 3.94129 10.3787 3.37868C10.9413 2.81607 11.7044 2.5 12.5 2.5C13.2956 2.5 14.0587 2.81607 14.6213 3.37868C15.1839 3.94129 15.5 4.70435 15.5 5.5V6.5"
                                    stroke="#48847B" stroke-width="1.5" stroke-linecap="round" />
                            </svg>
                            <span class="card-content-text">الخدمة المطلوبة</span>
                        </div>
                        <div class="text-center">
                        <span v-for="myP in project.electronic_service" :key="myP">
                           {{ myP.name }}
                        
                      </span>
                      </div>
                        <div class="card-content">
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="25" viewBox="0 0 26 25" fill="none">
                                <path
                                    d="M13 23.4375C6.96875 23.4375 2.0625 18.5312 2.0625 12.5C2.0625 6.46875 6.96875 1.5625 13 1.5625C19.0312 1.5625 23.9375 6.46875 23.9375 12.5C23.9375 18.5312 19.0312 23.4375 13 23.4375ZM13 3.125C7.82812 3.125 3.625 7.32812 3.625 12.5C3.625 17.6719 7.82812 21.875 13 21.875C18.1719 21.875 22.375 17.6719 22.375 12.5C22.375 7.32812 18.1719 3.125 13 3.125Z"
                                    fill="#48847B" />
                                <path
                                    d="M16.125 16.4062C15.9844 16.4062 15.8437 16.375 15.7187 16.2969L11.8125 13.9531C11.6968 13.8836 11.6013 13.785 11.5355 13.6671C11.4697 13.5493 11.4359 13.4162 11.4375 13.2812V7.03125C11.4375 6.59375 11.7812 6.25 12.2187 6.25C12.6562 6.25 13 6.59375 13 7.03125V12.8438L16.5312 14.9531C16.6767 15.0423 16.7891 15.1764 16.8515 15.3352C16.9138 15.494 16.9227 15.6688 16.8768 15.8331C16.8308 15.9974 16.7326 16.1422 16.5969 16.2456C16.4613 16.3491 16.2956 16.4055 16.125 16.4062Z"
                                    fill="#48847B" />
                            </svg>
                            <span class="card-content-text ">آخر موعد لأستلام عروض الاسعار</span>
                        </div>
                        <div>
                

                            <span class="subContent">{{ project.last_offers_date }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <!--
                
            -->
            <div class="d-flex justify-content-center my-5">
                <!--
<button class="edit-button">تعديل</button>
                <button class="delete-button">حذف</button>
                -->
                
            </div>
        </div>      
        </div>
      
    </div>
</template>


<script setup>
import { FulfillingBouncingCircleSpinner } from 'epic-spinners'
import { BreedingRhombusSpinner } from 'epic-spinners'
import { project_api } from '@/stores/api';
import { team } from '@/stores/team/team'; 
import userSettings from '@/modules/Admin/users/UserSettings.vue';
import { ref , onMounted} from 'vue';
const showComponent = ref('الملف الشخصى');
const show_user = ref('user')
const x = ref(window.matchMedia("(max-width:450px)"));
const teamData = team();
const api = ref(project_api);
onMounted(async()=>{
teamData.get_users_team(`${api.value}admin/users/index?type=user`)
})
</script>
<style scoped>
* {
    direction: rtl;
    box-sizing: border-box;

}
.all{
    overflow: auto;
}
.all::-webkit-scrollbar{
    display: none;
}
.btn{
    transition: 0.5s;
}
  .btn:hover{
scale: 1.1;
filter: brightness(1.1);
  }

ul li{
    transition: 0.5s;
    font-weight: 500;
}
ul li:hover{
scale: 1.1;
color: orangered !important;
}
.tab{
    cursor: pointer;
    transition: 0.5s;

}
.tab:hover{
scale: 1.1;
color: orangered !important;
}






.sideCard {
    background-color: #59467C;
    color: #fff;
    width: 170px;
    height: 461px;
    text-align: center;
    border-radius: 18px 0 0 18px;
}

.sideCard li {
    list-style-type: none;
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


li {
    list-style-type: none;
    color: #FFFFFF;
    font-size: 20px;
    font-weight: 500;
}
.team_data{
    overflow: auto !important;

}

.team_data::-webkit-scrollbar{
    display: none;
}
.card1 {
    border: 1px solid #FFFFFF;
    background-color: #00665e !important;
    color: #fff;
    margin-top: 15vh !important;
    padding-top: 10px;
    padding-bottom: 10px;
    overflow-y: scroll !important;
}
.card1::-webkit-scrollbar{
    display: none;
}
.card1 span{
    overflow-x: auto;
}
.card1 span::-webkit-scrollbar{
display: none;
}
.secondLink {
    color: #fff;
    text-decoration-line: underline;
}

.inf {
    color: #FFFFFF;
    font-size: 2.5rem;
    font-weight: 600;
}
.textcolor {
    color: #48847B;
    font-weight: 700;
}

.textsize {
    font-size: 1rem;
    font-weight: 600;
}

.card-title {
    color: #000;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
}

.card-body {
    color: #48847B;
    font-size: 24px;
    font-weight: 500;
}

.card-content {
    display: flex;
    align-items: center;
    margin-top: 1rem;
    justify-content: center;
    margin-top: 10px;
}

.card-content-text {
    color: rgba(0, 0, 0, 0.5);
}

.subContent {
    margin-right: 1.5rem;
}

.edit-button {
    border-radius: 20px;
    background: #6ab38a;
    border: none;
    padding: 10px 20px;
    margin: 0rem 0.25rem;
}

.delete-button {
    border-radius: 20px;
    background: #d02525;
    border: none;
    padding: 10px 20px;
}

@media (max-width: 750px) {
    .card1{
        width: 60% !important;
    }
}
@media (max-width:580px) {
    .inf{
        padding: 0px;
        text-align: center !important;
    }
    
}
@media (max-width:550px) {
    .inf{
        font-size: 6vw;
    }
    .card-parent{
        display: flex;
        flex-wrap: wrap;
        padding:0px 20px 0px 20px!important;   
        justify-content: center !important;
        overflow: hidden !important;
        background-color: white !important;
    }
    .card-parent::-webkit-scrollbar{
        display: none !important;
    }
   .card{
    padding: 0px !important;
    width: 150% !important;
   }
   .card1{
    width: 80% !important;
   }
    
}
@media (max-width:400px) {
    .res-li{
        margin-right: 0px !important;
    }
    .parent-inf{
        position: relative;
        font-size: 1.5rem;
        margin-right: 0px !important;
        padding: 0px !important;
    }
    .inf{
        position: relative;
        width: 150%;
        left: 22%;
        font-size: 7vw;
        
    }
    .card1{
        width: 85% !important;
    }
    
    
}
@media (max-width:330px) {
    .res-li {
        display: flex !important;
        justify-content: start;
        flex-wrap: wrap;
        text-align: flex-start;
        direction: rtl;
    }
    .res-li li{
        width: 100%;
    }
.res-li li:nth-last-of-type(1){
    position: relative;
    left: 47px !important;
}
    
}
</style>