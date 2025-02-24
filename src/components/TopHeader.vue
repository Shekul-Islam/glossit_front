<script setup>
// All Import File  Code Is Here......................................................................................................
import { onMounted, ref, onBeforeUnmount  } from "vue";
import { storeToRefs } from "pinia";
import { useCart, useSetting, useAuth, useCommonIsToggleFunctionality } from "@/stores";
import axiosInstance from "@/services/axiosService.js";
import {  NavSideBar } from "@/components";
import { vOnClickOutside } from '@vueuse/components'
const commonIsToggleFunctionality = useCommonIsToggleFunctionality();


// All Variable  Code Is Here.....................................................................................................
const auth                          = useAuth();
const { user, loading }             = storeToRefs(auth);
const setting                       = useSetting();
const cart                          = useCart();
const { cartItemCount, totalPrice } = storeToRefs(cart);
const searchData                    = ref([]);
const name                          = ref("");
const logo                          = ref("");
const primaryColor                  = ref("");
const secondaryColor                = ref("");
const faviconFile                   = ref("maxfit.png");
const gtmId                         = ref("GTM-TMP9GG8Q");
const headerTextOne                 = ref("");
const headerTextTwo                 = ref("");
const headerTextThree               = ref("");
const isDropdownOpen                = ref(false)
const fbPageUrl                     = ref('https://www.facebook.com/servicekeybd')
const phoneNumber                   = ref('01686381998')
const topHeaderText                 = ref('01686381998')


const getProducts = async () => {
  isDropdownOpen.value = true
  try {
    const res = await axiosInstance.get(
      `/products`,

      {
        params: {
          search_key: name.value,
          paginate_size: 5,
        },
      }
    );
    searchData.value = res.data.result.data;
  } catch (error) {
    console.log(error);
  }
};

const clearSearchBar = () => {
  name.value = "";
  isDropdownOpen.value = false
};

