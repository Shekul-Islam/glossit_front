<script setup>
import { ref, onMounted, watch } from "vue";
import {useSetting} from '@/stores'
import { storeToRefs } from "pinia";

const messenger = ref()
const phone = ref()
const whatsapp = ref()

const isOpenChat = ref('');
const setting = useSetting();
const { settings } = storeToRefs(setting);


//settings start

const getSettingsData = async() => {

  if (!settings.value.data || !Array.isArray(settings.value.data)) {
    console.warn("Settings data is not available yet.");
    return;
  }

  settings.value.data.forEach((ele) => {
    if (ele.key == "messenger_id" ) {
      messenger.value = ele
      
    } 
    if (ele.key == "phone_number" ) {
        phone.value = ele
      } 
      if (ele.key == "whatsapp_number" ) {
        whatsapp.value = ele
      } 
    })
  }

  watch(
    () => settings.value.data,
    (newData) => {
      if (newData && Array.isArray(newData)) {
        getSettingsData();
      }
    },
    { immediate: true }
  );


//settings end



const chatOpen = () =>{
  isOpenChat.value = !isOpenChat.value
}


const connectWhatsApp = (whatsappNumber) =>{
  const phoneNumber = whatsappNumber;
  const whatsappLink = `https://wa.me/+88${phoneNumber}?text=Hello!`;
  window.location.href = whatsappLink 
}

const connectPhone = (number) =>{
  const phoneNumber = number;
  const phoneLink = `tel:${phoneNumber}`;
  window.location.href = phoneLink;
}
const connectMessenger = (messengerUsername) => {
  const messengerLink = `https://www.messenger.com/t/${messengerUsername}/`
  window.location.href = messengerLink;
}

onMounted(() => {
    getSettingsData(); 
})


</script>

<template>
    <div>
        <div class="social-contact floating_btn">
            <ul class="chat-item" :class="{ 'openChatItems' : isOpenChat }">
            <li class="phone" v-if="phone" @click.prevent="connectPhone(phone.value)"><i class="fa-solid fa-phone"></i></li>
            <li class="whatsapp" v-if="whatsapp" @click.prevent="connectWhatsApp(whatsapp.value)"><i class="fa-brands fa-whatsapp"></i></li>
            <li class="messenger" v-if="messenger" @click.prevent="connectMessenger(messenger.value)"><i class="fa-brands fa-facebook-messenger"></i></li>
            </ul>
            <div class="message-icon contact_icon" @click.prevent="chatOpen">
            <i class="fa-solid fa-xmark text-light" style="font-size: 20px;width:100%;" v-if="isOpenChat"></i>
            <i class="fa-regular fa-comment-dots" style="font-size: 20px;width:100%;" v-else></i>
            </div>
            <div class="chat-text mt-2">Live Chat</div>
        </div>
    </div>
</template>

<style>

a{
  text-decoration:none;
}
.floating_btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 100px;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content:center;
  z-index: 1000;
}

@keyframes pulsing {
  to {
    box-shadow: 0 0 0 30px rgba(232, 76, 61, 0);
  }
}

.contact_icon {
  background-color: var(--primary);
  color: #fff;
  width: 60px;
  height: 60px;
  font-size:30px;
  border-radius: 50px;
  text-align: center;
  box-shadow: 2px 2px 3px #999;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translatey(0px);
  animation: pulse 1.5s infinite;
  box-shadow: 0 0 0 0 var(--primary);
  -webkit-animation: pulsing 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
  -moz-animation: pulsing 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
  -ms-animation: pulsing 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
  animation: pulsing 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
  font-weight: normal;
  font-family: sans-serif;
  text-decoration: none !important;
  transition: all 300ms ease-in-out;
}


.text_icon {
  margin-top: 8px;
  color: #707070;
  font-size: 13px;
}


/* chat icon start */

.chat-item{
    position: fixed;
    bottom: 50px;
    right: 50px;
    z-index: 9;
    transition: 0.5s;
}
.openChatItems li{
  position: relative;
  transition: 0.5s;
}
.openChatItems li:nth-child(1) {
  margin-bottom: 60px;
}

.openChatItems li:nth-child(2) {
  margin-bottom: 120px;
}
.openChatItems li:nth-child(3) {
  margin-bottom: 180px;
}
.openChatItems li:nth-child(4) {
  margin-bottom: 240px;
}
.chat-item li{
  list-style: none;
  width: 50px;
  height: 50px;
  line-height: 55px;
  text-align: center;
  color: #fff;
  border-radius: 100%;
  position: absolute;
  bottom: 0;
  right: 0;
  cursor: pointer;
  transition: 0.5s;
}
.phone,
.whatsapp{
  background-color: #02B43C;
}
.messenger{
  background-color: #01A0F7;
}
.chat-item li i{
  font-size: 24px;
}
.opacity{
  opacity: 0;
  transition: 0.5s;
}
.web-setting .setting-icon{
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background-color: var(--secondary-color);
    position: fixed;
    top: 30%;
    right: 0;
    z-index: 99;
    cursor: pointer;
    transition: 0.5s;
}
.social-contact .message-icon{
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background-color: var(--secondary-color);
    color: var(--primary);
    position: fixed;
    bottom: 50px;
    right: 50px;
    z-index: 99;
    cursor: pointer;
    transition: 0.5s;
    border-radius: 100%;
    border: 2px solid var(--secondary-color);
}
.social-contact .chat-text{
    position: fixed;
    bottom: 25px;
    right: 40px;
    z-index: 99;
    font-weight: 700;
    color: black;
}

/* chat icon end */


@media (max-width: 768px) {
  .social-contact .chat-text {
    bottom: 49px;
  }

}

@media (max-width: 768px) {

  .social-contact .chat-text {
  position: fixed;
  bottom: 49px;
  right: 11px;
  z-index: 99;
  font-weight: 700;
  color: black;
}

.social-contact .message-icon {
    bottom: 75px;
    right: 25px;
}

.chat-item li {
    width: 46px;
    height: 46px;
    bottom: 27px;
    right: -25px;
}

  
}
@media (max-width: 425px) {

  .social-contact .chat-text {
  position: fixed;
  bottom: 49px;
  right: 11px;
  z-index: 99;
  font-weight: 700;
  color: black;
}

  .social-contact .message-icon {
    bottom: 75px;
    right: 25px;
    width: 40px;
    height: 40px;
    line-height: 40px;
  }

  .social-contact .chat-text {
      font-size: 14px;
  }

.chat-item li {
    width: 40px;
    height: 40px;
    line-height: 46px;
    bottom: 25px;
    right: -25px;
}

  
}

@media (max-width: 375px) {

  .social-contact .chat-text {
  position: fixed;
  bottom: 49px;
  right: 11px;
  z-index: 99;
  font-weight: 700;
  color: black;
}

.social-contact .message-icon {
    bottom: 75px;
    right: 25px;
}

  
}

@media (max-width: 320px) {
  
.social-contact .chat-text {
  position: fixed;
  bottom: 49px;
  right: 11px;
  z-index: 99;
  font-weight: 700;
  color: black;
}

.social-contact .message-icon {
    bottom: 75px;
    right: 25px;
}





}





</style>