import axios from "axios";
import {
    defineStore
} from "pinia";
export const start_work = defineStore('startWork', {
    state: () => ({
        stage_id_: null,
        notes_: null,
        platform_receipt_: null,
        receipt_: null,
        first: {
            path: '',
            name: ''
        },
        second: {
            path: '',
            name: ''
        },
        registerd: null,
        loading: false,
        recive_Stage_files: {},
        payments: [],

        approve: null
    }),
    actions: {
        async send_start_work(api) {
            this.loading = true
            await axios.post(api, {
                stage_id: this.stage_id_,
                notes: this.notes_,
                platform_receipt: this.platform_receipt_,
                receipt: this.receipt_
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "Accept": "*/*",
                    "Content-Length": '',
                    "Accept-Encoding": 'gzip, deflate, br',
                    "Connection": 'keep-alive',
                    "Host": '',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            }).then((res) => {
                if (res.status == 200) {
                    this.loading = false;
                    this.registerd = 'تم ارسال طلبك'
                    this.notes_ = null;
                    this.receipt_ = null;
                    this.platform_receipt_ = null;
                    setTimeout(() => {
                        this.registerd = ''
                    }, 3000);
                }
            }).catch((rej) => {
                if (rej) {
                    console.log(rej);
                    this.loading = false;
                    this.registerd = 'فشل ارسال الطلب'
                    setTimeout(() => {
                        this.registerd = ''
                    }, 3000);
                }
            })
        },
        getFirstImage(e) {
            this.platform_receipt_ = e.target.files[0]
            // this.first.path = URL.createObjectURL(e.target.files[0])
            this.first.name = e.target.files[0].name
        },
        getSecondImage(e) {
            this.receipt_ = e.target.files[0]
            //this.second.path = URL.createObjectURL(e.target.files[0])
            this.second.name = e.target.files[0].name
        },

        empytValues() {
            this.registerd = ''
            this.first.name = '';
            this.second.name = '';
            this.notes_ = null;
            this.platform_receipt_ = null;
            this.receipt_ = null;

        },
        async officeAcceptOrRejectWork(api, payment) {
            this.loading = true;
            await axios.post(api, {
                payment_id: payment.id
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
                    console.log(res.data);
                    this.loading = false;
                    this.registerd = res.data.msg
                    setTimeout(() => {
                        this.registerd = ''
                    }, 3000);
                }
            }).catch((rej) => {
                if (rej) {
                    console.log(rej);
                    this.loading = false;
                    this.registerd = rej.msg ? rej.msg : 'فشل اجراء العملية'
                    setTimeout(() => {
                        this.registerd = ''
                    }, 3000);
                }
            })
        },
        async show_Stage(api, projectID) {
            await axios.post(api, {
                    project_id: projectID
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
                    sessionStorage.setItem('response', JSON.stringify(res))
                    if (res.status == 200) {
                        this.recive_Stage_files = res.data;
                        sessionStorage.setItem('recived stages', JSON.stringify(this.recive_Stage_files))
                    }
                })
                .catch((rej) => {
                    if (rej) {
                        console.log(rej);
                    }
                })
        },
        async recieve_stage(api) {
            this.loading = true;
            await axios.post(api, {
                stage_id: this.stage_id_
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
                if (res.status) {
                    this.loading = false;
                    this.registerd = res.data.msg;
                    this.loading = false;
                }
            }).catch((rej) => {
                console.log(rej)
                this.loading = false
                this.registerd = rej.msg;
            });
        },
        handleRecieveWorkValues(stage) {
            this.stage_id_ = stage.id;
            this.payments = stage.payments;
            this.approve = stage.payments.length > 0 ? stage.payments[0].approved : null;
        },
        handleCloseForm() {
            //this.stage_id_ = null;
            // this.payments = [],
            // this.approve = null;
            this.loading = false;
            this.registerd = null;
            this.notes_ = null;
            this.receipt_ = null;
            this.platform_receipt_ = null
            this.first.name = null;
            this.first.path = null;
            this.second.name = null;
            this.second.path = null;
            //this.recive_Stage_files =[];
        },
        async edit_request(api) {
            this.loading = true;
            await axios.post(api, {
                notes: this.notes_,
                stage_id: this.stage_id_
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
                    this.registerd = res.data.msg
                }
            }).catch((rej) => {
                if (rej) {
                    this.registerd = rej.msg ? rej.msg : 'فشل الارسال'
                    this.loading = false;
                }
            })
        },
        async sign_penalty(api) {
            await axios.post(api, {
                stage_id: this.stage_id_
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
                    this.registerd = 'تم توقيع الغرامة'
                    console.log(res.data);
                }
            }).catch((rej) => {
                if (rej) {
                    this.registerd = rej.msg ? rej.msg : 'فشل التوقيع'
                }
            })
        },
        async deliver_stage(api) {
            this.loading = true;
            await axios.post(api, {
                stage_id: this.stage_id_,
                notes: this.notes_,
                files: this.platform_receipt_
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
                    this.registerd = res.data.msg;
                    setTimeout(() => {
                        this.registerd = ''
                    }, 3000);
                }
            }).catch((rej) => {
                if (rej) {
                    this.loading = false;
                    this.registerd = 'فشل الارسال'
                    console.log(rej);
                    setTimeout(() => {
                        this.registerd = ''
                    }, 3000);
                }
            })
        }

    }


})