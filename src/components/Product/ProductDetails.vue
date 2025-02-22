<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import BeatLoader from "vue-spinner/src/BeatLoader.vue";
import { useProduct, useCart, useNotification, useShop, useSetting, } from "@/stores";
import { storeToRefs } from "pinia";
import { ProductVariation, ProductImage } from "@/components";
import { mrpOrOfferPrice, addToCart } from "@/composables";
import axiosInstance from "@/services/axiosService.js";
const emit = defineEmits(['productVariationPrice', 'productVariationData', 'activeBtns']);

const props = defineProps({
 singleProduct: {
    type: [Object, String],
    default: {},
  },
 productVariations: {
    type: Object,
    default: {}, 
  },
 campaignSlug: {
    type: String,
    default: null, 
  },
 type: {
    type: String,
    default: null, 
  },
});


const sizeName              = ref("");
const productPrices         = ref("");
const route                 = useRoute();
const shop                  = useShop();
const cart                  = useCart();
const { loading }           = storeToRefs(cart);
const isloading             = ref(loading);
const selectedSize          = ref();
const notify                = useNotification();
const quantityInput         = ref(1);
const setting               = useSetting();



// product variations start
const productVariationData  = ref("");
const productVariationPrice = ref("");
const activeBtns            = ref(false);


// social Icons start
const socialShares          = ref("");
// social Icons end
// Setting data start
const websiteUrl            = ref("");
const phone                 = ref("");
const whatsapp              = ref("");
const messengerId           = ref("");
const whatsappText          = ref("");
const phoneText             = ref("");
// Setting data end

// get products variation working end

const incrementCartItem = () => {
  quantityInput.value = parseInt(quantityInput.value) + 1;
};
const decrementCartItem = () => {
  if (quantityInput.value != 1) {
    quantityInput.value = parseInt(quantityInput.value) - 1;
  }
};

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


// const connectWhatsApp = (whatsappNumber)=>{
//   const phoneNumber = whatsappNumber;
//   const whatsappLink = `https://wa.me+88${phoneNumber}?text=hello!`;
//   window.location.href = whatsappLink
// }

// const connectPhone = (number)=>{
//   const phoneNumber = number;
//   const phoneLink = `tel:${phoneNumber}`;
//   window.location.href = phoneLink;
// }


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

// social media link  end

const backgroundImageUrl = ref("https://wpmet.com/plugin/elementskit/popup-modal/wp-content/uploads/sites/9/2022/06/big_offer_item_02.png");

const handleBeforeUnload = (event) => {

  event.preventDefault();
  event.returnValue = 'fdsfsdf'; 
  

  setTimeout(() => {
    const modal = new bootstrap.Modal(document.getElementById('product-view'));
    modal.show();
  }, 10);
};




// video url setup start

const getEmbedUrl = (watchUrl) => {
  const videoIdMatch = watchUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
  const videoId = (videoIdMatch && videoIdMatch[1]) || '';
  
  return `https://www.youtube.com/embed/${videoId}`;
}

// video url setup end

// product prices start
const handleProductVariationPrice = (data) => {
  emit('productVariationPrice', data);
  productVariationPrice.value = data[0]  
}
// product prices end

// product prices start
const handleProductVariationData = (data) => {
  productVariationData.value = data  
  emit('productVariationData', data);
}
// product prices end

// product prices start
const handleActiveBtns = (data) => {
  activeBtns.value = data  
  emit('activeBtns', data);
}
// product prices end

 function modalClose(){
  $('#product-view').modal('hide')
 }


onMounted(() => {
  // socialMedia();
  getSettingsData();
});
</script>


<template>
  
    <div class="row ">
      <div class="col-lg-6">
      <div>
          <ProductImage :singleProduct="singleProduct" :type="'details'"/>
      </div>
    </div>

  <div class="col-lg-6">
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
  </div>


    <div>
      <div class="col-lg-12 mt-3">
            <div class="details-content">
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
    
              
              <div class="details-add-group" v-if="singleProduct?.variations?.data.length > 0">
                <div class="row">
                  <span
                    class="row d-block text-center text-danger"
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
                    <a class="product-add bg-success" ><span> <i class="fab fa-whatsapp" style="font-size:18px"></i> <span class="fw-bold"> {{whatsapp?.value}}</span></span></a>
                  </div>
                  <div class="col-md-6 mt-2">
                    <a class="product-add bg-success" :href="socialURL('Phone', phone?.value)" ><span>হট লাইন নাম্বার : <span class="fw-bold"> {{phone?.value}}</span></span></a>
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

                <div class="row mt-2">
                  <div class="col-md-6 mt-2">
                    <a class="product-add bg-success"><span><i class="fab fa-whatsapp" style="font-size:18px"></i> <span class="fw-bold"> </span> {{ whatsapp?.value }}</span></a>
                  </div>
                  <div class="col-md-6 mt-2">
                    <a class="product-add bg-success"><span>হট লাইন নাম্বার : <span class="fw-bold"> <i class="fas fa-phone-alt"></i> {{ phone?.value }}</span></span></a>
                  </div>
                </div>

              </div>
            </div>
          </div>
    
   
  </div>

