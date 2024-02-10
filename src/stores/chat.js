import axios from "axios";
import {
    defineStore
} from "pinia";

export const chat = defineStore('conversation', {
    state: () => ({
        conversations: [],
        oneConversation: [],
        coversationId: null,
        token: null,
        messages: [],
        newMessage: null,
        chatId: null,
        active: null,
        realtimeChat: null
    }),
    actions: {
        async getConversations(api) {
            await axios.get(api, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        "Accept": "*/*",
                        "Content-Length": '',
                        "Accept-Encoding": 'gzip, deflate, br',
                        "Connection": 'keep-alive',
                        "Host": '',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                })
                .then((res) => {
                    if (res.status == 200) {
                        this.conversations = res.data.data
                    }
                }).catch((rej) => console.log(rej))
        },
        async getOneConversation(api, chats) {
            this.chatId = chats
            this.token = localStorage.getItem('token');
            await axios.post(api, {
                    conversation: chats
                }, {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        'Authorization': 'Bearer ' + this.token
                    },
                })
                .then((res) => {
                    if (res.status == 200) {
                        this.oneConversation = [];
                        this.oneConversation = res.data.data
                        setTimeout(() => {
                            this.scrollToDown()

                        }, 10);

                    }
                }).catch((rej) => console.log(rej))
        },
        async sendNewMessage(api) {
            this.token = localStorage.getItem('token');
            await axios.post(api, {
                conversation: this.chatId,
                message: this.newMessage
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    'Authorization': 'Bearer ' + this.token
                }
            }).then((res) => {
                if (res.status == 200) {
                    this.newMessage = '';
                    setTimeout(() => {
                        this.scrollToDown()
                    }, 10);
                    setTimeout(() => {
                        this.sent = ''
                    }, 2000);
                }
                //  this.getOneConversation(this.chatId)
            }).catch((rej) => {
                if (rej) {
                    console.log(rej);
                    this.sent = 'فشل الارسال'

                }
            })
        },
        scrollToDown() {
            document.getElementById('scrollDiv').scroll({
                top: 1000000000000000000000000000000000,
                behavior: 'smooth'
            });
        },
        activeConversation(index) {
            this.active = index;
        },
        pushermessage(message) {
            this.oneConversation.push(message);
        }
    }

})