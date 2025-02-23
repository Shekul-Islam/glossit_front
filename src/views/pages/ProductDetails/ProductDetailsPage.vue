<script setup>
import SingleProductPageSkeleton from '../../../components/skeleton/SingleProductPageSkeleton.vue'
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import BeatLoader from "vue-spinner/src/BeatLoader.vue";
import {
  useProduct,
  useCart,
  useNotification,
  useShop,
  useSetting,
} from "@/stores";
import { storeToRefs } from "pinia";
import {
  BannerPart,
  ProductCard,
  ProductView,
  ProductVariation,
  ProductImage,
  ProductDetails,
} from "@/components";
import { mrpOrOfferPrice, addToCart } from "@/composables";
import axiosInstance from "@/services/axiosService.js";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Import required modules
import { Pagination, Autoplay, Navigation } from "swiper/modules";

const emit = defineEmits(['productVariationPrice', 'productVariationData', 'activeBtns']);
const modules       = ref([Pagination, Autoplay, Navigation]);
const product       = useProduct();
const singleProduct = ref("");
const sizeName      = ref("");
const productPrices = ref("");
const route         = useRoute();
const shop          = useShop();
const cart          = useCart();
const { loading }   = storeToRefs(cart);
const isloading     = ref(loading);
const notify        = useNotification();
const price         = ref();
const quantityInput = ref(1);
const categoryId    = ref([]);
const setting       = useSetting();
const { productById } = storeToRefs(product);




// product variations start
const productVariations     = ref([]);
const activeBtns            = ref(false);
const productVariationPrice = ref();
const productVariationData  = ref();
// product variations end

// Setting data start
const websiteUrl            = ref("");
const phone                 = ref("");
const whatsapp              = ref("");
const messengerId           = ref("");
const whatsappText          = ref("");
const phoneText             = ref("");
// Setting data end
// related product start
const type = ref(""); 
const relatedProducts = ref("");
const socialShares          = ref("");
const selectedSize = ref();
// related product end

const alertTimeout = ref("");

// get products start
const productByid = async () => {
  singleProduct.value = await product.productById(route.params.slug);
  productVariations.value = singleProduct.value?.variations?.attributes;
  categoryId.value.push(singleProduct.value?.category?.id);
};
// get products end

// product prices start
const handleProductVariationPrice = (data) => {
  productVariationPrice.value = data[0]  
}
// product prices end

// product prices start
const handleProductVariationData = (data) => {
  productVariationData.value = data
}
// product prices end

// product prices start
const handleActiveBtns = (data) => {
  activeBtns.value = data  
}
// product prices end


// setting data start
const getSettingsData = async () => {
  const settingData = await setting.getData();
  settingData.data.map((ele) => {
    if (ele.key == "phone_number") {
      phone.value = ele;
    }
    if (ele.key == "phone_text") {
      phoneText.value = ele;
    }
    if (ele.key == "whatsapp_number") {
      whatsapp.value = ele;
    }
    if (ele.key == "whatsapp_text") {
      whatsappText.value = ele;      
    }
    if (ele.key == "website_url") {
      websiteUrl.value = ele;
    }
    if (ele.key == "messenger_id") {
      messengerId.value = ele;
    }
  });
};
// setting data end

// social media link  start

const socialMedia = async () => {
  try {
    const res = await axiosInstance.get("/social-medias");
    socialShares.value = res.data.result;
  } catch (error) {
    console.log(error);
  }
};

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
    Phone: `tel:${socialUrl}`,
  };
  return iconMapping[socialType] || "default-icon-class";
};

const getEmbedUrl = (url) => {
  if (!url) return "";
  const videoIdMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
  return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : "";
};


const incrementCartItem = () => {
  quantityInput.value = parseInt(quantityInput.value) + 1;
};
const decrementCartItem = () => {
  if (quantityInput.value != 1) {
    quantityInput.value = parseInt(quantityInput.value) - 1;
  }
};


const getPrices = async (sizeI, name) => {
  try {
    const res = await axiosInstance.get(`/products/${route.params.id}/${sizeI}`);
    selectedSize.value = sizeI;
    productPrices.value = res.data.result;
  } catch (error) {
    console.log(error);
  }  
  sizeName.value = name;
  console.log(selectedSize.value);

};