const getSettingsData = async () => {
  const settingData = await setting.getData();
      
  settingData?.data.map((ele) => {
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
  logo.value = settingData?.data[10];  
};


// get primary and secondary color start

const fetchPrimaryColor = () => {
  try {
    updateCSSVariable(primaryColor.value, secondaryColor.value);
  } catch (error) {
    console.error("Error fetching primary color:", error);
  }
};

const updateCSSVariable = (primaryColor, secondaryColor) => {
  document.documentElement.style.setProperty("--primary", primaryColor);
  document.documentElement.style.setProperty(
    "--secondary-color",
    secondaryColor
  );
  
};

// get primary and secendary color end
// get fav icons start

function changeFavicon() {
  // faviconFile.value = 'maxfit.png';

  // Prothome amra existing <link rel='icon'> element ta khujbo
  const favicon =
    document.querySelector("link[rel='icon']") ||
    document.createElement("link");
  favicon.rel = "icon";
  // Dynamically favicon-er path set korbo
  favicon.href = `/src/assets/f.png`;
  // Favicon tag jodi age theke na thake, tahole <head> section-e add korbo
  document.getElementsByTagName("head")[0].appendChild(favicon);
}

// get fav icons end

// Add Google Tag Manager Script start
// function addGTM() {
//     const gtmScript = document.createElement('script');
//     gtmScript.textContent = `
//         (function(w,d,s,l,i){
//         w[l]=w[l]||[];
//         w[l].push({'gtm.start':
//             new Date().getTime(),event:'gtm.js'});
//         var f=d.getElementsByTagName(s)[0],
//         j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
//         j.async=true;
//         j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
//         f.parentNode.insertBefore(j,f);
//         })(window,document,'script','dataLayer','${gtmId.value}');
//     `;
//     document.head.appendChild(gtmScript);
// }
// Add Google Tag Manager Script end

// logout function start

const logout = async () => {
  const res = await auth.logout();
  if (res.success) {
    router.push({ name: "homePage" });
    notify.Success("Logout Successfully Done");
  }
};

// logout function end

// sticky Header

// const stickyHeader = () => {
//   const mainHeaderNavSection = document.querySelector(".header-media-group");

//   window.addEventListener("scroll", () => {
//     const scrollTopWindow = window.pageYOffset;
//     const scrollScreenSize = window.screen.width;

//     if (scrollTopWindow > 80 && scrollScreenSize < 768) {
//       mainHeaderNavSection.classList.add("header-sticky-phone");
//     } else {
//       mainHeaderNavSection.classList.remove("header-sticky-phone");
//     }
//   });
// };

// sticky Header

// Opens dropdown
const openDropdown = () => {
  isDropdownOpen.value = true
}

// Closes dropdown when clicked outside
const onClickOutside = (event) => {
  if (!event.target.closest('.header-form')) {
    isDropdownOpen.value = false
  }
}

onBeforeUnmount(() => {
  document.removeEventListener('click', onClickOutside)
})

onMounted(() => {
  getSettingsData();
  fetchPrimaryColor();
  changeFavicon();
  // addGTM();
  document.addEventListener('click', onClickOutside)
  getLogo();
});
</script>

<template>
  <div class="header">

    <!--=====================================
                Nav SIDEBAR PART START
        =======================================-->
    <NavSideBar />
    <!--=====================================
                Nav SIDEBAR PART END
        =======================================-->

    <!-- <header class="header-part"> -->
      <div class="container-fluid">
        <div class="header-content">
          <div class="header-media-group">
            <button
              class="cate-btn"
              title="Category List"
              @click="commonIsToggleFunctionality.isNavSideBarOpenOrClose"
            >
              <i class="fas fa-list"></i>
            </button>
            <router-link :to="{ name: 'homePage' }">
              <img :src="logo?.value" alt="logo" />
            </router-link>
            <button title="Shop Page" class="header-cart-btn" @click="commonIsToggleFunctionality.isCartSideBartOpenOrClose">
              <i class="fas fa-shopping-cart"></i>
            </button>

            <!-- mobile user & wishlist code will be set here -->
          </div>
          <router-link :to="{ name: 'homePage' }" class="header-logo">
            <img :src="logo?.value" alt="logo"  />
          </router-link>
         
         
          <form class="header-form active" @click.stop="openDropdown">
            <input
              type="search"
              placeholder="Search anything..."
              v-model="name"
              @input="getProducts"
            />
            <button type="submit">
              <i class="fas fa-search"></i>
            </button>
            <ul class="search-data" v-if="name !== '' && isDropdownOpen">
              <li v-for="(product, index) in searchData" :key="index">
                <router-link
                  :to="{
                    name: 'productDetailsPage',
                    params: { slug: product.slug },
                  }"
                  @click="clearSearchBar"
                  class="product-info"
                >
                  <div class="row search-row">
                    <div class="col-md-1 col-sm-2 search-img">
                      <img
                        :src="product.image"
                        alt=""
                        style="border-radius: 5px; width: 35px"
                      />
                    </div>
                    <div class="col-md-7 col-sm-5 search-details">
                      <p style="color: #000; margin: 0; line-height: 1.2">
                        {{ product.name }}
                      </p>
                      <span style="font-size: 12px">
                        <span style="color: #000; font-weight: 500">Category: </span>
                        {{ product.category.name }}
                      </span>
                    </div>
                    <div class="col-md-4 col-sm-5 search-price">
                      <p>
                        <span
                          v-if="product.offer_percent !== 0"
                          class="featured_label"
                        >{{ Math.floor(product.offer_percent) }}% Off</span>
                      </p>
                      <div>
                        <span
                          class="product-price"
                          v-if="product.mrp !== 0"
                          style="font-weight: 400"
                        >
                          <del v-if="product.offer_price !== 0">{{ product.mrp }} tk</del>
                          <span>
                            {{
                              product.offer_price !== 0
                                ? product.offer_price
                                : product.mrp
                            }} tk
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </router-link>
              </li>
            </ul>
          </form>

          <!-- user & wishlist code will be set here -->

          <div class="header-widget-group"  @click="commonIsToggleFunctionality.isCartSideBartOpenOrClose">
            <button class="header-widget header-cart " title="Cartlist">
              <i class="fas fa-shopping-cart"></i>
              <sup>{{ cartItemCount }}+</sup>
              <span>total price<small>{{ $filters.currencySymbol(totalPrice) }}</small></span>
            </button>
          </div>
        </div>
      </div>
    <!-- </header> -->
  </div>
</template>

<style>


@media (max-width: 768px) {
  .header {
    position: sticky;
    top: 0;
    z-index: 1000;
    width: 100%;
    background: white;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px;
  }
}

.header-form {
  width: 35%; /* বা 30% ও দিতে পারো */
  max-width: 1000px; /* চাইলে একটা max-width দিতে পারো */
  min-width: 200px;
  position: relative;
  background-color: #fff;
  border-radius: 5px;
  display: flex;
  align-items: center;
  padding: 4px 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header{
  background: var(--primary);
}

.header-left-text{
  text-transform: uppercase;
}
.header-widget span {
  color: var(--white);
}

.header-cart-btn{
  line-height: 20px;
}

.header-cart-btn i {
  color: var(--white);
  font-size: 20px;
}
.header-cart-btn p {
  font-size: 14px;
}

.social-icons-Ntext a:hover, .social-icons-Ntext span:hover {
  color: var(--secondary-color);
  cursor: pointer;
}
.social-icons-Ntext a{
  color: var(--white);
  cursor: pointer;
}



.cate-btn {
  color: var(--white);
  font-size: 25px;
}

.form-style {
  padding: 3px 10px;
  margin-left: 10px;
  background: #fff;
  border: 1px solid #fff;
  border-radius: 5px;
}
.search-data {
  position: absolute;
  width: 100%;
  z-index: 9;
  top: 52px;
  left: 0;
  background-color: #f5f5f5;
  border-radius: 10px;
  border-bottom: 2px;
}
.product-info {
  display: block;
  padding: 10px 10px;
}
.search-data li {
  border-top: 1px solid rgb(220, 221, 220);
  position: relative;
  overflow: hidden !important;
}

.search-data li:first-child {
  border-top: none; /* Remove the top border from the first li */
}
.featured_label {
  float: right;
  margin: -2px -48px 0 0;
  background-color: var(--primary);
  color: var(--white);
  padding: 0 40px;
  font-size: 13px;
  top: 0;
  right: 0;
  transform: rotate(40deg);
}
@media screen and (max-width: 768px) {
  
  .header-top p{
    font-size: 12px !important;
  }
  .dropdown-position-list-right {
    top: 96px !important;
    right: 6% !important;
  }
}

@media (max-width: 767px) {
  .product-price {
    font-size: 13px;
  }
  .search-details p {
    font-size: 14px;
  }
}

@media (max-width: 575px) {
  .search-img img {
    max-width: 100%;
  }
  .search-price {
    position: relative;
  }
  .search-img {
    width: 15%;
  }
  .search-details {
    width: 40%;
  }
  .search-price {
    width: 40%;
  }
  .featured_label {
    display: none;
  }

  .header-sticky-phone {
    z-index: 99999;
    position: fixed;
    background-color: rgb(255, 255, 255);
    top: 0;
    padding: 3px 15px; 
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }

  .dropdown-position-list-right {
    top: 96px !important;
    right: 6% !important;
  }
}
@media (max-width: 450px) {
  .search-img {
    width: 20%;
  }
  .search-details {
    width: 50%;
  }
  .search-price {
    width: 30%;
  }
  .search-price del {
    display: none;
  }
  .featured_label {
    margin: 0;
    position: absolute;
    top: 0;
    right: -37px;
  }
  .search-row > * {
    width: inherit !important;
  }
}

@media (max-width: 375px) {
  .header-top p{
    font-size: 12px !important;
  }
}

@media (max-width: 320px) {
  .header-top p{
    font-size: 11px !important;
  }
}
</style>
