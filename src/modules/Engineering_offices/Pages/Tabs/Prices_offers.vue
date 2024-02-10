<template>
    <div class="mt-5 ">
        <div class="text-center"><PoptoAddOffer :id="$route.params.id" /></div>

    <div class="row justify-content-between  p-3 m-auto my-3 text-center card1 ">
        <p><span>ملاحظة : </span> سيتعين عليك طرح مشروعك من جديد في حال لم يتم التعاقد مع مكتب هندسي
            خلال مدة 10 أيام</p>
    </div>
    <div class="row justify-content-between w-50  m-auto my-3 ">
        <div class="col-lg-5 offers col-md-12 col-sm-12 col-xs-12 text-center">
            <p>عروض الاسعار المستلمة</p>
        </div>
        <div class="col-lg-2 offers col-md-12 col-sm-12 col-xs-12 text-center">
            <p >  
                {{ getProjectData.offers.length }}
                عرض</p>
        </div>
    </div>
    <div class="row justify-content-between  p-3 m-auto my-3 cardd">
        <div class="row" v-for="offer ,index in getProjectData.offers" :key="index">
            <div class="col-lg-3 text-center">
                <p>المكتب الهندسي</p>
                <h5>{{ offer.user.name }}</h5>
                <h6 class="tasnif">تصنيف درجة خامسة</h6>
            </div>
            <div class="col-lg-4 text-center">
                <p>مراحل المشروع المقترحة</p>
                <h5>{{ offer.stages_count }}</h5>
            </div>
            <div class="col-lg-3 text-center">
                <p>مدة المشروع المقترحة </p>
                <h5>{{ offer.duration }}</h5>
            </div>
            <div class="col-lg-2 text-center" v-if="userId==offer.user_id">
                <p>السعر</p>
               <h5 ><sub>SAR</sub>{{ offer.value }}</h5>
                <h6 class="allprice">(المبلغ الإجمالي شامل ضريبة القيمة المضافة)</h6>
            </div>
        </div>
        <!-- <div class="row justify-content-between text-center ">
            <div class="col-lg-4 d-none">
                <button type="button" class="btnn btn mt-3">تعاقد الأن</button>
            </div>
       
        </div> -->
    </div>
 

    

    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import PoptoAddOffer from '../../components/poptoAddOffer.vue';
import { projectFile } from '@/stores/projectFiles';
import { useRoute } from 'vue-router';
const project = ref();
const route = useRoute();
const offers = ref([]);
// const checkUSer=ref(false);
const userId=ref();
const getProjectData = projectFile();
onMounted(() => {
    getProjectData.getOneProject(`https://test.m-aboelela.online/api/office/projects/show/${route.params.id}`);
    setTimeout(() => {
        project.value = JSON.parse(localStorage.getItem('project'));
    offers.value = localStorage.getItem('offers') ? JSON.parse(localStorage.getItem('offers')) : '';       
    }, 200);
    userId.value=localStorage.getItem('id');
   });

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Tajawal&display=swap');

* {
    direction: rtl;
}
.card1 {
    width: 50%;
    border-radius: 10px;
    white-space: wrap;
    border: 1px solid#48847B;
}
p {
    color: #000000B2;
}
.cardd p {
    color: #575757;
    font-weight: 600;
}
span {
    color: #0C483F;
    font-weight: 700;
    font-size: 22px;
}
.offers {
    font-weight: 700;
    font-size: 20px;
    line-height: 46.85px;
}
.offers p{
 color: #B18718;
}

.cardd {
    width: 50%;
    border-radius: 10px;
    border: 1px solid#48847B;
    box-shadow: 0px 4px 4px 0px rgba(0.25, 0.25, 0.25, 0.25);
}
.company {
    color: #48847B;
}
.tasnif {
    font-size: 12px;
    font-weight: 600;
    color: #B18718;
}
.allprice {
    font-size: 10px;
    color: #B18718;
}
.btnn {
    color: #fff;
    background-color: #4A4E53;
    border: #4A4E53;
    border-radius: 8px;
    padding: 2px, 13px, 2px, 13px;
    height: 37px;
    

}

.btnnn {
    color: #fff;
    background-color: #0F9678;
    border: #0F9678;
    border-radius: 8px;
    padding: 2px, 13px, 2px, 13px;
    height: 37px;
}

@media (max-width:700px) {
  .card1{
    width: 80%;
  }  
    
}
@media (max-width: 400px) {
    .card1{
        width: 90%;
    }
    
}

@media(max-width: 576px){
        
    .cardd{
        width: 80%;
    }
}
</style>