// product counter  start
const startDate = ref("");
const productTimer = ref(true);
const date = new Date();
const year = date.getFullYear();
const month = (date.getMonth() + 1).toString().padStart(2, '0');
const day = date.getDate().toString().padStart(2, '0');
const hours = date.getHours().toString().padStart(2, '0');
const minutes = date.getMinutes().toString().padStart(2, '0');
const seconds = date.getSeconds().toString().padStart(2, '0');

startDate.value = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
// product counter end

// product counter start

const time = {
  days: ref(0),
  hours: ref(0),
  minutes: ref(0),
  seconds: ref(0),
};

let timer = null;

const padSingleDigit = (num) => {
  return num < 10 ? `0${num}` : `${num}`;
}

// Function to parse startDate if it's in a non-standard format
const parseStartDate = (startDate) => {
  const parts = startDate.split(/[- :]/);
  return new Date(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5]);
};


const startCountdown = (startDate, endDate) => {
    //end Date
  const targetDate = new Date(endDate).getTime();

    const parsedStartDate = parseStartDate(startDate);

    timer = setInterval(() => {
    //Start Date
    const now = new Date().getTime();
    const distance = targetDate - now;

     const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update values with padded single digits without quotes
    time.days.value = padSingleDigit(days);
    time.hours.value = padSingleDigit(hours);
    time.minutes.value = padSingleDigit(minutes);
    time.seconds.value = padSingleDigit(seconds);

    if (distance < 0) {
      clearInterval(timer);
      time.days.value = '00';
      time.hours.value = '00';
      time.minutes.value = '00';
      time.seconds.value = '00';

       productTimer.value = false;
    }
  }, 1000);
};

// product counter end


// footer navbar Start

const stickyFooter = () => {
  const innerSection = document.querySelector(".inner-section");
  const mainFooterNavSection = document.querySelector(
    ".main-footer-nav-section"
  );

  window.addEventListener("scroll", () => {
    const scrollTopWindow = window.pageYOffset;
    if (scrollTopWindow > 80) {
      mainFooterNavSection.style.bottom = "0px";
      mainFooterNavSection.style.transition = "all .5s ease";
      mainFooterNavSection.style.opacity = "1";
    } else {
      mainFooterNavSection.style.bottom = "-115px";
      mainFooterNavSection.style.transition = "all .5s ease";
      mainFooterNavSection.style.opacity = "0";
    }
  });

  if (innerSection) {
    innerSection.addEventListener("scroll", () => {
      const scrollTopInnerSection = innerSection.scrollTop;
      if (scrollTopInnerSection > 80) {
        mainFooterNavSection.style.bottom = "0px";
        mainFooterNavSection.style.transition = "all .5s ease";
        mainFooterNavSection.style.opacity = "1";
      } else {
        mainFooterNavSection.style.bottom = "-115px";
        mainFooterNavSection.style.transition = "all .5s ease";
        mainFooterNavSection.style.opacity = "0";
      }
    });
  }
};

// footer navbar end




// Related product  start
  const getRelatedProductData = async (catId) => {
    let type = [];
    let brand = [];
    let subCategory = [];
    let attributeIds = [];
    let price = [];
    let search = "";
    let paginateSize = 8;
    const res = await shop.getData(type, brand, catId, subCategory, attributeIds, price, search, paginateSize);
    console.log(res);
    
    relatedProducts.value = res.data;
  };

// product changes function 

// product detials changes start
  watch(() => route.params.slug, (newValue, oldValue) => {
    productByid();
  });
// product detials changes end
  watch(
    categoryId,
    (newValue, oldValue) => {
      getRelatedProductData(newValue);
    },
    { deep: true }
  );

// Related product end


onMounted(() => {
  getSettingsData();
  stickyFooter();
  productByid();
  const endDate = '2025-02-20 23:59:59'; // তোমার নির্দিষ্ট static endDate
  startCountdown(startDate.value, endDate);
});

</script>

