<script setup>
// All Import File  Code Is Here......................................................................................................
import { computed, onMounted, ref, watch  } from "vue";
import { storeToRefs } from 'pinia';
import {useSetting} from '@/stores'
import axiosInstance from "@/services/axiosService.js";
// All Variable  Code Is Here.....................................................................................................
const setting      = useSetting();
const { settings } = storeToRefs(setting);
const email        = ref()
const logo         = ref()
const address      = ref()
const phone        = ref()
const description  = ref()
const facebook     = ref()
const whatsapp     = ref()
const title        = ref()
const fbPageUrl    = ref('https://www.facebook.com/servicekeybd')
const socialShares = ref("");

const getSettingsData = () => {
  if (!settings.value.data || !Array.isArray(settings.value.data)) {
    console.warn("Settings data is not available yet.");
    return;
  }

  settings.value.data.forEach((ele) => {
    if (ele.key === "footer_email") {
      email.value = ele;
    }
    if (ele.key === "facebook_id") {
      facebook.value = ele;
      fbPageUrl.value = ele.value;
    }
    if (ele.key === "footer_address") {
      address.value = ele;
    }
    if (ele.key === "phone_number") {
      phone.value = ele;
    }
    if (ele.key === "footer_description") {
      description.value = ele;
    }
    if (ele.key === "footer_logo") {
      logo.value = ele;
    }
    if (ele.key === "whatsapp_number") {
      whatsapp.value = ele;
    }
    if (ele.key === "title") {
      title.value = ele;
    }
  });
};

watch(
  () => settings.value.data,
  (newData) => {
    if (newData && Array.isArray(newData)) {
      getSettingsData();
    }
  },
  { immediate: true }
);

const getLogo = async () => {
  const settingData = await setting.getData('key', 'footer_logo');
  logo.value = settingData.data[0];  
};



// social media link  start

const socialMedia = async () => {
  try {
    const res = await axiosInstance.get("/social-medias");    
    socialShares.value = res.data.result;
    console.log("Updated Data:", socialShares.value);
  } catch (error) {
    console.log(error);
  }
};

const socialMediaData = computed(()=> socialShares.value);


const socialIcons = (socialType) => {
  const iconMapping = {
    Facebook: "fab fa-facebook-f",
    Twitter: "fab fa-twitter",
    Whatsapp: "fab fa-whatsapp",
    Messenger: "fab fa-facebook-messenger",
    Linkedin: "fab fa-linkedin",
    Instagram: "fab fa-instagram",
    Phone: "fas fa-phone",
  };
  return iconMapping[socialType] || "default-icon-class";
};

const socialURL = (socialType, socialUrl) => {
  const iconMapping = {
    Facebook: `https://www.facebook.com/${socialUrl}/`,
    Twitter: `https://www.twitter.com/${socialUrl}/`,
    Whatsapp: `https://wa.me/+88${socialUrl}?text=Hello!`,
    Messenger: `https://www.messenger.com/t/${socialUrl}/`,
    Linkedin: `https://www.linkedin.com/${socialUrl}/`,
    Instagram: `https://www.instagram.com/${socialUrl}/`,
    Phone: `https://m.me/+88${socialUrl}`,
  };
  return iconMapping[socialType] || "default-icon-class";
};

// social media link  end



onMounted(() => {
    getSettingsData(); 
    getLogo();
    // socialMedia();
    // Load the Facebook SDK script here
    const script = document.createElement('script');
        script.src = 'https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v18.0';
        script.async = true;
        script.defer = true;
        script.crossOrigin = 'anonymous';
        script.nonce = 'isN1HXTF';

        // Append the script to the document's body
        document.body.appendChild(script);
})
</script>

