<template>
  <div>
    <MemberHeader />
    <div
      class="row"
      style="
        position: relative;
        top: -60px;
        max-width: 100%;
        overflow-x: hidden;
      "
    >
      <div
        class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 container mt-5 pt-5"
      >
        <div id="sidebar" class="sideCard" style="transition: 1s">
          <ul>
            <label for="rotate" class="icon">
              <input
                id="rotate"
                @click="show_sidebar()"
                type="checkbox"
                class="d-none"
              />
              <div class="square">
                <i class="fa-solid fa-backward"></i>
              </div>
            </label>
            <li class="text-light">مرحبا</li>
            <li class="authName">{{ personName }}</li>
            <li
              class="mt-4"
              @click="my_projects"
              :style="{
                cursor: 'pointer',
                textDecoration: showComponent == 'مشاريعى' ? 'underline' : '',
              }"
            >
              مشاريعى
            </li>
            <li
              class="mt-4"
              @click="set_project"
              :style="{
                cursor: 'pointer',
                textDecoration:
                  showComponent == 'اضافة مشروع' ? 'underline' : '',
              }"
            >
              اضافة مشروع
            </li>
            <li
              @click="my_account"
              class="mt-4 sidbarLink"
              :style="{
                cursor: 'pointer',
                textDecoration: showComponent == 'حسابى' ? 'underline' : '',
              }"
            >
              حسابى
            </li>
            <li
              class="mt-4 sidbarLink"
              @click="my_chat"
              :style="{
                cursor: 'pointer',
                textDecoration: showComponent == 'المراسلات' ? 'underline' : '',
              }"
            >
              المراسلات
            </li>
            <li @click="logOut" class="mt-4">
              <router-link class="sidbarLink" to="">تسجيل خروج</router-link>
            </li>
          </ul>
        </div>
        <MyProjects v-if="showComponent == 'مشاريعى'" />
        <myAccountmember v-if="showComponent == 'حسابى'" />
        <chatMember v-if="showComponent == 'المراسلات'" />
        <div
          v-motion-slide-left
          class="add-project"
          v-if="showComponent == 'اضافة مشروع'"
        >
          <div
            class="d-flex justify-content-between align-items-center mx-auto mt-5 main-section"
          >
            <div class="text-center col-md-3 col-sm-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                viewBox="0 0 100 100"
                fill="none"
              >
                <circle cx="50" cy="50" r="50" fill="#48847B" />
                <path
                  d="M31.5 54.5L46.2122 65L65 35"
                  stroke="white"
                  stroke-width="5"
                />
              </svg>
              <p class="d-block w-100 project-draft">مسودة المشروع</p>
            </div>
            <hr class="col-md-6 col-sm-6 my-4 custom-hr" />
            <div class="text-center col-md-3 col-sm-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                viewBox="0 0 100 100"
                fill="none"
              >
                <circle cx="50" cy="50" r="50" fill="#656565" />
              </svg>
              <p
                class="d-block w-100"
                style="color: #656565; text-align: center"
              >
                إرسال للمراجعة
              </p>
            </div>
          </div>

          <p class="projecttitle">تفاصيل المشروع</p>
          <form class="add-project" enctype="multipart/form-data">
            <div class="row">
              <div class="col-12">
                <input
                  type="text"
                  class="form-control project-details"
                  placeholder="المشروع عبارة عن مسودة يجب إرساله للمراجعة بعد الانتهاء."
                  disabled
                />
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <p>
                  اسم المشروع
                  <span class="text-danger" v-if="v$.project_title.$error"
                    >*</span
                  >
                </p>
                <input
                  type="text"
                  class="form-control"
                  v-model="form.project_title"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <p>
                  وصف المشروع (مثال: عدد غرف النوم، والفراغات، ومكونات المشروع )
                  <span class="text-danger" v-if="v$.project_details.$error"
                    >*</span
                  >
                </p>
                <textarea
                  class="form-control"
                  style="height: 100px"
                  v-model="form.project_details"
                  placeholder="ارغب في تصميم فيلا دوبليكس مكونه من 4 غرف نوم و 5 حمامات والمرافق الخدمية لها..."
                ></textarea>
                <p class="descriptionfortextarea">
                  عدد الحروف لا يقل عن 150 (95/150)
                </p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 col-sm-12">
                <p>
                  مساحة المشروع
                  <span class="text-danger" v-if="v$.space.$error">*</span>
                </p>
                <input
                  type="number"
                  class="form-control text-start"
                  min="0"
                  placeholder="م2"
                  v-model="form.space"
                />
              </div>
              <div class="col-md-6 col-sm-12">
                <p>
                  تصنيف المشروع
                  <span class="text-danger" v-if="v$.service_category.$error"
                    >*</span
                  >
                </p>
                <select
                  class="form-select custom-select"
                  id="floatingSelect"
                  v-model="form.service_category"
                >
                  <option selected></option>
                  <option
                    style="text-align: right"
                    v-for="item in getApiValues.service_category"
                    :value="item.id"
                    :key="item.id"
                  >
                    {{ item.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="row">
              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                <p>
                  الخدمة الإلكترونية المطلوبة
                  <span class="text-danger" v-if="v$.electronic_service.$error"
                    >*</span
                  >
                </p>
                <select
                  class="form-select"
                  id="floatingSelect"
                  v-model="form.electronic_service"
                >
                  <option
                    v-for="item in getApiValues.services"
                    :key="item.id"
                    :value="item.id"
                  >
                    {{ item.name }}
                  </option>
                </select> 
              </div>
              <div
                class="d-flex col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 justify-content-start align-items-end pb-2"
              >
                <label for="check-box" class="me-4"
                  >طلب مستندات حصر الكميات الهندسى</label
                >
                <input
                  id="check-box"
                  class="form-check-input me-3"
                  type="checkbox"
                  v-model="form.request_qty_tables"
                />

                <!-- 
                  @click="check_box_validation($event)"
                  <span
                  v-if="v$.request_qty_tablesValidation.$error"
                  class="text-danger fs-5"
                  >*</span
                > -->
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <p>
                  تاريخ نهاية طرح المشروع
                  <span class="text-danger" v-if="v$.last_offers_date.$error"
                    >*</span
                  >
                </p>
                <select
                  class="form-select"
                  id="floatingSelect"
                  v-model="form.last_offers_date"
                >
                  <option selected></option>
                  <option value="4">
                    طرح المشروع في منصة المشاريع لمدة 4 أيام
                  </option>
                  <option value="9">
                    طرح المشروع في منصة المشاريع لمدة 9 أيام
                  </option>
                </select>

                <p class="descriptionfortextarea">
                  لن يتم استقبال عروض اسعار جديدة ولن يظهر المشروع في منصة
                  المشاريع بعد انتهاء طرح المشروع
                </p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 col-sm-12">
                <p>المنطقة</p>
                <input
                  class="form-control"
                  type="text"
                  readonly
                  id="area"
                  v-model="form.area"
                />
              </div>
              <div class="col-md-6 col-sm-12">
                <p>
                  المدة المقترحة لأنهاء الاعمال المطلوبة
                  <span class="text-danger" v-if="v$.project_days_limit.$error"
                    >*</span
                  >
                </p>
                <input
                  type="number"
                  placeholder="عدد الايام"
                  class="form-control"
                  min="0"
                  v-model="form.project_days_limit"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 col-sm-12">
                <p>
                  اختيار تصنيف المكاتب الهندسية
                  <span class="text-danger" v-if="v$.eng_offices_class.$error"
                    >*</span
                  >
                </p>
                <select
                  class="form-select"
                  id="floatingSelect"
                  v-model="form.eng_offices_class"
                >
                  <option selected></option>
                  <option
                    v-for="item in getApiValues.eng_offices_class"
                    :key="item.id"
                    :value="item.id"
                  >
                    {{ item.name }}
                  </option>
                </select>
                <p class="descriptionfortextarea">
                  تختلف الاسعار نسبيا مع اختيار تصنيف المكتب الهندسى (حيث ان
                  درجة 6 هو اعلى تصنيف)
                </p>
              </div>
              <div class="col-md-6 col-sm-12">
                <p>المدينة</p>

                <input
                  class="form-control"
                  type="text"
                  readonly
                  id="area"
                  v-model="form.city"
                />
              </div>
            </div>

            <div class="row my-5 justify-content-center text-center">
              <div class="col">
                <p class="text-center">
                  وثيقة تملك عقاري
                  <span v-if="v$.title_deed.$error" class="text-danger">*</span>
                </p>
                <label for="propertyDoc" class="file-label">
                  <img
                    :src="
                      add_project.first.path != ''
                        ? add_project.first.path
                        : require('../../../assets/3322766-2001.png')
                    "
                    class="upload-image"
                  />
                </label>
                <input
                  type="file"
                  id="propertyDoc"
                  accept="image/*"
                  @change="
                    add_project.getFirstImage($event),
                      (form.title_deed = $event.target.files[0].name)
                  "
                  class="file-input"
                  style="display: none"
                />
              </div>
              <div class="col">
                <p class="text-center">
                  صورة من نظام البناء
                  <span v-if="v$.owner_id.$error" class="text-danger">*</span>
                </p>
                <p> noooor {{add_project.second.path}}</p>
                <label for="ownerIdDoc" class="file-label">
                  <img
                    :src="
                      add_project.second.path != ''
                        ? add_project.second.path
                        : require('../../../assets/3322766-2001.png')
                    "
                    class="upload-image"
                  />
                </label>
                <input
                  type="file"
                  id="ownerIdDoc"
                  @change="
                    add_project.getSecondImage($event),
                      (form.owner_id = $event.target.files[0].name)
                  "
                  class="file-input"
                  style="display: none"
                />
              </div>
              <div class="col">
                <p class="text-center">
                  مستندات اخري داعمة
                  <!-- <span v-if="v$.other_files.$error" class="text-danger"
                    >*</span
                  > -->
                </p>
                <label for="otherDocs" class="file-label">
                  <img
                    :src="
                      add_project.third.path != ''
                        ? add_project.third.path
                        : require('../../../assets/3322766-2001.png')
                    "
                    class="upload-image"
                  />
                </label>
                <input
                  type="file"
                  id="otherDocs"
                  multiple
                  @change="
                    add_project.getThirdImage($event),
                      (form.other_files = $event.target.files[0].name)
                  "
                  class="file-input"
                  style="display: none"
                />
              </div>
            </div>

            <div class="row">
              <div class="text-center mb-2">
                <span class="fs-6 text-danger">{{ registerd }}</span>
              </div>
              <button
                @click.prevent="addproject()"
                class="btn btn-success py-2"
              >
                <span v-if="loading == false" class="fs-6">طرح مشروع</span>
                <span v-if="loading == true" class="d-inline-block">
                  <looping-rhombuses-spinner
                    :animation-duration="2500"
                    :rhombus-size="20"
                    color="#ff1d5e"
                  />
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { LoopingRhombusesSpinner } from "epic-spinners";
import myAccountmember from "./dashboardForMember/MyAccount.vue";
import MyProjects from "./dashboardForMember/MyProjects.vue";
import chatMember from "./dashboardForMember/chatMember.vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { addProjectMember } from "@/stores/memberAddProject";
import { ref, onMounted, onUnmounted } from "vue";
//import memberService from "../services/memberService";
import MemberHeader from "../components/MemberHeader.vue";
import { getOptionsApi } from "@/stores/getApiOptions";
import axios from "axios";
import router from "@/router";
import { notify } from "@/stores/notifications";
import { redirectAuth } from "@/stores/redirectAuth/redirect";
export default {
  components: {
    MyProjects,
    MemberHeader,
    chatMember,
    myAccountmember,
    LoopingRhombusesSpinner,
  },
  setup() {
    let showComponent = ref("");
    const my_projects = () => {
      localStorage.setItem("showComponent", "مشاريعى");
      showComponent.value = localStorage.getItem("showComponent");
    };
    const set_project = () => {
      localStorage.setItem("showComponent", "اضافة مشروع");
      showComponent.value = localStorage.getItem("showComponent");
    };
    const my_account = () => {
      localStorage.setItem("showComponent", "حسابى");
      showComponent.value = localStorage.getItem("showComponent");
    };
    const my_chat = () => {
      localStorage.setItem("showComponent", "المراسلات");
      showComponent.value = localStorage.getItem("showComponent");
    };

    const notifications = notify();
    const show_sidebar = () => {
      document.querySelector("#sidebar").classList.toggle("gear");
    };
    const redirect = redirectAuth();
    // const check_box_validation = (e) => {
    //   e.target.checked == true
    //     ? (form.request_qty_tablesValidation = "checked")
    //     : e.target.checked == false
    //     ? (form.request_qty_tablesValidation = "")
    //     : "";
    // };
    const getApiValues = getOptionsApi();
    const userId = ref(
      localStorage.getItem("id") ? localStorage.getItem("id") : ""
    );
    const logOut = () => {
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
        router.push("/loginPanal");
      } else {
        localStorage.clear();
        router.push("/loginPanal");
      }
    };
    const registerd = ref(null);
    const token = ref(null);
    const loading = ref(false);
    const add_project = addProjectMember();
    const name = localStorage.getItem("name");
    const personName = ref(
      localStorage.getItem("email")
        ? localStorage
            .getItem("email")
            .slice(0, localStorage.getItem("email").indexOf("@"))
        : ""
    );
    const rules = {
      project_title: { required },
      project_details: { required },
      space: { required },
      service_category: { required },
      electronic_service: { required },
      last_offers_date: { required },
      area: { required },
      project_days_limit: { required },
      eng_offices_class: { required },
      city: { required },
      offer_choosing_date: { required },
      title_deed: { required },
      owner_id: { required },
      other_files: { required },
      // request_qty_tablesValidation: { required },
    };
    const form = ref({
      project_title: "",
      project_details: "",
      space: "",
      service_category: "",
      electronic_service: "",
      last_offers_date: "",
      area: "المنطقة الوسطى",
      project_days_limit: "",
      eng_offices_class: "",
      city: "الرياض",
      offer_choosing_date: "12-11-2023",
      title_deed: "",
      owner_id: "",
      other_files: "",
      request_qty_tables: false,
      request_engs: 0,
      request_qty_tablesValidation: "",
    });
    const v$ = useVuelidate(rules, form);
    const selectedTitle_deedFile = ref(null);
    const handleFileTitle_deed = (event) => {
      if (event.target.files.length >= 0) {
        selectedTitle_deedFile.value = event.target.files[0];
      }
    };

    const selectedOwner_idFile = ref(null);
    const handleFileOwner_id = (event) => {
      if (event.target.files.length >= 0) {
        selectedOwner_idFile.value = event.target.files[0];
      }
    };

    const selectedOtherDocsFile = ref([]);
    const handleFileOtherDocs = (event) => {
      if (event.target.files.length >= 0) {
        selectedOtherDocsFile.value = event.target.files[0];
      }
    };

    const addproject = async () => {
     
      
      v$.value.$validate();
      if (v$.value.$errors.length == 0) {
        if(token.value !== undefined && token.value !== null){
        loading.value = true;
        await axios
          .post(
            "https://test.m-aboelela.online/api/user/projects/create",
            {
              project_title: form.value.project_title,
              project_details: form.value.project_details,
              space: form.value.space,
              service_category: form.value.service_category,
              electronic_service: [form.value.electronic_service],
              last_offers_date: form.value.last_offers_date,
              area: form.value.area,
              project_days_limit: form.value.project_days_limit,
              eng_offices_class: form.value.eng_offices_class,
              city: 1,
              offer_choosing_date: form.value.offer_choosing_date,
              title_deed: add_project.firstImage,
              owner_id: add_project.secondImage,
              other_files: add_project.thirdImage,
              request_qty_tables: form.value.request_qty_tables,
              request_engs: form.value.request_engs,
            },
            {
              headers: {
                "Content-Type": "multipart/form-.value.data",
                Accept: "*/*",
                "Content-Length": "",
                "Accept-Encoding": "gzip, deflate, br",
                Connection: "keep-alive",
                Host: "",
                Authorization: "Bearer " + token.value,
              },
            }
          )
          .then((res) => {
            if (res.status == 200) {
              loading.value = false;
              registerd.value = "تم اضافة عرض المشروع بنجاح";
              setTimeout(() => {
                registerd.value = "";
              }, 3000);
            }
          })
          .catch((error) => {
            console.log(error);
            if (error) {
              loading.value = false;
              registerd.value =
                "فشل فى ارسال المشروع لعدم اكتمال البيانات المطلوبة";
              setTimeout(() => {
                registerd.value = "";
              }, 3000);
            }
          });
        
        }
        else {
          console.log("1",add_project.firstImage);
          console.log("2",add_project.secondImage);
          let projectData = JSON.stringify(
          {
            project_title: form.value.project_title,
            project_details: form.value.project_details,
            space: form.value.space,
            service_category: form.value.service_category,
            electronic_service: [form.value.electronic_service],
            last_offers_date: form.value.last_offers_date,
            area: form.value.area,
            project_days_limit: form.value.project_days_limit,
            eng_offices_class: form.value.eng_offices_class,
            city: 1,
            offer_choosing_date: form.value.offer_choosing_date,
            title_deed: add_project.firstImage,
            owner_id: add_project.secondImage,
            other_files: add_project.thirdImage,
            request_qty_tables: form.value.request_qty_tables,
            request_engs: form.value.request_engs,
          }
          )
          localStorage.setItem("title_deed",add_project.firstImage);
          localStorage.setItem("owner_id",add_project.secondImage);
          localStorage.setItem("other_files",add_project.thirdImage);          
          localStorage.setItem("projectData",projectData);

          await redirect.redirectToControlPanel();
        }
      
      }

     
    };
    onUnmounted(() => {
      localStorage.setItem("showComponent", "مشاريعى");
    });
    onMounted(async () => {
      showComponent.value = localStorage.getItem("showComponent");
      
      token.value = localStorage.getItem("token");
      if(JSON.parse(localStorage.getItem("projectData")) !=  null){
        form.value=JSON.parse(localStorage.getItem("projectData"));
      add_project.firstImage=localStorage.getItem("title_deed");
      add_project.secondImage=localStorage.getItem("owner_id");
      add_project.thirdImage=localStorage.getItem("other_files");   
      }
      console.log("vvvvvvvvvvvvv",add_project.firstImage);
    
      notifications.getAllProjects();
      getApiValues.getCities();
      getApiValues.getElectronicServices();
      getApiValues.setservice_category();
      getApiValues.seteng_offices_class();
    });
    return {
      my_projects,
      set_project,
      my_chat,
      my_account,
      getApiValues,
      show_sidebar,
      notifications,
      redirect,
      showComponent,
      // check_box_validation,
      loading,
      rules,
      v$,
      userId,
      logOut,
      personName,
      name,
      registerd,
      token,
      add_project,
      form,
      handleFileTitle_deed,
      selectedTitle_deedFile,
      handleFileOwner_id,
      selectedOwner_idFile,
      handleFileOtherDocs,
      selectedOtherDocsFile,
      addproject,
    };
  },
};
</script>

<style scoped>
* {
  direction: rtl;
}

.sideCard {
  position: fixed;
  top: 30%;
  right: -170px;
  z-index: 1000;
  background-color: #54847d;
  color: #fff;
  width: 170px;
  height: 380px;
  text-align: center;
  border-radius: 22px 0 0 22px;
  padding-top: 20px;
  transition: 1s;
}
.sideCard.gear {
  position: fixed;
  top: 30%;
  right: 0px;
  background-color: #54847d;
  color: #fff;
  width: 170px;
  height: 380px;
  text-align: center;
  border-radius: 22px 0 0 22px;
  padding-top: 20px;
  transition: 1s;
}
.sideCard:hover {
  filter: brightness(1.3);
}
.sideCard li {
  list-style-type: none;
}
.sideCard .icon {
  cursor: pointer;
  position: absolute;
  left: -30px;
  top: 40%;
  font-size: 35px;
  color: #0c483f;
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
.square {
  transition-property: all;
  transition-duration: 1s;
}
#rotate:checked + .square {
  transform: rotate(180deg);
}

.sidbarLink {
  text-decoration: none;
  color: #ffffffb2;
  font-size: 18px;
  line-height: 33.73px;
}

.sideCard .authName {
  color: #ffffff;
  font-weight: 700;
  font-size: 25px;
  line-height: 46.85px;
}
.main-section {
  width: 80%;
  margin: auto;
}

.main-section p {
  margin-top: 10px;
  font-size: 15px;
  font-weight: 600;
  text-align: center;
  margin-left: 40px;
}

.custom-hr {
  margin-left: 1.25rem;
  border: none;
  height: 5px;
  background-color: #656565;
}

form {
  width: 80%;
  margin: auto;
}

.form-control {
  border: 1.5px solid #656565;
  background: #fff;
}

form .form-control {
  margin-right: 10px;
  border-radius: 10px;
  border: 1.5px solid #656565;
  background: #fff;
}

form p {
  margin-right: 10px;
}

form .form-select {
  margin-right: 10px;
  border-radius: 10px;
  border: 1.5px solid #656565;
  background: #fff;
}

.custom-select {
  text-align: left;
}

/* Style the selected option */
/* Style the selected option */
select#floatingSelect option:checked {
  background-color: #0c483f;
  color: #fff;
}