<template>
  <div>
    <section class="inner-section " v-if="singleProduct">
      <div class="container">
       <div class="img-showcase">
        <div  class="image">
            <ProductImage :singleProduct="singleProduct" :type="'details'" />
          </div>
       </div>
  
      <div class="details-content" >
        <div class="col-lg-12 price-details">
          <div  :class="`${type}-content`">
          <h3 :class="`${type}-name`">
            <a href="#">{{ singleProduct?.name }}</a>
          </h3>

            <!-- Price Section start -->
            <!-- Product Variation Price Section start -->
            <span v-if="singleProduct?.variations?.data.length > 0">
              <h3 :class="`${type}-price my-2`" v-if="productVariationPrice == '' || productVariationPrice == undefined">
                <span v-if="singleProduct.variation_price_range.min_price == singleProduct.variation_price_range.max_price">{{ $filters.currencySymbol( singleProduct.variation_price_range.min_price || singleProduct.variation_price_range.max_price ) }}</span>
                <span v-else>{{ $filters.currencySymbol( singleProduct.variation_price_range.min_price ) }} - {{ $filters.currencySymbol( singleProduct.variation_price_range.max_price ) }}</span>
              </h3>
              <h3 :class="`${type}-price my-2`" v-else>
                <span>{{
                  $filters.currencySymbol(productVariationPrice?.sell_price)
                }}</span>
              </h3>
            </span>
            <!-- Product Variation Price Section end -->

            <!-- Price Section start -->
            <span v-else>
              <h3 :class="`${type}-price`">
                <del>{{ $filters.currencySymbol(singleProduct.mrp) }}</del>
                <span>{{ $filters.currencySymbol( mrpOrOfferPrice( singleProduct.mrp, singleProduct.offer_price ))}}</span>
                <a class="discout_amount" v-if="singleProduct.offer_price != 0" >Save {{ Math.round(singleProduct.mrp - singleProduct.offer_price) }}৳</a >
              </h3>
            </span>
            <!-- Price Section end -->
          
            <div :class="`${type}-meta`">
              <p v-if="singleProduct?.sku">SKU:<span>{{ singleProduct?.sku }}</span></p>
              <p v-if="singleProduct?.brand">
                BRAND:<a href="#">{{ singleProduct?.brand?.name }}</a>
              </p>
            </div>
            <div :class="`${type}-meta`">
              <p v-if="singleProduct?.category">
                Category:<a href="#">{{ singleProduct?.category?.name }}</a>
              </p>
              <p v-if="singleProduct?.sub_category">
                Sub Category:<a href="#">{{
                  singleProduct?.sub_category?.name
                }}</a>
              </p>
            </div>
          
            <!-- <p
              :class="`${type}-desc mt-2`" 
              v-if="singleProduct.short_description"
            >Quick Overview :</p>
            <p
              :class="`${type}-desc mt-2`"
              v-if="singleProduct.short_description"
              v-html="singleProduct.short_description"
            ></p> -->
          
            <!-- Product Variation Price Section start -->
          
            <ProductVariation :productVariations="productVariations" :allVariations="singleProduct?.variations?.data" @productVariationPrice="handleProductVariationPrice" @productVariationData="handleProductVariationData" @activeBtns="handleActiveBtns"  />
          
            <!-- Product Variation Price Section end -->
          
            <div :class="`${type}-list-group`" v-if="singleProduct?.video_url">
              <div class="videoHW">
                <iframe class="mt-5"  :src="getEmbedUrl(singleProduct?.video_url)" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>              
              </div>
            </div>
          
            <div :class="`${type}-list-group`">
              <label
              :class="`${type}-list-title`"
                v-show="socialShares?.data?.length > 0"
                >Share:</label
              >
              <ul :class="`${type}-share-list`">
                <li
                  v-for="(socialShare, index) in socialShares?.data"
                  :key="index"
                >
                  <a
                    :href="socialURL(socialShare.title, socialShare.link)"
                    target="_blank"
                    title=""
                    ><i :class="socialIcons(socialShare.title)"></i
                  ></a>
                </li>
              </ul>
          </div>
        </div>
        </div>  

            <div class="col-lg-12 mt-3">
              <!-- <div class="details-list-group">
                <label class="details-list-title" v-show="socialShares.length > 0"
                  >Share:</label
                >
                <ul class="details-share-list">
                  <li v-for="(socialShare, index) in socialShares" :key="index">
                    <a :href="socialURL(socialShare.type, socialShare.contact)" target="_blank" title=""
                      ><i :class="socialIcons(socialShare.type)"></i
                    ></a>
                  </li>
                </ul>
              </div> -->

              <div class="d-md-flex align-items-center m-auto mt-3 mt-lg-0" data-countdown="2021/12/31" v-if="productTimer">
                  <span class="couter-span-tag d-flex justify-content-center">এই অফারটি শেষ হতে বাকী আর মাত্র  </span>
                    <div class="d-flex justify-content-center my-4">
                      <span class="countdown-time"><span>{{ time.days.value }}</span><small>দিন</small></span>
                      <span class="countdown-time"><span>{{ time.hours.value }}</span><small>ঘন্টা</small></span>
                      <span class="countdown-time"><span>{{ time.minutes.value }}</span><small>মিনিট</small></span>
                      <span class="countdown-time"><span>{{ time.seconds.value }}</span><small>সেকেন্ড</small></span>
                    </div>
              </div>
    
              
              <div class="details-add-group" v-if="singleProduct?.variations?.data.length > 0">
                <div class="row">
                  <span
                    class=" d-block text-center text-danger"
                    v-if="productPrices == null"
                    >প্রথমে কোয়ানটিটি সিলেক্ট করুন তারপর<span class="fw-bold">অর্ডার করুন</span> বাটনে ক্লিক করুন অথবা<span class="fw-bold">কার্টে যোগ করুন</span>বাটনে ক্লিক করুন </span
                  >
                  <div class="col-md-3 col-sm-4 mt-2">
                    <div class="quentyDefaultClass" :class="{ 'quantity-disabled': activeBtns === false && singleProduct?.variations?.data.length > 0, } " >
                      <button class="minus" :disabled=" activeBtns === false && 
                        singleProduct?.variations?.data.length > 0"
                        aria-label="Decrease" @click.prevent="decrementCartItem">
                        &minus;
                      </button>
                      
                      <input class="action-input text-center" :class="selectedSize == null ? 'disabled' : ''"
                        title="Quantity Number" type="text" name="quantity" v-model="quantityInput"/>

                      <button class="plus" :disabled=" activeBtns === false && singleProduct?.variations?.data.length > 0"
                        aria-label="Increase" @click.prevent="incrementCartItem">
                        &plus;
                      </button>
                    </div>
                  </div>

                  <div class="col-md-3 col-sm-6 mt-2 add-to-cart" >
                    <button
                      class="product-add"
                      title="Add to Cart"
                      :disabled="activeBtns === false && selectedSize == null ? true : false"
                      :class="selectedSize == null ? 'disabled' : ''"
                      @click.prevent="addToCart(singleProduct, quantityInput, productVariationData, productVariationPrice, campaignSlug)"
                    >
                      <template v-if="isloading">
                        <beat-loader
                          :loading="loading"
                          :color="color"
                          :size="size"
                        ></beat-loader>
                      </template>
                      <template v-else><i class="fas fa-shopping-basket"></i></template>
                      <span>কার্টে যোগ করুন</span>
                    </button>
                  </div>
                 

                  <div class="col-md-6 mt-2" v-if="activeBtns === false">
                    <router-link
                      :to="{ name: 'checkoutPage' }"
                      :disabled="productPrices == null ? true : false"
                      class="product-add bg-warning text-dark main-order-btn"
                      @click.prevent="addToCart(singleProduct, quantityInput, productVariationData, productVariationPrice, campaignSlug); modalClose()"
                       :class="{ 'singleProductBtn ': activeBtns === false }"
                    >
                      <i class="fas fa-shopping-basket fs-4"></i>
                      <span class="order-btn">অর্ডার করুন</span>
                    </router-link>
                  </div>
                  
                  <div class="col-md-6 mt-2" v-else>
                    <router-link
                      :to="{ name: 'checkoutPage' }"
                      class="product-add bg-warning text-dark main-order-btn"
                      @click.prevent="addToCart(singleProduct, quantityInput, productVariationData, productVariationPrice, campaignSlug); modalClose()"
                      :class="selectedSize == null ? 'disabled' : ''"
                    >
                      <i class="fas fa-shopping-basket fs-4"></i>
                      <span class="order-btn">অর্ডার করুন</span>
                    </router-link>
                  </div>
                 
                </div>
                
                <div class="row mt-lg-3 mt-0">
                  <div class="col-md-6 mt-2">
                    <a class="product-add bg-success" :href="socialURL('Whatsapp', whatsapp?.value)" target="_blank" ><span> <i class="fab fa-whatsapp" style="font-size:18px"></i> <span class="fw-bold"> {{whatsapp?.value}}</span></span></a>
                  </div>
                  <div class="col-md-6 mt-2">
                    <a class="product-add bg-success" :href="socialURL('Phone', phone?.value)" target="_blank" ><span>হট লাইন নাম্বার : <span class="fw-bold"> {{phone?.value}}</span></span></a>
                  </div>
                </div>
              </div>

              <div class="details-add-group" v-else>
                <div class="row">
                  <div class="col-md-3 mt-2">
                    <div class="quentyDefaultClass">

                      <button class="minus" :disabled=" activeBtns === false && singleProduct?.variations?.data.length > 0 "
                        aria-label="Decrease" @click.prevent="decrementCartItem">
                        &minus;
                      </button>

                      <input class="action-input text-center" title="Quantity Number" type="text" name="quantity" v-model="quantityInput"/>

                      <button
                        class="plus"
                        :disabled="
                          activeBtns === false &&
                          singleProduct?.variations?.data.length > 0
                        "
                        aria-label="Increase"
                        @click.prevent="incrementCartItem"
                      >
                        &plus;
                      </button>
                    </div>
                  </div>

                  <div class="col-md-3 mt-2 add-to-cart">
                    <button
                      class="product-add"
                      title="Add to Cart"
                      @click.prevent="addToCart(singleProduct, quantityInput)"
                    >
                      <template v-if="isloading">
                        <beat-loader
                          :loading="loading"
                          :color="color"
                          :size="size"
                        ></beat-loader>
                      </template>
                      <template v-else><i class="fas fa-shopping-basket"></i></template>
                      <span>কার্টে যোগ করুন</span>
                    </button>
                  </div>


                  <div class="col-md-6 mt-2">
                    <router-link
                      :to="{ name: 'checkoutPage' }"
                      class="product-add bg-warning text-dark main-order-btn"
                      title="Add to Cart"
                      @click.prevent="addToCart(singleProduct, quantityInput)"
                    >
                      <i class="fas fa-shopping-basket"></i>
                      <span class="order-btn">অর্ডার করুন</span>
                    </router-link>
                  </div>
                </div>

                <div class="row mt-lg-3 mt-0">
                <div class="col-md-6 mt-2">
                  <a class="product-add bg-success" :href="socialURL('Whatsapp', whatsapp?.value)" target="_blank" ><span>{{whatsappText?.value}} <i class="fab fa-whatsapp" style="font-size:18px"></i> <span class="fw-bold"> {{whatsapp?.value}}</span></span></a>
                </div>
                <div class="col-md-6 mt-2">
                  <a class="product-add bg-success" :href="socialURL('Phone', phone?.value)" ><span>হট লাইন নাম্বার : <span class="fw-bold"> {{phone?.value}}</span></span></a>
                </div>
              </div>

              </div>
            </div>
          </div>

      </div>
    </section>
    <section class="inner-section mt-4" v-else>
      <div class="container">
        <SingleProductPageSkeleton />
      </div>
    </section>

    <!-- description feild  -->


    <section class="inner-section">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <ul class="nav nav-tabs">
              <li v-if="singleProduct?.description">
                <a href="#tab-desc" class="tab-link active" data-bs-toggle="tab"
                  >descriptions</a
                >
              </li>
              <li>
                <a href="#tab-spec" class="tab-link" data-bs-toggle="tab"
                  >Specifications</a
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="tab-pane fade show active" id="tab-desc">
          <div class="row">
            <div class="col-lg-12 order-lg-1 order-2" v-if="singleProduct?.description">
              <div class="product-details-frame">
                <div class="tab-descrip text-dark" v-html="singleProduct?.description"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="tab-pane fade" id="tab-spec">
          <div class="row">
            <div class="col-lg-12">
              <div class="product-details-frame">
                <table class="table table-bordered">
                  <tbody>
                    <tr v-if="singleProduct?.sku">
                      <th scope="row">Product code</th>
                      <td>SKU: {{ singleProduct?.sku }}</td>
                    </tr>
                    <tr v-if="singleProduct?.category">
                      <th scope="row">Category</th>
                      <td>{{ singleProduct?.category?.name }}</td>
                    </tr>
                    <tr v-if="singleProduct?.brand">
                      <th scope="row">Brand</th>
                      <td>{{ singleProduct?.brand?.name }}</td>
                    </tr>
                    <tr v-if="singleProduct?.type">
                      <th scope="row">Type</th>
                      <td>{{ singleProduct?.type }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    

    <!-- Cross Sell Product -->

    <section class="inner-section mt-5" v-if="singleProduct && singleProduct?.up_sell_products.length > 0">
      <div class="container">
        <div class="row">
          <div class="col">
            <div class="section-heading">
              <h2><span class="section-header-text">Special For You</span></h2>
              <div class="heading-line"></div>
            </div>
          </div>
        </div>
        <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
          <div
            class="col"
            v-for="(upSellProducts, index) in singleProduct?.up_sell_products"
            :key="index"
          >
            <ProductCard :product="upSellProducts" />
          </div>
        </div>
      </div>
    </section>

    <!-- Cross Sell Product -->
    
   
    <!-- Related Product -->
    <section class="inner-section mt-3 mb-4" v-if="relatedProducts.length > 0">
      <div class="container">
        <div class="row">
          <div class="col">
            <div class="section-heading">
              <h2><span class="section-header-text">Related Product</span></h2>
              <div class="heading-line"></div>
            </div>
          </div>
        </div>
        <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
          <div
            class="col"
            v-for="(relatedProduct, index) in relatedProducts"
            :key="index"
          >
            <ProductCard :product="relatedProduct"/>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <div class="section-btn-25">
              <router-link
                :to="{ name: 'shopPage', query: { category: categoryId } }"
                class="btn btn-outline"
              >
                <i class="fas fa-eye"></i>
                <span>view all related</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Related Product -->

    <!-- Sticky Footer Start -->
    <div class="main-footer-nav-section">
      <div class="container">
        <div class="row">
          <div class="col-lg-5 col-md-4">
            <div class="footer-nav-left">
              <img :src="singleProduct?.image" alt="" />
              <p>{{ singleProduct?.name }}</p>
            </div>
          </div>
          <div class="col-lg-7 col-md-8 d-flex align-center main-nav-footer">
            <div class="footer-nav-right">
              <div
                class="price me-2"
                v-if="singleProduct?.variations?.data.length > 0"
              >
                <span class="footer-price" v-if="productVariationPrice?.sell_price"> {{ $filters.currencySymbol(productVariationPrice?.sell_price) }} </span>
              </div>
              <div class="price me-2" v-else>
                <h3 class="details-price">
                  <del>{{ $filters.currencySymbol(singleProduct?.mrp) }}</del>
                  <span>{{
                    $filters.currencySymbol(
                      mrpOrOfferPrice(
                        singleProduct?.mrp,
                        singleProduct?.offer_price
                      )
                    )
                  }}</span>
                </h3>
              </div>

              <div class="quantity" :class="{'quantity-disabled': activeBtns === false &&
                singleProduct?.variations?.data.length > 0, } " >
                <button 
                  class="minus" :disabled=" activeBtns === false &&
                  singleProduct?.variations?.data.length > 0 "
                  aria-label="Decrease" @click.prevent="decrementCartItem">
                  &minus;
                </button>
                <input 
                  type="number" class="input-box"
                  min="1" max="10" v-model="quantityInput"/>
                <button 
                  class="plus" :disabled=" activeBtns === false &&
                  singleProduct?.variations?.data.length > 0"
                  aria-label="Increase" @click.prevent="incrementCartItem">
                  &plus;
                </button>
              </div>

              <span v-if="singleProduct?.variations?.data.length > 0 " >
                <span v-if="activeBtns === false">
                  <button 
                    :to="{ name: 'checkoutPage' }"
                    type="button  "
                    class="mx-2 btnColor"
                    :class="{ 'singleProductBtn ': activeBtns === false }"
                    >BUY NOW</button>
                </span>
                <span v-else>
                  <router-link
                      :to="{ name: 'checkoutPage' }"
                      @click.prevent="
                        addToCart(
                          singleProduct,
                          quantityInput,
                          productVariationData,
                          productVariationPrice,
                          campaignSlug
                        )
                      "
                      :class="{ 'singleProductBtn ': activeBtns === false }"
                      type="button"
                      class="mx-2 btnColor"
                      >BUY NOW</router-link
                    >
                </span>
              </span>
              <span v-else>
                <router-link
                  :to="{ name: 'checkoutPage' }"
                  @click.prevent="addToCart(singleProduct)"
                  type="button  "
                  class="mx-2 btnColor"
                  >BUY NOW</router-link
                >
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Sticky Footer End -->
  </div>
