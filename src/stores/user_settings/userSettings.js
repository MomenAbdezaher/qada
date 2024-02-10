import axios from "axios";
import {
    defineStore
} from "pinia";
export const userSettings = defineStore('settings', {
    state: () => ({
        roles: [],
        email: '',
        password: '',
        theName: '',
        phone: '',
        role: 'اختر صلاحية المستخدم',
        registerd: null,
        loading: false
    }),
    actions: {
        async registerUser() {
            this.loading = true,
                await axios.post('https://test.m-aboelela.online/api/admin/users/create', {
                    email: this.email,
                    password: this.password,
                    phone: this.phone,
                    role: this.role,
                    name: this.theName,
                }, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        "Accept": "*/*",
                        "Content-Length": '',
                        "Accept-Encoding": 'gzip, deflate, br',
                        "Connection": 'keep-alive',
                        "Host": '',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then((res) => {
                    if (res.status == 200) {
                        this.loading = false;
                        this.registerd = 'تم تسجيل الحساب'
                        this.theName = ''
                        this.password = ''
                        this.role = 'اختر صلاحية المستخدم'
                        this.email = '';
                        this.phone = '';
                        setTimeout(() => {
                            this.registerd = '';
                        }, 3000);
                    }
                }).catch((rej) => {
                    if (rej) {
                        this.loading = false;
                        this.registerd = 'فشل تسجيل الحساب'
                        setTimeout(() => {
                            this.registerd = '';
                        }, 3000);
                    }
                })
        },
        /********************************************************************************** */
        async getRoles() {
            await axios.get('https://test.m-aboelela.online/api/admin/users/roles', {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then((res) => {
                if (res.status == 200) {
                    this.roles = res.data;
                }
            }).catch((rej) => console.log(rej))
        },
        testUser(e) {
            console.log(e.target.value);
        }

    }
})