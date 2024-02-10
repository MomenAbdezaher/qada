import { defineStore } from "pinia";


export const addProjectMember = defineStore('addMemeberProject' , {
    state:()=>({
        first: {
            path: '',
            name: ''
        },
        second: {
            path: '',
            name: ''
        },
        third: {
            path: '',
            name: ''
        },
        firstImage:null,
        secondImage:null,
        thirdImage:null,
    }),
    actions:{
        getFirstImage(e){
            this.firstImage = e.target.files[0]
            this.first.path = URL.createObjectURL(e.target.files[0])
            this.first.name = e.target.files[0].name
        },
        getSecondImage(e){
            this.secondImage = e.target.files[0]
            this.second.path = URL.createObjectURL(e.target.files[0])
            this.second.name = e.target.files[0].name
        },
        getThirdImage(e){
            this.thirdImage = e.target.files[0]
            this.third.path = URL.createObjectURL(e.target.files[0])
            this.third.name = e.target.files[0].name
        }
    }
})