</template>

<style scoped>

.img-showcase{
  display: flex;
  margin-bottom: 25px;
  justify-content: center;
}

.image {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
}


.footer-price{
  font-size: 24px;
  font-weight: 600;
  color: red;
}


.review-img-section img {
  max-width: 100%;
}

/* Related and cross sell product heading title start */

.section-header-text {
  background-color: #f5f6f7;
  font-size: 24px;
  padding: 10px 20px;
  border: 3px solid var(--primary) !important;
  border-top-width: 7px !important;
  border-radius: 15px / 45px !important;
  box-shadow: #ccdbe8 3px 3px 15px inset, #ffffff80 -3px -3px 12px 1px inset;
  transition: all linear 0.2s;
}

.section-header-text:hover {
  background-color: #f5f6f7;
  border: 3px solid var(--secondary-color) !important;
  border-top-width: 7px !important;
  border-radius: 15px / 45px !important;
  transition: all linear 0.2s;
}



.heading-line {
  width: 100%;
  background-color: var(--primary);
  height: 2px;
  margin-top: -25px;
}
.heading-line:hover {
  background-color: var(--secondary-color);
}


/* Related and cross sell product heading title end */


/* image zooming start*/
.image-container {
  position: relative;
  width: 400px;
  overflow: hidden;
  cursor: crosshair;
}



