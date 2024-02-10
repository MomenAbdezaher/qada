<template>
    <div>
        <div class="row">
            <div class="col-lg-12 ">
                <div class="row g-0 ">
                    <div class="col-lg-12">
                        <div v-for="statisc , index in OfficeStatistics.office_statistics_" class="row justify-content-between w-75 p-3 m-auto my-3 cardd" :key="index">
                            <div class="col-lg-3 col-sm-12 text-center">
                                <p>المكتب الهندسي</p>
                                <h5>{{ statisc.name }} </h5>
                            </div>
                            <div class="col-lg-3 text-center">
                                <p>المدينة</p>
                                <h5>{{ statisc.city }}</h5>
                            </div>
                            <div class="col-lg-3 text-center">
                                <p>التصنيف</p>
                                <h5 class="number">{{ statisc.class }}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { statistics } from '@/stores/statistics/statistics';
import { onMounted } from 'vue';
const OfficeStatistics = statistics();
onMounted(() => {
    OfficeStatistics.office_getStatistics();
});
</script>
<style scoped>
* {
    direction: rtl;
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

.tabs {
    list-style-type: none;
}

.tabs .tab {
    text-decoration: none;
    color: #FFFFFFB2;
    font-size: 25px;
    font-weight: 600;
    line-height: 46.85px;
}

.filter-projects {
    border-radius: 10px;
    background: #eefffb;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

.cardd {
    background: #ffffff;
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
</style>