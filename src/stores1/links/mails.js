import { defineStore } from "pinia";

export const links = defineStore('linTo' , {
    actions:{
        actionscallPhone(){
            window.open("tel:+0000 0000 0100");
        },
         emailTo(){
            window.open('mailto:')
        },
         mapTo(){
            window.open('https://maps.app.goo.gl/yWp4V59JHnn3thdp6')
        }
    }
    
    
}) 
