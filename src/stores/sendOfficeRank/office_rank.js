import axios from "axios";
import {
    defineStore
} from "pinia";

export const office_rank = defineStore('rank', {
    state: () => ({
        registerd: null
    }),
    actions: {
        async send_office_rank(api, rate, contractId) {
            await axios.post(api, {
                rating: rate,
                contract_id: contractId
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
                    this.registerd = res.data.msg;
                    setTimeout(() => {
                        this.registerd = ''
                    }, 3000);
                }
            }).catch((rej) => {
                this.registerd = rej.message == 'Request failed with status code 500' ? 'مشكلة فى الخادم حاول مرة اخرى' : 'فشل التقييم'
                setTimeout(() => {
                    this.registerd = ''
                }, 3000);
            })
        }
    }
})