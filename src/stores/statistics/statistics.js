import axios from 'axios'
import {
    defineStore
} from 'pinia'
export const statistics = defineStore('statistics', {
    state: () => ({
        user_statistics_: [],
        business_statistics_: [],
        office_statistics_: [],
        dashboard_statistics_:[],
        loading: false
    }),
    actions: {
        async user_getStatistics() {
            this.loading = true;
            await axios.get('https://test.m-aboelela.online/api/admin/statistics?type=user', {
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
                    this.loading = false
                    this.user_statistics_ = res.data;
                }
            }).catch((rej) => {
                if (rej) {
                    this.loading = false;
                    console.log(rej);
                }
            })
        },
        async business_getStatistics() {
            this.loading = true;
            await axios.get('https://test.m-aboelela.online/api/admin/statistics?type=business', {
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
                    this.loading = false
                    this.business_statistics_ = res.data
                }
            }).catch((rej) => {
                if (rej) {
                    this.loading = false;
                    console.log(rej);
                }
            })
        },
        async office_getStatistics() {
            this.loading = true;
            axios.get('https://test.m-aboelela.online/api/admin/statistics?type=office', {
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
                    this.loading = false
                    this.office_statistics_ = res.data
                }
            }).catch((rej) => {
                if (rej) {
                    this.loading = false;
                    console.log(rej);
                }
            })
        },

        async dashboard_getStatistics() {
            this.loading = true;
            axios.get('https://test.m-aboelela.online/api/admin/dashboard', {
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
                    this.loading = false
                    this.dashboard_statistics_ = res.data
                }
            }).catch((rej) => {
                if (rej) {
                    this.loading = false;
                    console.log(rej);
                }
            })
        }
    }
})