<template>
    <MemberHeader />
    <div class="container-fliud article my-5 me-4" v-motion-fade style="transition: 0.5s;">
        <div class="col-lg-8">
            <p>مرحبًا بك في قدة للمهندسين. يرجى قراءة هذه الشروط والأحكام بعناية قبل استخدام المنصة والتسجيل كمهندس حر. من
                خلالاستخدام المنصة والتسجيل فيها، فإنك توافق على هذه الشروط والأحكام وتلتزم بها بشكل قانوني. إذا كنت غير موافق على هذه الشروط والأحكام، فيُرجى عدم استخدام المنصة.</p>
            <div  v-for="term , index in terms.data" :key="index">
                <p>{{ term.term_title }}</p>
             <p >{{ term.term_details }}</p>
            </div>
              
        </div>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import MemberHeader from "../components/MemberHeader.vue"
import { apis } from "@/stores/termsAndQuestionsApis/apis";
const terms = apis();
onMounted(() => {
    terms.getWithoutAuth('https://test.m-aboelela.online/api/terms');
});
</script>

<style scoped>
* {
    direction: rtl;
}

.container p {
    margin-top: 0;
    padding: 0%;
}

.article {
    font-size: 20px;
    font-weight: 700;
    /* line-height: 37px; */
    letter-spacing: 0em;
}
@media (max-width:992px) {
    .article{
        padding-left: 15px !important;
        font-size: 2.5vw !important;
    }
    
}
</style>