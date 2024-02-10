import axios from "axios";
import {
    defineStore
} from "pinia";

export const contactUs = defineStore('sendContact', {
    state: () => ({
        theName: null,
        theEmail: null,
        theMessage: null,
        loading: false,
    }),
    actions: {
        async sendContactRequest() {
            this.loading = true
            await axios.post('https://test.m-aboelela.online/api/contact', {
                name: this.theName,
                email: this.theEmail,
                message: this.theMessage
            }).then((res) => {
                if (res.status == 200 || res.data.state == true) {
                    this.loading = false;
                    this.theName = null;
                    this.theEmail = null
                    this.theMessage = null;
                }
            }).catch((rej) => {
                if (rej) {
                    this.loading = false;
                    this.theName = '';
                    this.theEmail = '';
                    this.theMessage = '';
                    console.log(rej);
                }
            })

        }
    }
})