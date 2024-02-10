import Pusher from 'pusher-js';

export const pusher = new Pusher('305974013564f3ca6a87', {
  broadcaster:'pusher',
  cluster: 'eu', 
  authEndpoint:'https://test.m-aboelela.online/api/broadcasting/auth',
  //encrypted: true,
  app_id:"1612481",
  secret:'01e0cc127de3ebb7f48d',
  auth:{
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'X-CSRF-Token': "CSRF_TOKEN"
   }
  },

});




/**
  created(){
    const channel = pusher.subscribe('my-channel');
    channel.bind('new-message' , (data)=>{
      this.chatPusher.addMessage(data.message);
    })} 
 
 */