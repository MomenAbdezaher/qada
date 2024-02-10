<template>
    <div>
    <MemberHeader/>
    <div class="row m-auto justify-content-between p-3 filter-projects my-5" v-motion-pop style="transition: 0.5s;">
        <div class="col-lg-6">
            <p>المدينة</p>
            <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="الرياض" disabled aria-label="Amount (to the nearest dollar)">
           </div>
            <!--
<select class="form-select" aria-label="Default select example">
                <option selected>الكل</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </select>
            -->
            
        </div>
        <div class="col-lg-6">
            <p>التصنيف</p>
            <select v-model="sort.class" @change="sort.sort_rank()" class="form-select" aria-label="Default select example">
                <option selected>الكل</option>
               <option v-for="rank , index in Array.from(new Set(sort.sortNums))" :key="index">{{ rank }}</option>
            </select>
        </div>
        <!--
 <div class="col-lg-2 my-auto mb-2 ms-3">
            <img src="../../../assets/magnifier.png" />
        </div>
        -->
       
    </div>

    <div class="row justify-content-between p-3 m-auto my-3 cardd" v-for="office , index in sort.allPartenrs" :key="index" v-motion-slide-right style="transition: 0.5s;">
        <div class="col-lg-3 col-sm-12 text-center">
            <p>المكتب الهندسي</p>
            <h5>{{ office.name }}</h5>
        </div>
        <div class="col-lg-3 text-center">
            <p>المدينة</p>
            <h5>{{ office.city }}</h5>
        </div>
        <div class="col-lg-3 text-center">
            <p>التصنيف</p>
            <h5 class="number">{{ office.class }}</h5>
        </div>
    </div>
    </div>
</template>

<script>

import { onMounted, ref } from "vue";
import MemberHeader from "../components/MemberHeader.vue";
import { sortOffice } from "@/stores/sortoffice/sortoffice";
import { project_api } from "@/stores/api";
//import  globalservice from "../../../services/globalservice"
export default {
  components: {
    MemberHeader,
  },
  setup() {
    const sort = sortOffice();
    const api = ref(project_api)  


    onMounted(async() => {
      //  getAllPartners();
     await sort.getOffices(`${api.value}user/offices/index`)
     //sort.allData = sort.allPartenrs;
     //sort.collect_sort_num();
      sort.sort_rank();
     
    });

    return {
        api,
        sort
      
    };
  },
};

</script>

<style scoped>
* {
    direction: rtl;
}

.filter-projects {
    border-radius: 10px;
    background: #eefffb;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    width: 40%;
}

.cardd {
    width: 50%;
    border-radius: 10px;
    border: 1px solid#48847B;
    box-shadow: 0px 4px 4px 0px rgba(0.25, 0.25, 0.25, 0.25);
}

.cardd p {
    color: #575757;
}

.cardd h5 {
    font-weight: 700;
}

.number {
    color: #B18718;
}
@media (max-width:650px) {
    .filter-projects{
    width: 60%;
    }
    .cardd{
        width: 75%;
    }
    
}
</style>