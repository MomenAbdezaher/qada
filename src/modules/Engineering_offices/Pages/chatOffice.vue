<template>
  <div class="conatiner" style="min-height: 80vh;overflow-y: hidden;">
    <div class="row main-chat  mx-auto d-flex my-5" v-if="chatApi.conversations.length > 0" v-motion-pop style="transition: 1s;">
      <!-- this is for right column -->
      <div class="col-4">
        <div class="chats-title my-3 border-bottom">محادثات</div>
        <div class="conv-menu" style="max-height: 40vh; overflow-y: auto;">
          <div class="d-flex py-2 align-items-center mt-3" v-for="chats , index in chatApi.conversations" :key="index">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="46" viewBox="0 0 48 46" fill="none">
              <ellipse cx="23.5508" cy="23" rx="23.5" ry="23" fill="#D9D9D9" />
            </svg>
            <div @click="chatApi.getOneConversation('https://test.m-aboelela.online/api/office/chat/conversation_messages',chats.id) , chatApi.activeConversation(index)" 
             style="cursor: pointer;"
            :class="chatApi.active == index ? 'active me-2 my-auto' : 'me-2 my-auto'"
            >
              <!-- You can adjust the margin-left (ml-2) as needed -->
              <div :class="chatApi.active ==  index ? 'text-white sidebar-title' : 'sidebar-title'">{{ chats.project_name }}</div>
              <div :class="chatApi.active ==  index ? 'text-white sidebar-subtitle' : 'sidebar-subtitle'">{{ chats.office_name }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- left column -->
      <div id="scrollDiv" class="col-8 py-2 border-end notify-menu"
       style="max-height: 50vh; min-height: fit-content;overflow-y: auto;scroll-behavior: smooth;scroll-margin-bottom: 0;"
       >
        <div v-for="conv in Array.from(new Set(chatApi.oneConversation))" :key="conv" class="mt-3">
          <span  class="reomve-spaces d-flex  justify-content-start" >
          <svg v-if="conv.is_sender ==true" xmlns="http://www.w3.org/2000/svg" width="401" height="78" viewBox="0 0 401 78" fill="none">
            <path
              d="M14.2694 0H386.501C394.01 0 400.098 3.22942 400.098 7.21312V45.082V56.8033V77.541L367.804 63.55L14.2694 64.0164C6.7597 64.0164 0.671906 60.787 0.671906 56.8033V7.21311C0.671906 3.22942 6.7597 0 14.2694 0Z"
              fill="#0C483F" />
              <text x="50%" y="50%" text-anchor="middle" dy=".3em" font-size="16" fill="white">
                {{ conv.message }}
            </text>
          </svg>
        </span>
        <span class="reomve-spaces down d-flex justify-content-end">
          <svg v-if="conv.is_sender == false" xmlns="http://www.w3.org/2000/svg" width="401" height="116" viewBox="0 0 401 116" fill="none">
            <path
              d="M386.714 0.721191H14.4827C6.97306 0.721191 0.885254 3.95061 0.885254 7.93431V81.8687V93.59V114.328L33.1793 100.337L386.714 100.803C394.224 100.803 400.311 97.5737 400.311 93.59V7.93431C400.311 3.95061 394.224 0.721191 386.714 0.721191Z"
              fill="#F6F6F6" />
            <path
              d="M0.885254 93.59V7.93431C0.885254 3.95061 6.97306 0.721191 14.4827 0.721191H386.714C394.224 0.721191 400.312 3.95061 400.312 7.93431V93.59C400.312 97.5737 394.224 100.803 386.714 100.803L33.1793 100.337L0.885254 114.328V81.8687"
              stroke="#E8E8E8" />
            <text x="50%" y="50%" text-anchor="middle" dy=".3em" font-size="16" fill="black">
              {{ conv.message }}
            </text>
          </svg>
        </span>
        </div>
        <div>
        </div>
      </div>
      <div class="row justify-content-end">
        <div class="col-8" style="position: relative;right: 30px;">
          <!--
          <div class="text-center"><span class="text-danger">{{ chatApi.sent }}</span></div>

          -->
<form @submit.prevent="chatApi.sendNewMessage('https://test.m-aboelela.online/api/office/chat/send')"  v-if="chatApi.conversations.length > 0" v-motion-roll-top style="transition: 1s;">
  <div class="input-group mb-3" v-if="chatApi.oneConversation.length > 0">
  <div @click.prevent="chatApi.sendNewMessage('https://test.m-aboelela.online/api/office/chat/send')" class="input-group-prepend" style="cursor: pointer;">
    <span class="input-group-text fs-4 text-primary" id="basic-addon1">
      <i class="fa-solid fa-paper-plane"></i>
    </span>
    </div>
  <input @click.prevent="chatApi.sendNewMessage('https://test.m-aboelela.online/api/office/chat/send')" v-model="chatApi.newMessage" type="text" class="form-control" placeholder="اكتب رسالة ..." aria-label="Username" aria-describedby="basic-addon1">
</div>
</form>
         
      </div>
     
    </div>
    </div>
   
   
  </div>
</template>

<script>
import { projectFile } from '@/stores/projectFiles';
import { pusher } from "@/stores/pusher";
import { chat } from "@/stores/chat";
import {onMounted, onUnmounted, ref } from "vue";
export default {
setup(){
  const chatApi = chat();
  const sendFile = projectFile();
  const userId = ref(null)
onUnmounted(() => {
  pusher.unsubscribe('private-chat')
}); 
onMounted(() => {
  if(localStorage.getItem('id')){
        userId.value = localStorage.getItem('id');
      }
  chatApi.getConversations('https://test.m-aboelela.online/api/office/chat/conversations');
  const channel = pusher.subscribe('private-chat');
     channel.bind('new_message' , (data)=>{
    chatApi.oneConversation.push({is_sender:true , message:data.message});
    })
});
   return{chatApi , sendFile , userId}
},
    };

 
 

</script>

<style scoped>
* {
  direction: rtl;
}
.conv-menu::-webkit-scrollbar,.notify-menu::-webkit-scrollbar {
  display: none !important;
  
}

.active{
  background-color: #BDBDBD;
padding: 10px;
transition: 0.5s;
border-radius: 20px;
}
.sideCard {
    position: absolute;
    top: 45%;
    background-color: #54847D;
    color: #fff;
    width: 150px;
    text-align: center;
    border-radius: 18px 0 0 18px;
}
.sideCard h3 {
    color: #fff;
}
.messages {
  margin: 20px 0;
}

.main-chat {
  margin-top: 15% !important;
  border-radius: 20px;
  border: 1px solid #BDBDBD;
  background: #FFF;
  width: 90%;
}

.custom-hr {
  width: 104%;
}

.chats-title {
  color: #0c483f;
  text-align: right;
  padding: 10px;
  font-family: Cairo;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;

}

.sidebar-title {
  color: var(--Text2, #000);
  text-align: right;
  font-family: Cairo;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 21px;
}

.sidebar-subtitle {
  color: var(--Text2, #000);
  text-align: right;
  font-family: Cairo;
  font-size: 11px;
  font-style: normal;
  font-weight: 500;
  line-height: 21px;
}
@media (max-width:431px) {
  .main-chat{
    width: 95%;
  }
  
}

@media (max-width: 576px) {
  .chats-title {
    color: #0c483f;
    text-align: right;
    font-family: Cairo;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
  }

  .sidebar-title {
    color: var(--Text2, #000);
    text-align: right;
    font-family: Cairo;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 21px;
  }

  .sidebar-subtitle {
    color: var(--Text2, #000);
    text-align: right;
    font-family: Cairo;
    font-size: 9px;
    font-style: normal;
    font-weight: 500;
    line-height: 21px;
  }

  .reomve-spaces {
    margin-bottom: -2vh;
  }
}
@media (max-width:450px) {
  .reomve-spaces{
    margin-bottom: -2vh;

  }
  
}

@media (max-width:350px) {
  .reomve-spaces{
    margin-bottom: -3.5vh;

  }
  .reomve-spaces.down{
    margin-top: 10px !important;
  }
  
}
</style>
