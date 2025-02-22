<script setup>
// All Import File  Code Is Here......................................................................................................
import { useAuth, useCart, useSetting, useNotification, useCommonIsToggleFunctionality, useCategory } from "@/stores";
import { useRouter, useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";
import axiosInstance from "@/services/axiosService.js";
import CategorySkeleton from '@/components/skeleton/CategorySkeleton.vue'
const commonIsToggleFunctionality = useCommonIsToggleFunctionality();

const cart                          = useCart();
const { cartItemCount, totalPrice } = storeToRefs(cart);
const logo                          = ref("");


// All Variable  Code Is Here.....................................................................................................
const auth = useAuth();
const router = useRouter();
const route = useRoute();
const { user, loading } = storeToRefs(auth);
const notify = useNotification();
const category = useCategory();
const { categories } = storeToRefs(category);
const campaignDataShowing = ref("");
// API Calling Code Is Here.....................................................................................................

// All Function  Code Is Here.....................................................................................................


const getSettingsData = async () => {
  const settingData = await setting.getData();
      
  settingData.data.map((ele) => {
    if (ele.key == "header_logo") {
      logo.value = ele.logo;
    }
    if (ele.key == "primary_color") {
      primaryColor.value = ele;
    }
    if (ele.key == "secondary_color") {
      secondaryColor.value = ele;
    }
    if (ele.key == "facebook_id" ) {
      fbPageUrl.value = ele.value
    } 
    if (ele.key == "phone" ) {
      phoneNumber.value = ele.value
    } 
  });
};
const getLogo = async () => {
  const settingData = await setting.getData('key', 'header_logo');
  logo.value = settingData.data[0];  
};



const logout = async () => {
  const res = await auth.logout();
  if (res.success) {
    router.push({ name: "homePage" });
    notify.Success("Logout Successfully Done");
  }
};


// sticky Header

const stickyHeader = () => {
  const mainHeaderNavSection = document.querySelector(".navbar-part");

  window.addEventListener("scroll", () => {
    const scrollTopWindow = window.pageYOffset;
    const scrollScreenSize = window.screen.width;

    if (scrollTopWindow > 80 && scrollScreenSize > 768) {
      mainHeaderNavSection.classList.add("header-sticky");
    } else {
      mainHeaderNavSection.classList.remove("header-sticky");
    }
  });
};

// sticky Header

onMounted(() => {
  stickyHeader();
  getLogo();
});
</script>

<template lang="">
  <div>
    <!--=====================================
                    NAVBAR PART START
        =======================================-->
        <nav class="navbar-part">
            <div class="container-fluid">
                <div class="navbar-content">
                    <div class="">
                       <router-link :to="{ name: 'homePage' }" class="header-logo">
                      <img :src="logo?.value" alt="logo" />
                    </router-link>
                    </div>

                    <div class=" navbar-items">
                        <div >
                            <ul class="navbar-list">
                                <li class="navbar-item dropdown">
                                    <router-link :to="{ name: 'homePage' }" class="navbar-link" :class="{ 'text-warning': $route.name === 'homePage' }">Home</router-link>
                                </li>
                                <li class="navbar-item dropdown-megamenu">
                                    <router-link :to="{ name: 'shopPage' }" class="navbar-link" :class="{ 'text-warning': $route.name === 'shopPage' }">Shop</router-link>
                                </li>
                                <li class="navbar-item">
                                    <router-link :to="{ name: 'aboutPage' }" class="navbar-link" :class="{ 'text-warning': $route.name === 'aboutPage' }">About Us</router-link>
                                </li>
                                <li class="navbar-item">
                                     <router-link :to="{ name: 'contactPage' }" class="navbar-link" :class="{ 'text-warning': $route.name === 'contactPage' }">Contact Us</router-link>
                                </li>
                                <li class="navbar-item" v-if="campaignDataShowing == 'flashdeal'">
                                     <router-link :to="{ name: 'flashDealPage' }" class="navbar-link" :class="{ 'text-warning': $route.name === 'flashDealPage' }">Flash Deal</router-link>
                                </li>
                                <li class="navbar-item" v-if="campaignDataShowing == 'campaign'">
                                     <router-link :to="{ name: 'campaignPage' }" class="navbar-link" :class="{ 'text-warning': $route.name === 'campaignPage' }">Campaign Page</router-link>
                                </li>
                                <li class="navbar-item">
                                     <router-link :to="{ name: 'blogPage' }" class="navbar-link" :class="{ 'text-warning': $route.name === 'blogPage' }">Blog</router-link>
                                </li>
                                <!-- <li class="navbar-item dropdown">
                                    <a class="navbar-link dropdown-arrow" href="#">authentic</a>
                                    <ul class="dropdown-position-list" v-if="user.user">
                                        <li><router-link :to="{name: 'Profile'}">Profile</router-link></li>
                                        <li><router-link :to="{name: 'OrderList'}">My Order</router-link></li>
                                        <li ><a href="" @click.prevent="logout()">Logout<span v-show="loading" class="spinner-border spinner-border-sm mr-1"></span></a></li>
                                    </ul>
                                    <ul class="dropdown-position-list" v-else>
                                        <li><router-link :to="{name:'Login'}">login</router-link></li>
                                        <li><router-link :to="{name: 'Registration'}">register</router-link></li>
                                    </ul>
                                </li> -->
                            </ul>
                        </div>
                    </div>

                    <div >
                      <div class="navbar-widget-group"  @click="commonIsToggleFunctionality.isCartSideBartOpenOrClose">
                        <button class="navbar-widget navbar-cart " title="Cartlist">
                          <i class="fas fa-shopping-cart"></i>
                          <sup>{{ cartItemCount }}+</sup>
                          <span>total price<small>{{ $filters.currencySymbol(totalPrice) }}</small></span>
                        </button>
                      </div>
                    </div>
                </div>
            </div>
        </nav>
        <!--=====================================
                    NAVBAR PART END
        =======================================-->
  </div>
</template>

<style>

.navbar-items{
  display: flex;
  justify-content: center;
}

.banner-category-head {
  justify-content: start;
}

.active-link {
  color: var(--secondary-color) !important;
  font-weight: bold;
}

.navbar-section{
    padding: 5px 0px; 
    display:inline-block;
}
.navbar-section span a{
    padding: 10px 20px; 
    display:inline-block;
    font-size: 15px;
    color: var(--white);
}
.navbar-section span a:hover{
    color: var(--secondary-color);
    cursor: pointer;
}

.navbar-link {
    padding: 10px 0px;
}

.header-sticky {
  z-index: 99999;
  width: 100%;
  position: fixed;
  background-color: rgb(255, 255, 255);
  top: 0;
  padding: 5px 0 10px 0;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.header-sticky .banner-category-head{
  margin-top: 8px;
}


@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.main-order-btn {
  animation: pulse 1s infinite;
  font-size: 20px;
  background-color: var(--secondary-color);
  color: var(--primary);
  padding: 5px 15px;
  border-top: 2px solid var(--primary);
  border-left: 2px solid var(--primary);
  border-bottom: 2px solid var(--primary);
  border-right: 2px solid var(--primary);
  transition: 0.3s ease-in-out background-color;
}

.main-order-btn:hover {
  background-color: var(--secondary-color);
  color: white;
  transition: 0.3s ease-in-out background-color;
  border-color: var(--secondary-color);
}

.banner-category-list {
  width: 12%;
}

.active-text-color {
  color: var(--primary) !important;
}

@media (max-width: 1440px) {
  .banner-category-list {
    width: 14%;
  }
}

@media (max-width: 1199px) {
  .banner-category-list {
    width: 19%;
  }
}

@media (max-width: 1024px) {
  .banner-category-list {
    width: 21% !important;
  }
}

@media (max-width: 991px) {
}
</style>