.zoom-lens {
    position: absolute;
    width: 250px;
    height: 250px;
    border: 2px solid #000;
    background-repeat: no-repeat;
    visibility: hidden;
    pointer-events: none;
    z-index: 10;
    border-radius: 10px;
}
/* image zooming end*/


/* MOdla css */
.view-price {
  margin-bottom: 0px !important;
}

.view-add-group {
  margin: 20px 0px 15px;
}

/* MOdla css */


.couter-span-tag {
    padding: 15px;
    border-radius: 51px;
    font-size: 26px;
    background-color: red;
    color: #fff;
}


/* Define the keyframes for the pulse animation */
@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Base button styling */

.main-order-btn {
  animation: pulse 1s infinite;
  margin: 0px;
  border: var(--primary);
}
.main-order-btn:hover {
  border: var(--primary);
}

.discout_amount {
  border: 1px solid var(--primary);
  margin-left: 20px;
  padding: 0px 8px;
  border-radius: 5px;
  background-color: var(--primary);
  color: var(--white) !important;
  font-size: 18px;
  margin-bottom: 5px;
  border-top: 2px solid var(--primary);
  border-left: 2px solid var(--primary);
  border-bottom: 2px solid var(--primary);
  border-right: 2px solid var(--primary);
  border-top-left-radius: 20px !important;
  border-bottom-right-radius: 20px !important;
}