<template>
  <div class="footer-main-section">
  <footer class="mt-5">
      <div class="container">
        <div class="row">
          <div class="col-sm-6 col-xl-3">
            <div class="footer-widget">
              <router-link :to="{ name: 'homePage'}" class="footer-logo" href="#">
                <img :src="logo?.value" alt="logo" />
              </router-link>
              <p class="footer-desc ">{{ description?.value }}</p>
              <ul class="footer-social" v-show="socialShares.length > 0">
                <li v-for="(socialShare, index) in socialShares" :key="index">
                  <a :href="socialURL(socialShare.type, socialShare.contact)" target="_blank" title="">
                    <i :class="socialIcons(socialShare.type)"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-sm-6 col-xl-3">
            <div class="footer-widget contact">
              <h3 class="footer-title text-light">contact us</h3>
              <ul class="footer-contact ">
                <li>
                  <i class="icofont-ui-email"></i>
                  <p>
                    <span class="text-light">{{ email?.value }}</span>
                  </p>
                </li>
                <li>
                  <i class="icofont-ui-touch-phone"></i>
                  <p>
                    <span class="text-light">+88{{ phone?.value }}</span>
                  </p>
                </li>
                <li>
                  <i class="icofont-phone-circle"></i>
                  <p>
                    <span class="text-light">+88{{ whatsapp?.value }}</span>
                  </p>
                </li>
                <li>
                  <i class="icofont-location-pin"></i>
                  <p class="text-light">{{ address?.value }}</p>
                </li>
              </ul>
            </div>
          </div>

          <div class="col-sm-6 col-xl-3">
            <div class="footer-widget">
                <h3 class="footer-title text-light">quick Links</h3>
                <div class="footer-links">
                    <ul>
                        <li><router-link :to="{ name: 'TermsConditions' }" class="">Terms & Conditions</router-link></li>
                        <li><router-link :to="{ name: 'aboutPage' }" class="">About us</router-link></li>
                        <li><router-link :to="{ name: 'PrivacyPolicy' }" class="">privacy policy</router-link></li>
                        <li><router-link :to="{ name: 'ReturnRefund' }" class="">Return & Refund</router-link></li>
                    </ul>
                    <ul>
                        <li><a :href="`https://www.facebook.com/${facebook?.value}`" target="_blank" class="">Facebook</a></li>
                        <li><router-link :to="{ name: 'contactPage' }" class="">contact us</router-link></li>
                        <li><router-link :to="{ name: 'shopPage' }" class="">Shop page</router-link></li>
                        <li><router-link :to="{ name: 'shopPage', query: {top: 'top-product'}}" class="">Top product</router-link></li>
                        <li><router-link :to="{ name: 'shopPage', query: {recent: 'recent-product'}}" class="">New Arrivals</router-link></li>
                    </ul>
                </div>
            </div>
        </div>
          
          <div class="col-sm-6 col-xl-3">
            <div class="footer-widget">
                <h3 class="footer-title text-light">Let's Connect</h3>
                <p class="footer-desc">
                    <div id="fb-root"></div>
                    <div class="fb-page" :data-href="`https://www.facebook.com/${facebook?.value}`" data-tabs="timeline" data-width="" data-height="130" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true">
                        <blockquote :cite="`https://www.facebook.com/${facebook?.value}`" class="fb-xfbml-parse-ignore">
                        <a :href="`https://www.facebook.com/${facebook?.value}`">Nittonoton</a>
                        </blockquote>
                    </div>
                </p>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
          <div class="col-12">
              <div class="footer-bottom">
                  <p class="text-center footer-copytext">&copy;  2024 Nittonoton Made By <a class="text-danger" href="http://servicekey.io" target="_blank" rel="noopener noreferrer">Nittonoton Team</a> </p>
              </div>
          </div>
      </div>
    </footer>
  </div>
</template>


<style>
.footer-main-section{
  background-color: var(--primary-color);
  padding: 10px;
}
.footer-part{
  background-color: #2c150f;
}


.footer-logo img {
    width: 270px !important;
}

.footer-copytext a {
    color: var(--black)!important;
}

@media (max-width: 767px){
.footer-bottom {
  padding: 13px 2px 11px 15px;
 }
}
@media (max-width: 425px){
  .footer-widget {
     margin-bottom: 2px; 
}
.footer-logo img {
  width: 350px !important;
}
}
@media (max-width: 320px){
  .footer-widget {
     margin-bottom: 2px; 
}
.footer-logo img {
  width: 250px !important
}
}

</style>
