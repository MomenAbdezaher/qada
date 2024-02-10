<template>
  <div>
    <AdminHeader />
    <div class="contacts" style="z-index: 999;position: relative;">
      <div class="row justify-content-between">
        <div class="col-lg-3 sideCard">
          <ul>
            <li class="text-light">مرحبا</li>
            <li class="authName">عبدالعزيز</li>
            <li class="mt-4"><router-link class="sidbarLink" to="homepage">الرئيسية</router-link></li>
            <li class="mt-4"><router-link class="sidbarLink" to="usersStats">الاحصائيات</router-link></li>
            <li class="mt-4"><router-link class="sidbarLink" to="useraccount">الفريق</router-link></li>
            <li class="mt-4"><router-link class="sidbarLink" to="addedProjects">المشاريع</router-link></li>
            <li class="mt-4"><router-link class="sidbarLink" :to="{ name: 'reciveContacts' }">التواصل</router-link></li>
            <li class="mt-4"><router-link class="sidbarLink" to="">تسجيل خروج</router-link></li>
          </ul>
        </div>
        <div class="contact-col col-xl-10 col-lg-10 py-5 text-center d-block">
          <div class="mt-4">
            <div class="row">
              <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 text-center " v-for="contact, index in allContacts"
                :key="contact">
                <div class="card" style="width: 18rem;display: inline-block;">
                  <img
                    src="https://www.pngitem.com/pimgs/m/399-3999161_contact-information-phone-call-icon-png-transparent-png.png"
                    class="card-img-top" alt="...">
                  <div class="card-body">
                    <h5 class="card-title">{{ contact.name }}</h5>
                    <h6 class="card-subtitle mb-2">{{ contact.email }}</h6>
                    <p class="card-text">{{ contact.message }}.</p>
                    <div @click="solveContact(contact, index)" class="btn text-center"><i v-if="loading != index"
                        class="fas fa-link"></i><span v-if="loading != index">{{ contact.solved == 0 ? "تحديد كمقروؤ" :
                          'تم القراءة' }}</span>
                      <div v-if="loading == index">
                        <span class="d-inline-block"><flower-spinner :animation-duration="2500" :size="50"
                            color="#ff1d5e" />
                        </span>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { FlowerSpinner } from 'epic-spinners'
import { onMounted, onUnmounted, ref } from 'vue';
import { usebackgroundStore } from "../../../stores/background"
import AdminHeader from "./AdminHeader.vue"
import router from '@/router';
import axios from 'axios';
//import globalService from '../../../services/globalservice';
export default {
  components: {
    AdminHeader,
    FlowerSpinner
  },
  setup() {
    const logOut = () => {
      if (localStorage.getItem('notifications') || localStorage.getItem('office_notifications')) {
        localStorage.removeItem('email');
        localStorage.removeItem('name');
        localStorage.removeItem('type');
        localStorage.removeItem('token');
        localStorage.removeItem('phone');
        localStorage.removeItem('id');

        router.push('/loginPanal')

      } else {
        localStorage.clear();
        router.push('/loginPanal')
      }
    }
    const allContacts = ref([])
    const backgroundStore = usebackgroundStore()
    const getAllContacts = async () => {
      await axios.get('https://test.m-aboelela.online/api/admin/contact/index', {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then((res) => {
        if (res.status == 200) {
          allContacts.value = res.data.data;
        }
      }).catch((rej) => {
        if (rej) {
          console.log(rej);
        }
      })
    }
    const loading = ref(null);
    const solveContact = async (contact, index) => {
      loading.value = index;
      await axios.post(`https://test.m-aboelela.online/api/admin/contact/solved`, {
        contact_id: contact.id
      }, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then((res) => {
        getAllContacts()
        loading.value = -1;
        if (res.status == 200) {
          console.log(res.data);
        }
      }).catch((rej) => {
        if (rej) {
          loading.value = -1;
        }
      })
    }
    onMounted(() => {
      backgroundStore.setBgColor(1);
      getAllContacts();

    })
    onUnmounted(() => {
      backgroundStore.setBgColor(0)
    })

    return {
      getAllContacts,
      solveContact,
      loading,
      logOut,
      backgroundStore,
      allContacts

    };
  }
}

</script>

<style scoped>
* {
  direction: rtl;
}

.contacts {
  max-width: 100%;
  overflow-x: hidden;
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

table {
  text-align: center;
  width: 100%;
  padding: 0 5px 5px 5px;
}

table td {
  border: solid 1px #fff;
}

:root {
  --gradient: linear-gradient(to left top, #DD2476 10%, #FF512F 90%) !important;
}

body {
  background: #111 !important;
}

.card {
  background: #222;
  border: 1px solid #dd2476;
  color: rgba(250, 250, 250, 0.8);
  margin-bottom: 2rem;
}

.btn {
  border: 5px solid;
  transition: all .4s ease;
  background: var(--gradient) !important;
  -webkit-background-clip: none !important;
  -webkit-text-fill-color: #fff !important;
  box-shadow: #222 1px 0 10px;
}

.col-cards {}

@media (max-width:1150px) {
  .contact-col {
    padding-left: 50px;
  }

}

@media (max-width:1085px) {
  .card {
    width: 15rem !important;
  }

}

@media screen {}

@media (max-width:992px) {
  .contact-col {
    padding-left: 0px;
  }

}

@media (max-width:855px) {
  .contact-col {
    padding-left: 10px;
  }

}</style>
