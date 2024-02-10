import axios from 'axios';
import {
    defineStore
} from 'pinia';

export const getAllusers = defineStore('all_users', {
    state: () => ({
        allUsers: [],
        users_projects: []
    }),
    actions: {
        async get_All_users() {
            // get business
            await axios.post(`https://test.m-aboelela.online/api/admin/users/index?type=business`, {

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
                    this.allUsers.push(...res.data.data);
                }
            }).catch((rej) => {
                console.log(rej.message);
            })
            // get users
            await axios.post(`https://test.m-aboelela.online/api/admin/users/index?type=user`, {

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
                    this.allUsers.push(...res.data.data);
                }
            }).catch((rej) => {
                console.log(rej.message);
            })
            // get admins
            await axios.post(`https://test.m-aboelela.online/api/admin/users/index?type=office`, {

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
                    this.allUsers.push(...res.data.data);
                }
            }).catch((rej) => {
                console.log(rej.message);
            })

        },
        async get_users_projects() {
            for (let i = 0; i < this.allUsers.length; i++) {
                axios.get(`https://test.m-aboelela.online/api/admin/users/show/${this.allUsers[i].id}`, {
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
                        let name = this.allUsers[i].name;
                        for (let i = 0; i < res.data.data.projects.length; i++) {
                            let obj = Object.assign({
                                name: name
                            }, {
                                project: res.data.data.projects[i]
                            });
                            this.users_projects.push(obj);
                        }
                    }
                }).catch((rej) => console.log(rej.message))
            }
        }
    }
})