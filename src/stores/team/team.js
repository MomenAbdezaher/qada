import axios from 'axios';
import {
    defineStore
} from 'pinia';
import {
    project_api
} from '../api';
export const team = defineStore('my_team', {
    state: () => ({
        team_data: [],
        loading: false,
        register: null,
        userProjects: [],
        customLoading: null,
        api: project_api
    }),
    actions: {
        async get_users_team(api) {
            let token = localStorage.getItem('token');
            this.loading = true
            await axios.post(api, {

            }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "Accept": "*/*",
                    "Content-Length": '',
                    "Accept-Encoding": 'gzip, deflate, br',
                    "Connection": 'keep-alive',
                    "Host": '',
                    'Authorization': 'Bearer ' + token
                }
            }).then((res) => {
                if (res.status == 200) {
                    this.loading = false;
                    this.team_data = res.data.data
                }
            }).catch((rej) => {
                if (rej) {
                    this.loading = false;
                    console.log(rej);
                }
            })
        },
        async getUserProjects(api, index) {
            this.customLoading = index;
            await axios.get(api, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then((res) => {
                if (res.status == 200) {
                    this.customLoading = -1;
                    this.userProjects = res.data.data.projects
                }
            }).catch((rej) => {
                if (rej) {
                    this.customLoading = -1;
                    console.log(rej);
                }
            })
        },
        async activate_user_account(user, api, index) {
            this.customLoading = index;
            await axios.post(`${this.api}admin/users/activate`, {
                user_id: user.id
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
                    this.get_users_team(api)
                    this.customLoading = -1;
                    this.register = index;
                    this.register = 'تم تفعيل المستخدم'
                    setTimeout(() => {
                        this.register = ''
                    }, 3000);
                }
            }).catch((rej) => {
                this.register = index;
                this.register = 'فشل اجراء العملية';
                setTimeout(() => {
                    this.register = ''
                }, 3000);

                console.log(rej);
            })
        }
    }
})