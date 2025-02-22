<script setup>
import { onMounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useSetting, useCommonIsToggleFunctionality } from "@/stores";

const setting = useSetting();
const commonIsToggleFunctionality = useCommonIsToggleFunctionality();
const { navSideBar } = storeToRefs(commonIsToggleFunctionality);
const { settings } = storeToRefs(setting);
const email = ref();
const logo = ref();
const phone = ref();
const title = ref();

const getSettingsData = async () => {

  if (!settings.value.data || !Array.isArray(settings.value.data)) {
    console.warn("Settings data is not available yet.");
    return;
  }

  settings.value.data.forEach((ele) => {
    if (ele.key == "header_logo") {
      logo.value = ele;
    }
    if (ele.key == "footer_email") {
      email.value = ele;
    }
    if (ele.key == "phone_number") {
      phone.value = ele;
    }
    if (ele.key == "title") {
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

const props = defineProps({
  isNavTrue: Boolean,
  required: true,
});

$('.header-user').on('click', function(){
    $('body').css('overflow', 'hidden');
    $('.nav-sidebar').addClass('active');
    $('.nav-close').on('click', function(){
        $('body').css('overflow', 'inherit');
        $('.nav-sidebar').removeClass('active');
        $('.backdrop').fadeOut();
    });
});

onMounted(() => {
  getSettingsData();
});
</script>

<template lang="">
  <div>
    <div
      class="backdrop"
      :style="{ display: navSideBar ? 'block' : 'none' }"
      @click="commonIsToggleFunctionality.isNavSideBarOpenOrClose"
    ></div>
    <aside :class="['nav-sidebar', { active: navSideBar }]">
      <div class="nav-header">
        <router-link :to="{ name: 'homePage' }">
          <img :src="logo?.value" alt="logo" />
        </router-link>
        <button
          class="nav-close"
          @click="commonIsToggleFunctionality.isNavSideBarOpenOrClose"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="nav-content">
        <ul class="nav-list">
          <li>
            <router-link :to="{ name: 'CampaignBanner' }" class="nav-link dropdown-link" ><i class="icofont-page"></i>Campaign</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'blogPage' }" class="nav-link dropdown-link" ><i class="icofont-page"></i>Blogs</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'TermsConditions' }" class="nav-link dropdown-link" ><i class="icofont-page"></i>Terms & Conditions</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'aboutPage' }" class="nav-link dropdown-link" ><i class="icofont-page"></i>About us</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'contactPage' }" class="nav-link dropdown-link" ><i class="icofont-page"></i>Contact us</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'PrivacyPolicy' }" class="nav-link dropdown-link" ><i class="icofont-page"></i>privacy policy</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'ReturnRefund' }" class="nav-link dropdown-link" ><i class="icofont-page"></i>Return & Refund</router-link>
          </li>
          <!-- <li>
              <a class="nav-link dropdown-link" href="#"
                ><i class="icofont-bag-alt"></i>my account</a
              >
              <ul class="dropdown-list">
                <li><a href="profile.html">profile</a></li>
                <li><a href="wallet.html">wallet</a></li>
                <li><a href="wishlist.html">wishlist</a></li>
                <li><a href="compare.html">compare</a></li>
                <li><a href="checkout.html">checkout</a></li>
                <li><a href="orderlist.html">order history</a></li>
                <li><a href="invoice.html">order invoice</a></li>
                <li><a href="email-template.html">email template</a></li>
              </ul>
            </li> -->
        </ul>
        <div class="nav-footer">
          <div class="nav-info-group">
            <div class="nav-info">
              <i class="icofont-ui-touch-phone"></i>
              <p>
                <small>call us</small>
                <span>{{ phone?.value }}</span>
              </p>
            </div>
            <div class="nav-info">
              <i class="icofont-ui-email"></i>
              <p>
                <small>email us</small>
                <span>{{ email?.value }}</span>
              </p>
            </div>
          </div>
          {{ navSideBar}}
          <p>
            All Rights Reserved by <a href="#">{{ title?.value }}</a>
          </p>
        </div>
      </div>
    </aside>
  </div>
</template>

<style scoped>
.nav-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
}

.backdrop {
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 4;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}
</style>
