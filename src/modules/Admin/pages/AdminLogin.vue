<template>
    <div>
        <Main_Header />
        <div class="container m-auto my-5">
            <div class="header">
                <p>تسجيل دخول الادمن</p>
            </div>
            <form @submit.prevent="login()" class="w-50 m-auto mt-5">
                <div class="mb-2">
                    <i class="fa-solid fa-lock mx-2"></i>
                    <label class="text_color" for="name">اسم المستخدم</label>
                </div>
                <input type="text" class="form-control" v-model="form.email" />
                <div class="mb-2">
                    <i class="fa-solid fa-lock mx-2"></i>
                    <label class="my-3 text_color" for="password mx-2">كلمة السر</label>
                </div>
                <input type="password" class="form-control" v-model="form.password" />
                <div class="text-center">
                    <button type="submit" class="btn mt-4">
                        <span v-if="loading == false" class="fs-5 text-white">دخول</span>
                        <!-- <atom-spinner v-if="loading == true" :animation-duration="1000" :size="40" color="#ff1d5e" /> -->
                        <div class="loading w-100 " v-if="loading == true">
                             <img :src="require('@/assets/DoubleRing.gif')" style="width: 60px;height: 60px;">
                        </div>
                    </button>
                </div>
                <div class="text-center mt-3"><span class="fs-5 fw-bold text-danger">{{ registerd }}</span></div>
            </form>
        </div>
    </div>
</template>
<script>

import { ref } from "vue";
import Main_Header from "../../../components/Main_Header.vue"
import adminService from "../services/adminService";
import router from "@/router";

export default {
    components: {
        Main_Header,
    },
    setup() {
        const form = ref({
            email: "",
            password: "",
        });
        const registerd = ref('');
        const loading = ref(false);
        const loginSuccess = ref(false);
        const login = () => {
            loading.value = true
            adminService
                .login(form.value)
                .then((response) => {
                    if (response.status == 200) {
                        loading.value = false;
                    }
                    loginSuccess.value = true;
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("name", response.data.data.name);
                    localStorage.setItem('email', form.value.email);
                    localStorage.setItem('type', 'admin')
                    router.push("/admin/homepage");
                })
                .catch((error) => {
                    if (error) {
                        loading.value = false;
                        registerd.value = 'فشل تسجيل الدخول'
                        setTimeout(() => {
                            registerd.value = ''
                        }, 3000);
                    }

                    console.error(error);
                });
        };
        return {
            form,
            loginSuccess,
            login,
            registerd,
            loading
        };
    },
};
</script>

<style scoped>
* {
    direction: rtl;
}

.container {
    min-height: 55vh;
}

.header {
    text-align: center;
    justify-content: center;
    align-items: center;
    font-size: 3rem;
    font-weight: 700px;
}

p {
    color: #59467C;
    font-weight: 700;
    font-size: 3rem;
}

.text_color {
    color: #59467C;
}

form span {
    color: #000000;
    font-size: 2rem;
    margin: 0;
    padding: 0;
}

input {
    height: 55px;
    border-radius: 20px;
    text-align: center;
    background-color: #eaeaea;
}

.fa-solid {
    color: #59467C;
    font-size: 25px;
}

.btn {
    padding: 15px 70px 15px 70px;
    color: #ffffff;
    border-radius: 20px;
    background-color: #59467C;
}

.link {
    text-decoration: none;
    color: #6a6868;
}

hr {
    border: 1px solid rgba(53, 53, 53, 0.7);
}

@media (max-width:600px) {
    form {
        width: 100% !important;
    }

}

@media (max-width:500px) {

    .header p {
        font-size: 2.5rem !important;
    }
}

@media (max-width:430px) {
    .header p {
        font-size: 10vw !important;
    }
}</style>
