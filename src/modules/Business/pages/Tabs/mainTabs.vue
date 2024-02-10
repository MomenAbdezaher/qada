<template>
  <div>
    <BusinessHeader />
    <div class=" mt-5">
      <ul class="nav " id="myTab" role="tablist" style="position: sticky; top: 0;background-color: #fff;z-index: 999;">
        <li class="nav-item" role="presentation" @click="activeTab = '1'">
          <a class="nav-link" :class="{ 'active': activeTab === '1' }" role="tab"
            aria-controls="header-i" aria-selected="true">
            تفاصيل المشروع
          </a>
        </li>
        <li class="nav-item" role="presentation" @click="activeTab = '2', scrollToDown()">
          <a class="nav-link" :class="{ 'active': activeTab === '2' }"  role="tab"
            aria-controls="header-ii" aria-selected="false">
            الإستفسارات
          </a>
        </li>
        <li class="nav-item" role="presentation" @click="activeTab = '3'">
          <a class="nav-link" :class="{ 'active': activeTab === '3' }" role="tab"
            aria-controls="header-iii" aria-selected="false">
            ملفات المشروع
          </a>
        </li>
        <li class="nav-item" role="presentation" @click="activeTab = '4'" v-if="userId && userId == sendFile.projectId">
          <a class="nav-link" :class="{ 'active': activeTab === '4' }"  role="tab"
            aria-controls="header-iv" aria-selected="false">
            عروض الاسعار
          </a>
        </li>
        <li class="nav-item" role="presentation" @click="activeTab = '5'" v-if="userId && userId == sendFile.projectId">
          <a class="nav-link" :class="{ 'active': activeTab === '5' }"  role="tab"
            aria-controls="header-v" aria-selected="false">
            تعاقد إلكتروني
          </a>
        </li>
        <li class="nav-item" role="presentation" @click="activeTab = '6', scrollToDownforStages()"
          v-if="userId && userId == sendFile.projectId">
          <a class="nav-link" :class="{ 'active': activeTab === '6' }"  role="tab"
            aria-controls="header-vi" aria-selected="false">
            مراحل المشروع
          </a>
        </li>
        <li class="nav-item" role="presentation" @click="activeTab = '7'">
          <a class="nav-link" :class="{ 'active': activeTab === '7' }"  role="tab"
            aria-controls="header-vii" aria-selected="false">
            سجل حركات المشروع
          </a>
        </li>
      </ul>

      <!-- Content panes for each tab -->
      <div class="tab-content mt-2" id="myTabContent">
        <!-- Content for tab 1 goes here -->
        <div class="tab-pane fade" :class="{ 'show active': activeTab === '1' }" id="header-i" role="tabpanel"
          aria-labelledby="header-i-tab">
          <ProjectDetails></ProjectDetails>
        </div>
        <!-- Content for tab 2 goes here -->
        <div class="tab-pane fade" :class="{ 'show active': activeTab === '2' }" id="header-ii" role="tabpanel"
          aria-labelledby="header-ii-tab">
          <ProjectQuereries></ProjectQuereries>
        </div>
        <!-- Content for tab 3 goes here -->
        <div class="tab-pane fade" :class="{ 'show active': activeTab === '3' }" id="header-iii" role="tabpanel"
          aria-labelledby="header-iii-tab">
          <projectsFile></projectsFile>
        </div>
        <!-- Content for tab 4 goes here -->
        <div class="tab-pane fade" :class="{ 'show active': activeTab === '4' }" id="header-iv" role="tabpanel"
          aria-labelledby="header-iv-tab">
          <Prices_offers></Prices_offers>
        </div>
        <!-- Content for tab 5 goes here -->
        <div class="tab-pane fade" :class="{ 'show active': activeTab === '5' }" id="header-v" role="tabpanel"
          aria-labelledby="header-v-tab">
          <ElectronicContract></ElectronicContract>
        </div>
        <!-- Content for tab 6 goes here -->
        <div class="tab-pane fade" :class="{ 'show active': activeTab === '6' }" id="header-vi" role="tabpanel"
          aria-labelledby="header-vi-tab">
          <ProjectPhases></ProjectPhases>
        </div>
        <!-- Content for tab 7 goes here -->
        <div class="tab-pane fade" :class="{ 'show active': activeTab === '7' }" id="header-vii" role="tabpanel"
          aria-labelledby="header-vii-tab">
          <project-transactions></project-transactions>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import BusinessHeader from '../../components/BusinessHeader.vue';
import ProjectDetails from './projectDetails'
import ProjectPhases from './projectPhases'
import ElectronicContract from "./ElectronicContract.vue";
import ProjectQuereries from './projectQuereries.vue';
import projectTransactions from './projectTransactions.vue';
import projectsFile from './projectsFile.vue';
import Prices_offers from './Prices_offers.vue';
import { onUnmounted, ref,onMounted } from "vue";
import { projectFile } from '@/stores/projectFiles';
export default {
  components: {
    ProjectDetails,
    Prices_offers,
    ProjectPhases,
    ElectronicContract,
    projectsFile,
    projectTransactions,
    ProjectQuereries,
    BusinessHeader,
  },
  setup() {
    // const scrollToDown = () => {
    //   setTimeout(() => {
    //     document.getElementById('scrollDiv').scroll({ top: 1000000000000000000000000000000000, behavior: 'smooth' });
    //   }, 1010);
    // }
    // const scrollToDownforStages = () => {
    //   setTimeout(() => {
    //     document.getElementById('scrollDiv2').scroll({ top: 1000000000000000000000000000000000, behavior: 'smooth' });
    //   }, 1010);
    // };
    const userId = ref(localStorage.getItem('id') ? localStorage.getItem('id') : '');
    const activeTab = ref("1");
    const sendFile = projectFile();
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    onUnmounted(() => {
      localStorage.removeItem('offers');
      localStorage.removeItem('project');
      localStorage.removeItem('stages');
      localStorage.removeItem('p-comments');
      sendFile.projectId = null;
    });
    onMounted(() => {
    scrollToTop();
  });
    const changeTab = (tabNumber) => {
      activeTab.value = tabNumber;
    };
    return {
      activeTab,
      changeTab,
      // scrollToDownforStages,
      userId,
      sendFile,
      // scrollToDown,
      scrollToTop


    };
  },
};
</script>

<style scoped>
* {
  direction: rtl;
}

.nav-link {
  color: rgba(85, 85, 85, 0.90);
  font-family: Cairo;
  font-size: 25px;
  font-weight: 600;
  font-style: normal;
  line-height: normal;
}

.nav-link:hover {
  color: rgba(85, 85, 85, 0.90);

}

.nav-link.active {
  color: #0F9678;
  border-bottom: 5px solid #0F9678;
}

@media (max-width:421px) {
  ul {
    position: relative !important;
  }

  ul li a {
    line-height: 17px !important;
    font-size: 4vw !important;
  }

}

@media (max-width:409px) {
  ul {
    display: grid !important;
    grid-template-columns: auto !important;
  }

  .nav-link.active {
    display: inline-block !important;
    width: fit-content !important;
  }
}
</style>
