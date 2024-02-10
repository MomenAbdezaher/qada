<!-- eslint-disable no-undef -->
<template>
  <div class="container">
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-success fs-5"
      @click="showModal"
      style="width: 200px"
    >
      اضافة عرض
    </button>

    <!-- Modal -->
    <div
      class="modal fade w-100 text-center"
      id="demoModal"
      tabindex="-1"
      aria-labelledby="demoModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div
          class="modal-content rounded-5 d-inline-block w-100"
          style="background-color: #1a6177"
        >
          <div class="modal-body d-flex flex-column align-items-center">
            <div class="modal-text my-3">
              <p class="text-center">ادخل البيانات المطلوبة من فضلك</p>

              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">المرحلة</th>
                    <th scope="col">البند</th>
                    <th scope="col">النسبة</th>
                    <th scope="col">عدد الايام</th>
                    <th scope="col">السعر</th>
                    <th scope="col">الخيارات</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    scope="row"
                    v-for="(stage, index) in offerArr"
                    :key="index"
                  >
                    <th
                      class="d-flex gap-1 align-items-center justify-content-center"
                    >
                      <span :class="`fs-6 mt-2 stage${index}`">{{
                        index + 1
                      }}</span>
                      <!-- <svg @click="addOfferStage()" style="cursor: pointer;" class="mb-1 mt-2" xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 448 512">! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc.<path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM200 344V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H248v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg> -->
                      <!-- <svg tyle="cursor: pointer;" xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minus mb-1 mt-2"><line x1="5" y1="12" x2="19" y2="12"></line></svg> -->
                    </th>
                    <td>
                      <input
                        v-model="stage.title"
                        type="text"
                        :class="`form-control w-100 title${index}`"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                      />
                    </td>
                    <td>
                      <input
                        v-model="stage.percent"
                        readonly
                        type="number"
                        :class="`form-control w-100 percent${index}`"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                      />
                    </td>
                    <td>
                      <input
                        v-model="stage.duration"
                        min="1"
                        type="number"
                        :class="`form-control w-100 duration${index}`"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                      />
                    </td>
                    <td>
                      <input
                        v-model="stage.price"
                        min="1"
                        @keyup="calcPercent(index)"
                        type="number"
                        :class="`form-control w-100 price${index}`"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                      />
                    </td>
                    <td>
                      <span
                        @click="removeOfferStage(index)"
                        v-if="offerArr.length > 1"
                        class="d-flex gap-1 align-items-center gap-1 btn-sm btn btn-outline-danger"
                      >
                        <span>حدف</span>
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-trash-2"
                          >
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path
                              d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                            ></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                          </svg>
                        </span>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">الاجمالى</td>
                    <td>{{ 100 }} %</td>
                    <td>
                      {{ allDays }}
                    </td>
                    <td>
                      {{ allprice ? allprice : 0 }}
                    </td>
                    <td>
                      <span
                        @click="addOfferStage()"
                        class="d-flex gap-1 align-items-center gap-1 btn-sm btn btn-outline-success"
                      >
                        <span>إضافة</span>
                        <span
                          ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-plus"
                          >
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line></svg
                        ></span>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>

              <p>
                <span class="">تنويه</span> : عرض السعر المرسل يشمل ضريبة القيمة
                المضافة 15%. سيتم حساب عمولة المنصة 7% بشكل آلي من قيمة العقد
                كاملًا
              </p>
              <p>
                بالإضافة إلي ضريبة القيمة المضافة 15%. يتم حساب عمولة 7% في كل
                مرحلة من مراحل المشروع.
              </p>
              <div class="row d-flex btn-offers">
                <!-- <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 text-center add-offer"><button class="text-white rounded-4 btn-offer">اضافة العرض السعرى</button></div> -->
                <div
                  class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 text-center add-offer"
                >
                  <button
                    class="text-white rounded-4 btn-offer"
                    @click="sendOffer"
                  >
                    <span v-if="loading == false" class="fs-6">إرسال</span>
                    <SwappingSquaresSpinner
                      v-if="loading == true"
                      :animation-duration="1000"
                      :size="40"
                      color="#ff1d5e"
                    />
                  </button>
                </div>
                <div class="text-center">
                  <span class="fs-6 text-white">{{ validation }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { SwappingSquaresSpinner } from "epic-spinners";
import { ref, onMounted, defineProps, computed } from "vue";
const props = defineProps(["id"]);
const projectId = ref(props.id);
const offerArr = ref([
  {
    title: "",
    percent: "",
    duration: "",
    price: "",
  },
]);
const numberOfStage = ref(null);

const addOfferStage = () => {
  offerArr.value = [
    ...offerArr.value,
    {
      title: null,
      percent: 0,
      duration: 0,
      price: 0,
    },
  ];
};
const removeOfferStage = (index) => {
  offerArr.value.splice(index, 1);
};
const validation = ref();
const loading = ref(false);
const project = ref({});

const getOffer = async () => {
  await axios
    .get(`https://test.m-aboelela.online/api/project/${projectId.value}`)
    .then((res) => {
      if (res.status == 200) {
        project.value = res.data;
      }
    })
    .catch((rej) => console.log(rej));
};

const calcPercent = (index) => {
  if (numberOfStage.value.contract == null) {
    offerArr.value[index].percent = (
      (offerArr.value[index].price / 1) *
      100
    ).toFixed(1);
  } else {
    
    let sumOffer = 0;
     offerArr.value.forEach((value) => {
      sumOffer += parseInt(value.price) ;
    })
    offerArr.value[index].percent = ((offerArr.value[index].price / sumOffer ) *100).toFixed(1);
    
  }
};

const sendOffer = async () => {
  if (allpercentage.value > 100) {
    validation.value = "يجب ان لا تتجاوز النسبة 100";
  } else {
    loading.value = true;
    await axios
      .post(
        "https://test.m-aboelela.online/api/office/offers/placeOffer",
        {
          project_id: projectId.value,
          offer: offerArr.value,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "*/*",
            "Content-Length": "",
            "Accept-Encoding": "gzip, deflate, br",
            Connection: "keep-alive",
            Host: "",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        if (res.status == 200) {
          loading.value = false;
          validation.value = "تم ارسال الطلب ";
          getOffer();
          setTimeout(() => {
            // this.registerd = ''
          }, 3000);
        }
      })
      .catch((err) => {
        if (err) {
          loading.value = false;
          validation.value = err.response.data.msg;
          console.log(err);
          // this.registerd = 'فشل الارسال الرجاء التأكد من البيانات'
          setTimeout(() => {
            // this.registerd = ''
          }, 3000);
        }
      });
  }
};

const modal = ref(null);
onMounted(() => {
  getOffer();
  numberOfStage.value = JSON.parse(localStorage.getItem("project"));
  // console.log("stages",numberOfStage.value.contract.contract_stages)
  // eslint-disable-next-line no-undef
  modal.value = new bootstrap.Modal(document.getElementById("demoModal"));
});

const showModal = () => {
  modal.value.show();
  /*setTimeout(() => {
      modal.value.hide();
    }, 10000); 
  */
};

const allpercentage = ref();

const allDays = computed(() => {
  return offerArr.value.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.duration;
  }, 0);
});

const allprice = computed(() => {
  return offerArr.value.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.price;
  }, 0);
});

// watch(offerArr,() => {
//   console.log('changed')
//   offerArr.value = offerArr.value.map((offer) => {
//     offer.percent = ((offer.price / allprice.value ) * 100).toFixed(2)
//     return offer;
//   })
// },{ deep: true })
</script>

<style scoped>
.blur-background {
  filter: blur(5px);
  /* You can adjust the blur intensity as needed */
}

.modal-text {
  color: #fff;
  text-align: center;
  font-family: Cairo;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.btn-offers button {
  border-radius: 8px;
  background: #008955;
}
.btn-offer {
  padding: 10px 15px 10px 15px;
}
.btn-offer:hover {
  background-color: rgb(16, 137, 26);
}
@media (max-width: 767px) {
  .add-offer {
    position: relative;
    top: 5px !important;
  }
}
</style>
