<template>
    <BusinessHeader />
    <div class="container" v-motion-slide-top style="transition: 0.5s;">
        <div class="row justify-content-center" v-for="question , index in faqData.data" :key="index">
            <div class="col-10 what">
                <p>{{ question.question }}</p>
                <p class="collapse" :id="`collapseExample${index}`" style="font-weight: 500;">{{ question.answer }}</p>
            </div>
            <div class="col-2">
                <a data-toggle="collapse" :href="`#collapseExample${index}`" role="button" aria-expanded="false" aria-controls="collapseExample">
                    <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M28.4942 18.0171C28.9185 17.6635 28.9758 17.033 28.6222 16.6087C28.2687 16.1844 27.6381 16.1271 27.2138 16.4807L28.4942 18.0171ZM19.899 23.878L19.2588 24.6463C19.6297 24.9553 20.1683 24.9553 20.5392 24.6463L19.899 23.878ZM12.5842 16.4807C12.1599 16.1271 11.5293 16.1844 11.1758 16.6087C10.8222 17.033 10.8795 17.6635 11.3038 18.0171L12.5842 16.4807ZM27.2138 16.4807L19.2588 23.1098L20.5392 24.6463L28.4942 18.0171L27.2138 16.4807ZM20.5392 23.1098L12.5842 16.4807L11.3038 18.0171L19.2588 24.6463L20.5392 23.1098ZM36.5 19.5C36.5 28.8888 28.8888 36.5 19.5 36.5V38.5C29.9934 38.5 38.5 29.9934 38.5 19.5H36.5ZM19.5 36.5C10.1112 36.5 2.5 28.8888 2.5 19.5H0.5C0.5 29.9934 9.00659 38.5 19.5 38.5V36.5ZM2.5 19.5C2.5 10.1112 10.1112 2.5 19.5 2.5V0.5C9.00659 0.5 0.5 9.00659 0.5 19.5H2.5ZM19.5 2.5C28.8888 2.5 36.5 10.1112 36.5 19.5H38.5C38.5 9.00659 29.9934 0.5 19.5 0.5V2.5Z" fill="black"/>
                </svg>
                </a>
            </div>
        </div>
        
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import BusinessHeader from "./BusinessHeader.vue"
import { apis } from "@/stores/termsAndQuestionsApis/apis";
const faqData = apis();
   onMounted(() => {
   faqData.getWithoutAuth('https://test.m-aboelela.online/api/questions');
   });
</script>

<style scoped>
* {
    direction: rtl;
}

.container {
    margin-bottom: 5rem;
    margin-top: 5rem;
    min-height: 51vh;


}

.container p {
    margin-bottom: 1rem;
    font-size: 1rem;
    font-weight: 600;
}
.what{
    width: 50%;
}
.what p{
    font-size: 25px;
}
@media (max-width:992px) {
    .what{
        width: 50%;
    }
    
}
@media (max-width:768px) {

    .what{
        width: 70%;
    }
}
@media (max-width:450px) {
    .what{
        width: 80%;
    }
    
}
@media (max-width:300px) {
    .what{
        width: 82%;
    }
    
}
</style>