/* Style the options on hover */
.custom-select:hover option:hover {
  background-color: #0c483f;
  color: #fff;
}

/* Style the dropdown arrow (optional) */
select#floatingSelect {
  background-repeat: no-repeat;
  background-position: right center;
  padding-right: 30px;
  /* Adjust based on your arrow icon width */
}

.projecttitle {
  color: #000;
  text-align: center !important;
  font-size: 35px;
  font-weight: 700;
}

.form-control {
  border: 1.5px solid #656565;
  background: #fff;
}

.form-control.project-details::placeholder {
  color: rgba(84, 132, 125, 0.7);
}

.descriptionfortextarea {
  color: #0c483f;
  text-align: right;
  font-size: 16px;
  font-weight: 400;
}

.form-control::-webkit-selection {
  background-color: #0c483f;
  color: white;
}

/* For Firefox */
.form-control::selection {
  background-color: #0c483f;
  color: white;
}

/* For Internet Explorer */
.form-control::-ms-value {
  background-color: #0c483f;
  color: white;
}

.row {
  margin: 10px 0px;
  min-height: fit-content;
}

.add-project p {
  text-align: right;
}

.add-project {
  transition: 0.5s;
  padding: 10px;
}

.form-check-input {
  background-color: #0c483f;
}

.form-check-input:checked {
  border-color: #0c483f;
  background-color: #0c483f;
}

.project-draft {
  color: #48847b;
  text-align: center !important;
}

/* Style for the file input labels */
.file-label {
  cursor: pointer;
}

/* Style for the uploaded images */
.upload-image {
  width: 100px;
  /* Adjust the width as needed */
  height: 100px;
  /* Adjust the height as needed */
  object-fit: cover;
  padding: 10px;
  border-radius: 13px;
  background-color: #f2f2f2;
  box-shadow: 3px 4px 20px 0px rgba(0, 0, 0, 0.25);
  color: #48847b;
}
@media (max-width: 768px) {
  .container {
    display: block !important;
    min-width: 100% !important;
    max-height: fit-content;
  }
}
@media (max-width: 657px) {
  label {
    font-size: 16px !important;
  }
  .sideCard .icon {
    font-size: 35px !important;
  }
}
@media (max-width: 575px) {
  label {
    font-size: 18px !important;
    margin-top: 10px !important;
  }
}
@media (max-height: 545px) {
  .sideCard.gear,
  .sideCard {
    top: 25% !important;
  }
}
@media (max-height: 500px) {
  .sideCard.gear,
  .sideCard {
    top: 18% !important;
  }
}
/**css of select option */
</style>