.img-display {
  overflow: hidden;
}





.img-select {
  display: flex;
}
.img-item {
  margin: 0.3rem;
}
.img-item:nth-child(1),
.img-item:nth-child(2),
.img-item:nth-child(3) {
  margin-right: 0;
}
.img-item:hover {
  opacity: 0.8;
}
.active-thumb {
  border: 2px solid #119744;
}

.image-gallery {
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-gap: 5px;
}

.is-active {
  color: var(--white) !important;
  background: var(--primary) !important;
}

.singleProductBtn {
  background: rgb(199, 40, 40);
  color: white;
  border: 0;
  cursor: pointer;
  padding: 1em;
  opacity: 0.5;
  cursor: not-allowed;
}

.variationRemoveBtn {
  padding: 1px 10px;
  background-color: white;
  color: rgb(255, 0, 0);
  border-radius: 5px;
  border: 2px solid rgb(255, 0, 0);
}
.variationRemoveBtn:hover {
  background-color: rgb(255, 0, 0);
  color: white;
  border: 2px solid rgb(255, 0, 0);
}

.is-disabled {
  pointer-events: none;
  opacity: 0.5;
}

.quantity {
  display: flex;
  border: 2px solid var(--primary);
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.quantity-disabled {
  background: rgb(199, 40, 40);
  color: white;
  cursor: pointer;
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity button {
  background-color: var(--primary);
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 20px;
  width: 30px;
  height: auto;
  text-align: center;
  transition: background-color 0.2s;
}

.quantity button:hover {
  background-color: rgb(172, 16, 16);
  color: white;
}

.input-box {
  width: 40px;
  text-align: center;
  border: none;
  padding: 8px 10px;
  font-size: 16px;
  outline: none;
}

/* Hide the number input spin buttons */
.input-box::-webkit-inner-spin-button,
.input-box::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.input-box[type="number"] {
  -moz-appearance: textfield;
}

/* sticky footer start */

.quentyDefaultClass {
  display: flex;
  align-items: center;
  justify-content: center;
}

.quentyDefaultClass button {
  font-size: 28px;
}

.quentyDefaultClass input {
  margin: 0px 8px;
  border-radius: 5px;
}

.btnColor {
  animation: pulse 1s infinite;
  background-color: var(--primary);
  color: rgb(255, 255, 255);
  padding: 9px 32px;
  border-radius: 5px;
}

.main-footer-nav-section {
  background-color: #ffffff;
  padding: 20px;
  box-shadow: 0px -7px 16px -4px rgba(0, 0, 0, 0.69);
  -webkit-box-shadow: 8px -9px 24px -12px rgba(5, 19, 3, 0.69);
  -moz-box-shadow: 0px -7px 16px -4px rgba(0, 0, 0, 0.69);
  position: fixed;
  bottom: -115px;
  transition: all 0.5s ease;
  width: 100%;
  z-index: 9999;
}

.main-nav-footer {
  justify-content: end;
}

/* right */

.footer-nav-right {
  display: flex;
  justify-content: center;
  align-items: center;
}
.price {
  display: flex;
}

.price h3 {
  font-size: 22px;
  margin-right: 5px;
}

.footer-nav-cart {
  display: flex;
  align-items: center;
}
.footer-nav-cart input {
  /* width: 57px; */
  border: 1px solid #494b51;
  height: 40px;
  padding: 9px;
  margin-right: 10px;
}
.footer-nav-cart button {
  padding: 6px 9px;
  border: 1px solid var(--primary);
  background-color: var(--primary);
  color: var(--white);
  border-radius: 5px;
}

/* left */
.footer-nav-left {
  display: flex;
  align-items: center;
}
.footer-nav-left img {
  width: 50px;
  margin-right: 10px;
}
.footer-nav-left p {
  font-size: 20px;
  align-items: center;
  margin: 0;
}

input[type="number"]::-webkit-inner-spin-button {
  color: #8bc4a1;
}


@media (max-width: 991px) {
  .btnColor {
    padding: 10px 15px;
    white-space: nowrap !important;
  }

  .price h3 {
    font-size: 20px;
    white-space: nowrap;
  }

  .footer-nav-left p {
    font-size: 19px;
  }

  .details-price del {
    color: var(--red);
    margin-right: 12px;
  }

  .quantity {
    border: 1px solid var(--primary);
  }
}

@media (max-width: 768px) {
  .videoHW iframe {
    width: 519px !important;
    height: 400px !important;
  }

  .btnColor {
    padding: 10px 15px;
    white-space: nowrap !important;
  }

  .price h3 {
    font-size: 20px;
    white-space: nowrap;
  }

  .footer-nav-left p {
    font-size: 19px;
  }

  .details-price del {
    color: var(--red);
    margin-right: 12px;
  }

  .quantity {
    border: 1px solid var(--primary);
  }
}

@media (max-width: 767px) {
  .footer-nav-left {
    display: none;
  }

  .price {
    display: none;
  }

  .main-nav-footer {
    justify-content: center;
  }

  .quantity {
    margin-right: 15px;
  }
}

@media (max-width: 375px) {
  .discout_amount {
    margin-left: 0px;
  }
}
</style>
