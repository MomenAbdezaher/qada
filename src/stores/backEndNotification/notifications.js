import axios from 'axios';
import {
    defineStore
} from 'pinia';

export const backEndNotifications = defineStore('notifications', {
    state: () => ({
        notifications: [],
        unseen_requests: [],
    }),
    actions: {
        // get notification
        async getAllNotifications(api) {
            await axios.get(api, {
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
                    this.notifications = Array.from(new Set(res.data));
                    this.unseen_requests = this.notifications.filter((seen) => seen.seen == 0);
                }
            }).catch((rej) => {
                if (rej) {
                    console.log(rej);
                }
            })
        },
        async seen_Notifications(api, api2) {
            let token = localStorage.getItem('token');
            await axios.post(api, {
                notes: 's',
                platform_receipt: 's',
                receipt: 'z',
                stage_id: 1
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
                console.log(token);
                if (res.status == 200) {
                    this.unseen_requests = [];
                    this.getAllNotifications(api2);
                }
            }).catch((rej) => {
                if (rej) {
                    console.log(rej);
                }
            })
        },
    }
})