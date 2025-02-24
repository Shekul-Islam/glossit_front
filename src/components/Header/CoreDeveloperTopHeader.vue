<script setup>
// All Import File  Code Is Here......................................................................................................
import { vOnClickOutside } from '@vueuse/components'
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useCart, useSetting, useAuth, useCommonIsToggleFunctionality } from "@/stores";
import axiosInstance from "@/services/axiosService.js";
import { NavSideBar } from "@/components";


// All Variable  Code Is Here.....................................................................................................
const commonIsToggleFunctionality = useCommonIsToggleFunctionality();
const { cartSideBar } = storeToRefs(commonIsToggleFunctionality);
const auth = useAuth();
const { user, loading } = storeToRefs(auth);
const setting = useSetting();
const cart = useCart();
const { cartItemCount, totalPrice } = storeToRefs(cart);
const searchData = ref([]);
const name = ref("");
const logo = ref("");
const primaryColor = ref("#2f5597");
const secondaryColor = ref("#ffb500");
const faviconFile = ref("maxfit.png");
const gtmId = ref("GTM-TMP9GG8Q");
const topHeaderText = ref("");
const headerTextOne = ref("");
const headerTextTwo = ref("");
const headerTextThree = ref("");
const isNavTrue = ref(false);


const getProducts = async () => {
  try {
    const res = await axiosInstance.get(
      `/products`,

      {
        params: {
          name: name.value,
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
};

const getSettingsData = async () => {
  const settingData = await setting.getData('key', 1);

  settingData.data.map((ele) => {
    console.log(settingData);
    
    if (ele.key == "header_logo") {
      logo.value = ele;
      
    }

    // if (ele.key == "primary_color") {
    //   primaryColor.value = ele;
    // }
    // if (ele.key == "secondary_color") {
    //   secondaryColor.value = ele;
    // }
    if (ele.key == "favicon_icon") {
      faviconFile.value = ele.value;
    }
    if (ele.key == "top_header_text"){
      topHeaderText.value = ele
    }
    if (ele.key == "header_text_one") {
      headerTextOne.value = ele.value;
    }
    if (ele.key == "header_text_two") {
      headerTextTwo.value = ele.value;
    }
    if (ele.key == "header_text_three") {
      headerTextThree.value = ele.value;
    }
  });
};
//========================================
//        CATEGORY SIDEBAR FUNCTION
//========================================
function categorySideBar() {
  $(".category-sidebar").addClass("active");
  $(".category-close").on("click", function () {
    $(".category-sidebar").removeClass("active");
    $(".backdrop").fadeOut();
  });
}

//========================================
//        Nav SIDEBAR FUNCTION
//========================================
function navSideBar() {
  $(".nav-sidebar").addClass("active");
  $(".nav-close").on("click", function () {
    $(".nav-sidebar").removeClass("active");
    $(".backdrop").fadeOut();
  });
}
//========================================
//       RESPONSIVE SEARCH BAR
//========================================

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

const stickyHeader = () => {
  const mainHeaderNavSection = document.querySelector(".header-media-group");

  window.addEventListener("scroll", () => {
    const scrollTopWindow = window.pageYOffset;
    const scrollScreenSize = window.screen.width;

    if (scrollTopWindow > 80 && scrollScreenSize < 768) {
      mainHeaderNavSection.classList.add("header-sticky-phone");
    } else {
      mainHeaderNavSection.classList.remove("header-sticky-phone");
    }
  });
};

// sticky Header

onMounted(() => {
  getSettingsData();
  fetchPrimaryColor();
  changeFavicon();
  // addGTM();
  stickyHeader();
});
</script>

<template>
  <div>

    <!--=====================================
                Nav SIDEBAR PART START
        =======================================-->
    <NavSideBar />
    <!--=====================================
                Nav SIDEBAR PART END
        =======================================-->

    <!-- <div
      class="marqueTag header-top"
      v-if="headerTextOne || headerTextTwo || headerTextThree || topHeaderText"
    >
      <div class="container d-flex justify-content-between">
        <marquee behavior="" direction="">
          <span>{{ headerTextOne }}</span>
          <span>{{ headerTextTwo }}</span>
          <span>{{ headerTextThree }}</span>
        </marquee>
      </div>
    </div>

    <header class="header-part">
      <div class="container">
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

            <div class="mobile-header-menu dropdown-right">
              <button class="header-src">
                <i class="fas fa-user me-2"></i>
              </button>
              <button class="header-src"><i class="fas fa-heart"></i></button>
              <ul class="dropdown-position-list-right" v-if="user.user">
                <li>
                  <router-link :to="{ name: 'Profile' }">Profile</router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'OrderList' }"
                    >My Order</router-link
                  >
                </li>
                <li>
                  <a href="" @click.prevent="logout()"
                    >Logout<span
                      v-show="loading"
                      class="spinner-border spinner-border-sm mr-1"
                    ></span
                  ></a>
                </li>
              </ul>
              <ul class="dropdown-position-list-right" v-else>
                <li>
                  <router-link :to="{ name: 'Login' }">login</router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'Registration' }"
                    >register</router-link
                  >
                </li>
              </ul>
            </div>
          
          </div>
          <router-link :to="{ name: 'homePage' }" class="header-logo">
            <img :src="logo?.value" alt="logo" />
          </router-link>

          <form class="header-form active">
            <input
              type="search"
              placeholder="Search anything..."
              v-model="name"
              @input="getProducts()"
            />
            <button type="submit">
              <i class="fas fa-search"></i>
            </button>
            <ul class="search-data" v-if="name != ''">
              <li v-for="(product, index) in searchData" :key="index">
                <router-link
                  :to="{
                    name: 'productDetailsPage',
                    params: { id: product.id, slug: product.slug },
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
                      <span style="font-size: 12px"
                        ><span style="color: #000; font-weight: 500"
                          >Category :
                        </span>
                        {{ product.category.name }}</span
                      >
                    </div>
                    <div class="col-md-4 col-sm-5 search-price">
                      <p>
                        <span
                          v-if="product.offer_percent != 0"
                          class="featured_label"
                          >{{ Math.floor(product.offer_percent) }}% Off</span
                        >
                      </p>
                      <div>
                        <span
                          class="product-price"
                          v-if="product.mrp != 0"
                          style="font-weight: 400"
                        >
                          <del v-if="product.offer_price != 0"
                            >{{ product.mrp }} tk
                          </del>
                          <span
                            >{{
                              product.offer_price != 0
                                ? product.offer_price
                                : product.mrp
                            }}
                            tk</span
                          >
                        </span>
                      </div>
                    </div>
                  </div>
                </router-link>
              </li>
            </ul>
          </form>

          <div class="header-widget-group dropdown">
            <button class="header-widget" title="User">
              <i class="fas fa-user"></i>
              <span></span>
            </button>
            <ul class="dropdown-position-list" v-if="user.user">
              <li>
                <router-link :to="{ name: 'Profile' }">Profile</router-link>
              </li>
              <li>
                <router-link :to="{ name: 'OrderList' }">My Order</router-link>
              </li>
              <li>
                <a href="" @click.prevent="logout()"
                  >Logout<span
                    v-show="loading"
                    class="spinner-border spinner-border-sm mr-1"
                  ></span
                ></a>
              </li>
            </ul>
            <ul class="dropdown-position-list" v-else>
              <li><router-link :to="{ name: 'Login' }">login</router-link></li>
              <li>
                <router-link :to="{ name: 'Registration' }"
                  >register</router-link
                >
              </li>
            </ul>
          </div>
          <div class="header-widget-group">
            <button class="header-widget" title="Wishlist">
              <i class="fas fa-heart"></i>
              <span></span>
            </button>
          </div>


          <div class="header-widget-group me-2">
            <a href="tel:+8801886096958" class="header-widget" title="Cartlist">
                <i class="fas fa-phone-alt"></i>
              <span>Call For More<small>01886096958</small></span>
            </a>
          </div>
          <div class="header-widget-group">
            <button class="header-widget header-cart cart-btn" title="Cartlist"  @click="commonIsToggleFunctionality.isCartSideBartOpenOrClose">
              <i class="fas fa-shopping-basket"></i>
              <sup>{{ cartItemCount }}+</sup>
              <span>total price<small>{{ $filters.currencySymbol(totalPrice) }}</small></span>
            </button>
          </div>
        </div>
      </div>
    </header> -->
  </div>
</template>

<style>
/* mobile user menu dropdown*/
.dropdown-right:hover .dropdown-position-list-right {
  visibility: visible;
  opacity: 1;
}

.dropdown-position-list-right {
  position: absolute;
  top: 100px;
  right: 15%;
  z-index: 2;
  width: 115px;
  height: auto;
  visibility: hidden;
  opacity: 0;
  padding: 10px;
  border-radius: 8px;
  background: var(--white);
  border: 1px solid var(--border);
  -webkit-box-shadow: 0px 15px 35px 0px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 15px 35px 0px rgba(0, 0, 0, 0.1);
  transition: all linear 0.3s;
  -webkit-transition: all linear 0.3s;
  -moz-transition: all linear 0.3s;
  -ms-transition: all linear 0.3s;
  -o-transition: all linear 0.3s;
}

.dropdown-position-list-right li a {
  color: black;
}

/* mobile user menu dropdown*/

.marqueTag {
  background-color: var(--primary);
  color: var(--white);
  font-weight: 600;
  padding: 5px;
}

.marqueTag marquee span {
  display: inline-block;
  margin-right: 200px;
}

.cate-btn {
  font-size: 25px;
}

.header-form {
    position: relative;
    color: var(--primary) !important;
    font-weight: 700 !important;
    border: 2px solid var(--primary-color) !important;
    border-radius: 8px !important;
    background-color: var(--white) !important;
}
.header-form:focus {
    border-top: 4px solid var(--secondary-color) !important;
    border-left: 4px solid var(--secondary-color) ! important;
    border-bottom: 1px solid var(--secondary-color) !important;
    border-right: 1px solid var(--secondary-color) !important;
    background-color: var(--white) !important;
}

@media screen and (max-width: 767px) {
  .header-form {
    border-top: 2px solid var(--primary) !important;
    border-left: 2px solid var(--primary) ! important;
  }
  .header-form:focus {
      border-top: 2px solid var(--secondary-color) !important;
      border-left: 2px solid var(--secondary-color) ! important;
  }
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
@media (max-width: 767px) {
  .product-price {
    font-size: 13px;
  }
  .search-details p {
    font-size: 14px;
  }
}
@media (max-width: 768px) {
  .dropdown-position-list-right {
    top: 96px !important;
    right: 6% !important;
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
    border-radius: 0 0 10px 10px;
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
@media (max-width: 350px) {
  .header-sticky-phone {
    padding: 3px 35px; 
  }
}
</style>
