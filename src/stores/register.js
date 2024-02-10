import {
    defineStore
} from "pinia";
import axios from "axios";
import router from "@/router";
export const useregister = defineStore('sendRegisterApi', {
        state: () => ({

            userName: '',
            phone: '',
            password: '',
            confirmPassword: '',
            email: '',
            loginName: '',
            loginPassword: '',
            terms: false,
            registerd: '',
            loading: false

        }),
        actions: {
            /*start register and login for prsons */
            async registeruserApi() {
                if (this.terms == false || this.password != this.confirmPassword) {
                    this.registerd = 'فشل عملية التسجيل  الرجاء مراجعة البيانات والموافقة على الشروط والاحكام'
                } else {
                    this.loading = true;
                    await axios.post('https://test.m-aboelela.online/api/user/register', {
                        name: this.userName,
                        phone: this.phone,
                        password: this.password,
                        email: this.email

                    }).then(async  (res) => {
                        if (res.status == 200) {

                            localStorage.setItem("token", res.data.auth_token);
                            localStorage.setItem("name", res.data.data.name);
                            localStorage.setItem("id", res.data.data.id);
                            localStorage.setItem("phone", res.data.data.phone);
                            localStorage.setItem("email", res.data.data.email);
                            localStorage.setItem('type', 'user');
                            
                            this.userName = '';
                            this.phone = '';
                            this.password = '';
                            this.email = '';
                            this.registerd = 'تم عملية التسجيل بنجاح'
                            this.registerd = '';
                            this.loading = false
                            if(localStorage.getItem('projectData') !== undefined){
                                await axios
                                        .post(
                                            "https://test.m-aboelela.online/api/user/projects/create",
                                            JSON.parse(localStorage.getItem('projectData')),
                                            {
                                            headers: {
                                                "Content-Type": "multipart/form-data",
                                                Accept: "*/*",
                                                "Content-Length": "",
                                                "Accept-Encoding": "gzip, deflate, br",
                                                Connection: "keep-alive",
                                                Host: "",
                                                Authorization: "Bearer " + res.data.data.token,
                                            },
                                            }
                                        ).then((reponse) => {
                                            if(reponse.data.state){
                                                localStorage.removeItem('projectData')
                                            }else {
                                                alert(reponse.data.msg)
                                            }
                                            
                                        }).catch((e) => {
                                            console.log(e)
                                            if(e.data.state){
                                                localStorage.removeItem('projectData')
                                            }else {
                                                alert(e.data.msg)
                                            }
                                        })
                            }
                            setTimeout(() => {
                                router.push({
                                    name: 'home'
                                })
                            }, 2000);
                        }
                    }).catch((err) => {
                        console.log(err)
                        if (err) {

                            this.registerd = 'فشل عملية التسجيل  الرجاء مراجعة البيانات والموافقة على الشروط والاحكام'
                            setTimeout(() => {
                                this.registerd = '';
                            }, 2000);
                            this.loading = false;
                        }
                        console.log(err.message)
                    })
                }
            },

            async loginUserApi() {
                this.loading = true
                await axios.post('https://test.m-aboelela.online/api/user/login', {
                    email: this.loginName,
                    password: this.loginPassword,
                }).then((res) => {
                    if (res.status == 200) {
                        localStorage.setItem("token", res.data.token);
                        localStorage.setItem("name", res.data.data.name);
                        localStorage.setItem("id", res.data.data.id);
                        localStorage.setItem("phone", res.data.data.phone);
                        localStorage.setItem("email", res.data.data.email);
                        localStorage.setItem('type', 'user');
                        this.email = '';
                        this.password = '';
                        // this.registerd = 'تم تسجيل الدخول بنجاح'
                        this.loading = false;
                        setTimeout(() => {
                            router.push({
                                name: 'home'
                            })

                            this.registerd = '';
                        }, 2000);
                    }
                }).catch((error) => {

                    console.log(error + " " + 'no data found')
                    if (error) {
                        this.registerd = "فشل عملية تسجيل الدخول الرجاء التأكد من البيانات صحيحة"
                        this.loading = false;
                        setTimeout(() => {
                            this.registerd = '';
                        }, 3000);
                    }
                })
            },
            /*start register and login for prsons */
            /*******************************************************************************/
            /*start register and login for Buisness */
            async registerBuisnessApi() {
                if (this.terms == false || this.password != this.confirmPassword) {
                    this.registerd = 'فشل عملية التسجيل  الرجاء مراجعة البيانات والموافقة على الشروط والاحكام'
                } else {
                    this.loading = true;
                    await axios.post('https://test.m-aboelela.online/api/business/register', {
                        name: this.userName,
                        phone: this.phone,
                        password: this.password,
                        email: this.email

                    }, ).then((res) => {
                        if (res.status == 200) {
                            this.registerd = 'تم عملية التسجيل بنجاح'
                            this.userName = '';
                            this.phone = '';
                            this.password = '';
                            this.email = '';
                            this.loading = false
                            setTimeout(() => {
                                router.push({
                                    name: 'home'
                                })
                                this.registerd = '';
                            }, 2000);
                        }
                    }).catch((err) => {
                        if (err) {

                            this.registerd = 'فشل عملية التسجيل  الرجاء مراجعة البيانات والموافقة على الشروط والاحكام'
                            this.loading = false
                            setTimeout(() => {
                                this.registerd = '';
                            }, 3000);
                        }
                        console.log(err.message)
                    })

                }

            },

            async loginBuisnessApi() {
                this.loading = true;
                await axios.post('https://test.m-aboelela.online/api/business/login', {
                    email: this.loginName,
                    password: this.loginPassword,
                }).then((res) => {
                    if (res.status == 200) {
                        localStorage.setItem("token", res.data.token);
                        localStorage.setItem("name", res.data.data.name);
                        localStorage.setItem("id", res.data.data.id);
                        localStorage.setItem("phone", res.data.data.phone);
                        localStorage.setItem("email", res.data.data.email);
                        localStorage.setItem('type', 'business');
                        this.loginName = '';
                        this.loginPassword = ''
                        // this.registerd = 'تم تسجيل الدخول بنجاح'
                        this.loading = false;
                        setTimeout(() => {
                            router.push({
                                path: "/business"
                            });
                            this.registerd = '';
                        }, 2000);
                    }
                }).catch((error) => {

                    console.log(error + " " + 'no data found')
                    if (error) {
                        this.registerd = "فشل عملية تسجيل الدخول الرجاء التأكد من البيانات صحيحة"
                        this.loading = false;
                        setTimeout(() => {
                            this.registerd = '';
                        }, 3000);
                    }
                })
            },
            /*end register and login for Buisness */
            /*************************************************************************** */
            /*start register and login for officc */
            async registerofficcApi() {
                if (this.terms == false || this.password != this.confirmPassword) {
                    this.registerd = 'فشل عملية التسجيل  الرجاء مراجعة البيانات والموافقة على الشروط والاحكام'
                } else {
                    this.loading = true;
                    await axios.post('https://test.m-aboelela.online/api/office/register', {
                        name: this.userName,
                        phone: this.phone,
                        password: this.password,
                        email: this.email

                    }, ).then((res) => {
                        if (res.status == 200) {
                            this.userName = '';
                            this.phone = '';
                            this.password = '';
                            this.email = '';
                            this.registerd = 'تم عملية التسجيل بنجاح'
                            this.loading = false;
                            setTimeout(() => {
                                router.push({
                                    name: 'home'
                                })
                                this.registerd = '';
                            }, 2000);
                        }
                    }).catch((err) => {
                        if (err) {

                            this.registerd = 'فشل عملية التسجيل  الرجاء مراجعة البيانات والموافقة على الشروط والاحكام'
                            this.loading = false
                            setTimeout(() => {
                                this.registerd = '';
                            }, 3000);
                        }
                        console.log(err.message)
                    })

                }


            },

            async loginofficcApi() {
                this.loading = true;
                await axios.post('https://test.m-aboelela.online/api/office/login', {
                    email: this.loginName,
                    password: this.loginPassword,
                }).then((res) => {
                    if (res.status == 200) {
                        localStorage.setItem("token", res.data.token);
                        localStorage.setItem("name", res.data.data.name);
                        localStorage.setItem("id", res.data.data.id);
                        localStorage.setItem("phone", res.data.data.phone);
                        localStorage.setItem("email", res.data.data.email);
                        localStorage.setItem('type', 'office');
                        this.email = '';
                        this.password = '';
                        // this.registerd = 'تم تسجيل الدخول بنجاح'
                        this.loading = false;
                        setTimeout(() => {
                            router.push({
                                path: "/EngineeringOffices"
                            });
                            this.registerd = '';
                        }, 2000);
                    }
                }).catch((error) => {

                    console.log(error + " " + 'no data found')
                    if (error) {
                        this.registerd = "فشل عملية تسجيل الدخول الرجاء التأكد من البيانات صحيحة"
                        this.loading = false;
                        setTimeout(() => {
                            this.registerd = '';
                        }, 3000);
                    }
                })
            },
            /*end register and login for officc */

            /* Update profile */
            async updateAccount(api) {
                if (this.terms == false || this.password != this.confirmPassword) {
                    this.registerd = 'فشل عملية التسجيل  الرجاء مراجعة البيانات والموافقة على الشروط والاحكام'
                } else {
                    this.loading = true;
                    await axios.post(api, {
                        name: this.userName,
                        email: this.email,
                        password: this.password,
                        confirm_password: this.confirmPassword,
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
                            this.registerd = 'تم تحديث معلومات الحساب';
                            setTimeout(() => {
                                this.registerd = ''
                            }, 3000);
                            this.userName = '';
                            this.email = '';
                            this.password = '';
                            this.confirmPassword = '';
                        }
                    }).catch((rej) => {
                        if (rej) {
                            this.loading = false;
                            this.registerd = 'فشل تحديث البيانات';
                            setTimeout(() => {
                                this.registerd = ''
                            }, 3000);
                        }
                    })
                }
            }
        }
    }

)