</template>



<style scoped>



.top-details{
  height: 25%;
}

/* video section start */
.videoHW iframe{
  width: 560px !important;
  height: 315px !important;
}

.view-list-group .videoHW iframe {
  width: 420px !important;
  height: 260px !important;
}
/* video section end */

/* image zooming start*/
.image-container {
  position: relative;
  width: 200px;
  overflow: hidden;
  cursor: crosshair;
}

.image {
  width: 100%;
  height: auto;
  object-fit: cover;
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

.add-to-cart{
  padding-left: 0px;
}

/* MOdla css */

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

img {
  width: 100%;
  display: block;
}

.img-display {
  overflow: hidden;
}
.img-showcase {
  display: flex;
  width: 100%;
  transition: all 0.5s ease;
}
.img-showcase img {
  min-width: 100%;
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

.view-list-group .image-gallery {
  grid-template-columns: repeat(auto-fill, minmax(125px, 1fr));
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
  gap: 5px;
}

.quentyDefaultClass button {
  font-size: 30px;
}

.quentyDefaultClass input {
  margin: 0px 8px;
  border-radius: 5px;
  width: 40%;
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

@media (max-width: 1399px) {

  .videoHW iframe{
    width: 500px !important;
    height: 300px!important;
  }
  
}

@media (max-width: 1199px) {

  .videoHW iframe{
    width: 385px !important;
    height: 245px !important;
  }
  
}

@media (max-width: 1280px) {

  .view-list-group .videoHW iframe {
    width: 410px !important;
    height: 270px !important;
  }
  
}

@media (max-width: 1024px) {

  .videoHW iframe{
    width: 383px !important;
    height: 190px!important;
  }

  .view-list-group .image-gallery {
    grid-template-columns: repeat(auto-fill, minmax(125px, 1fr));
  }

  .details-content .details-price del, .details-content .details-price span {
    font-size: 22px;
  }
  
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

  .videoHW iframe{
    width: 447px !important;
    height: 272px !important;
  }

  .view-list-group .videoHW iframe {
    width: 400px !important;
    height: 300px !important;
  }

}



@media (max-width: 575px) {

  .videoHW iframe {
    width: 361px !important;
    height: 215px !important;
  }

}
@media (max-width: 440px) {
  .discout_amount{
    padding: 0px 8px;
    font-size: 14px;
  }
}
@media (max-width: 430px) {

  .view-list-group .videoHW iframe {
    width: 350px !important;
  }

}

@media (max-width: 425px) {

  .videoHW iframe{
    width: 355px !important;
    height: 220px !important;
  }

  .view-list-group .videoHW iframe {
    width: 350px !important;
    height: 270px !important;
  }

  .details-content .details-price del, .details-content .details-price span {
    font-size: 22px;
  }

  .discout_amount{
    font-size: 13px;
  }

}

@media (max-width: 412px) {

  .view-action-group a{
    width: 95%;
  }



}

@media (max-width: 390px) {

  .videoHW iframe {
    width: 315px !important;
    height: 193px !important;
  }
  
  .view-list-group .videoHW iframe {
    width: 316px !important;
    height: 260px !important;
  }

  .view-action-group a{
    width: 90%;
  }

  .details-content .details-price del, .details-content .details-price span {
    font-size: 20px;
  }

}

@media (max-width: 375px) {
  .discout_amount {
    margin-left: 12px;
    font-size: 12px;
    border-top: 0px solid var(--primary);
    border-bottom: 0px solid var(--primary);
  }

  .videoHW iframe{
    width: 305px !important;
    height: 170px !important;
  }

  .view-list-group .videoHW iframe {
    width: 300px !important;
    height: 310px !important;
  }


  .details-action-group{
    grid-template-columns: none;
  }

  .view-action-group a{
    width: 85%;
  }

}

@media (max-width: 360px) {

  .view-action-group a{
    width: 80%;
  }

  .details-content .details-price del, .details-content .details-price span {
    font-size: 18px;
  }

}
@media (max-width: 344px) {

  .videoHW iframe{
    width: 278px !important;
    height: 170px !important;
  }

  .view-action-group a{
    width: 76%;
  }

}


@media (max-width: 330px) {

  .view-list-group .videoHW iframe {
    width: 271px !important;
    height: 195px !important;
  }

  .details-content .details-price del, .details-content .details-price span {
    font-size: 16px;
  }

}
@media (max-width: 320px) {

  .videoHW iframe{
    width: 251px !important;
    height: 150px !important;
  }

  .view-list-group .videoHW iframe {
    width: 250px !important;
    height: 250px !important;
  }

  .view-action-group a{
    width: 70%;
  }

}

</style>