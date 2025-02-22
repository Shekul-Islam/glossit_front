<script setup>
import { storeToRefs } from "pinia";
import { ref, onMounted, watch, computed, defineAsyncComponent } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useCart, useNotification, useAuth, useModal, useProduct, useSetting } from "@/stores";
import axiosInstance from "@/services/axiosService.js";
import { mrpOrOfferPrice, addToCart } from '@/composables'
import ProductCardModal from "./ProductCardModal.vue";


// All Variable  Code Is Here.....................................................................................................
const modal         = useModal()
const auth          = useAuth();
const cart          = useCart();
const { loading }   = storeToRefs(cart);
const notify        = useNotification();
const isloading     = ref(loading);
const uProduct       = useProduct();
const { products, variationProducts }   = storeToRefs(uProduct);
const color         = "white";
const size          = "8px";
const quantityInput = ref(1);
const setting       = useSetting();
const props = defineProps({
  product: Object,
  types: String,
  product_prices: Number,
  required: true,
});


// settings variables
const addToCartButton      = ref('Add Cart');
const orderButton          = ref('Order Now ');
const productNameFontSize  = ref('18px');
const productPriceFontSize = ref('20px');


const price            = ref();
const route            = useRoute();
const router           = useRouter();
const sizeMrp          = ref();
const sizeOfferPrice   = ref();
const sizeId           = ref();
const productPrices    = ref();
const sizeName         = ref();
const selectedSize     = ref();
const isButtonDisabled = ref(true);
const modalProduct     = ref( );

// product variations start
const productVariations     = ref([]);
const attribute_id_1        = ref(null);
const attribute_id_2        = ref(null);
const attribute_id_3        = ref(null);
const attribute_value_id_1  = ref(null);
const attribute_value_id_2  = ref(null);
const attribute_value_id_3  = ref(null);
const productVariationData  = ref('');
const productVariationPrice = ref('');
const resetBtns             = ref(false);
const activeBtns            = ref(false);
const variationRemoveBtn    = ref(false);
const activeAttributes = ref({
    0: [],
    1: [],
    2: [],
});
// product variations end

// get modal data start

const getProductDetails = async (productId) => {
  modalProduct.value = await uProduct.productById(productId);
  productVariations.value = modalProduct.value?.variations?.attributes
};



watch(products, (newProduct) => {
    modalProduct.value = { ...newProduct }; 
    productVariations.value = modalProduct.value?.variations?.attributes
});


// get modal data end


// image working start
  
const thumbnailImage = ref(null);
    const activeImage    = ref(0);
    const images         = ref([]);

    const changeImage = (img, index) => {
        thumbnailImage.value = img;
        activeImage.value = index;
    };
// image working end


// sizes start

const sizeByPrice = (mrp, offerPrice, sizeID) => {
  sizeMrp.value        = mrp;
  sizeOfferPrice.value = offerPrice;
  sizeId.value         = sizeID;
  isButtonDisabled.value = false;
}

// sizes end

// auth login part start 
const isLogin = (product) => {
  if (Object.keys(auth.user).length > 0) {
    addToCart(product)
    router.push({ name: "checkoutPage" });
  }else{
    // $("#login-modal").modal("show")
    modal.toggleModal();
    addToCart(product)
  }
}
// auth login part end


// get products variation working start

async function getProductVariation(productId,attributeValue, index) {
    
    resetBtns.value = true;

    // variation selected section start
        if (activeAttributes.value[index] === attributeValue.attribute_value_id) {
            // যদি ক্লিক করা ভ্যালুটি ইতিমধ্যেই সক্রিয় থাকে, তাহলে নিষ্ক্রিয় করুন
            activeAttributes.value[index] = null;
        } else {
            // যদি ক্লিক করা ভ্যালুটি সক্রিয় না থাকে, তাহলে এটিকে সক্রিয় করুন এবং অন্যান্য সক্রিয়গুলো নিষ্ক্রিয় করুন
            activeAttributes.value[index] = attributeValue.attribute_value_id;
        }
    // variation selected section end

   
   if (index === 0) {
       attribute_id_1.value = attributeValue.attribute_id;
       attribute_value_id_1.value = attributeValue.attribute_value_id;
       productVariationData.value = {
            "product_id"          : productId,
            "attribute_id_1"      : attribute_id_1.value || '',
            "attribute_value_id_1": attribute_value_id_1.value || '',
            "attribute_id_2"      : '',
            "attribute_value_id_2": attribute_value_id_2.value || '',
            "attribute_id_3"      : '',
            "attribute_value_id_3": attribute_value_id_3.value || ''
        };
   } 
   
   if (index === 1) {
        attribute_id_2.value = attributeValue.attribute_id;
        attribute_value_id_2.value = attributeValue.attribute_value_id
        productVariationData.value = {
            "product_id"          : productId,
            "attribute_id_1"      : '',
            "attribute_value_id_1": attribute_value_id_1.value || '',
            "attribute_id_2"      : attribute_id_2.value || '',
            "attribute_value_id_2": attribute_value_id_2.value || '',
            "attribute_id_3"      : '',
            "attribute_value_id_3": attribute_value_id_3.value || ''
        };
   } 
   if (index === 2) {     
       attribute_id_3.value = attributeValue.attribute_id;
       attribute_value_id_3.value = attributeValue.attribute_value_id
       productVariationData.value = {
            "product_id"          : productId,
            "attribute_id_1"      : '',
            "attribute_value_id_1": attribute_value_id_1.value || '',
            "attribute_id_2"      : '',
            "attribute_value_id_2": attribute_value_id_2.value || '',
            "attribute_id_3"      : attribute_id_3.value || '',
            "attribute_value_id_3": attribute_value_id_3.value || ''
        };
   } 
   

   const variations =  await uProduct.productVariations(productVariationData.value); 

   productVariations.value =  variations.attributes;
         
   

   // price jodi backend theke dubble na hoy eitar code start 
   
   if ((Object.keys(productVariations.value).length == 1) && (attribute_value_id_1.value != null)) {
      productVariationPrice.value = variations.variation_price[0];
      activeBtns.value            = true;
   }
   if ((Object.keys(productVariations.value).length == 2) && (attribute_value_id_2.value != null && attribute_value_id_1.value != null)) {
      productVariationPrice.value = variations.variation_price[0];
      activeBtns.value            = true;
   }
   if ((Object.keys(productVariations.value).length == 3) && (attribute_value_id_3.value != null && attribute_value_id_2.value != null && attribute_value_id_1.value != null)) {
    
      productVariationPrice.value = variations.variation_price[0];         
      activeBtns.value = true; 
   }
   
   // price jodi backend theke dubble na hoy eitar code end 
   
   
}


const removeAllVariation = () => {
    // Reset the product variations
    productVariations.value = [];
    quantityInput.value = 1;
    
    // Reset the attribute value IDs
    attribute_value_id_1.value = null;
    attribute_value_id_2.value = null;
    attribute_value_id_3.value = null;
    
    // Reset the product variation data
    productVariationData.value = '';
    
    // Reset the product variation price
    productVariationPrice.value = '';
    
    // Reset the active buttons state
    activeBtns.value = false;
    
    // Reset the active attributes
    activeAttributes.value = {
        0: [],
        1: [],
        2: [],
    };

    productVariations.value = modalProduct.value?.variations?.attributes

    resetBtns.value =false;

};

// get products variation working end

const incrementCartItem = () => {        
    quantityInput.value = parseInt(quantityInput.value) + 1;
};

const decrementCartItem = () => {
    if (quantityInput.value != 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
    }
};

onMounted(() => {
  $(document).ready(function () {
    $(".venobox").venobox();
  });
});
</script>

<template>
  <div>
    <div class="product-card" :class="product?.current_stock == 0 ? 'product-disable' : ''">
      <div class="product-media">
        <div class="product-label">
            <label class="label-text off"  v-if="product?.offer_percent != 0.00">-{{ product?.offer_percent }}%</label>
            <label class="label-text" :class="product?.type === 'feature-product'? 'feat': product?.type === 'top-product'? 'sale': product?.type === 'recent-product'? 'new': ''">{{ product?.type }}</label>
          </div>
          <!-- <button class="product-wish wish">
              <i class="fas fa-heart"></i>
          </button> -->

          <span  v-if="isCampaign">
            <router-link :to="{ name: 'CampaignProductDetails', params: { campaign_slug: campaignSlug ? campaignSlug : '', product_slug: product?.slug ? product?.slug : '' } }" class="hover14 column hover01 column">
               <div class="product-image">
                 <figure><img :src="product?.image"></figure>
               </div>
             </router-link>
           </span>
           <!-- campaign product er jonno ei route end -->
           <span v-else>
             <router-link :to="{name: 'productDetailsPage',params: { slug: product?.slug ? product?.slug : '' },}" class="hover14 column hover01 column" >
               <div class="product-image">
                 <figure><img :src="product?.image"></figure>
               </div>
             </router-link>
           </span>
          
          <div class="product-widget">
            <a title="Product View" href="#" class="fas fa-eye" data-bs-toggle="modal" data-bs-target="#product-view" @click.prevent="getProductDetails(product?.id)"></a>
            <a title="Product Video" v-show="product?.video_url" :href="product?.video_url" class="venobox fas fa-play" data-vbtype="video" data-autoplay="true"></a>
          </div>
      </div>
      <div class="product-content">
          
        <h6 class="product-name">
            <router-link :to="{ name: 'CampaignProductDetails', params: { campaign_slug: campaignSlug ? campaignSlug : '', product_slug: product?.slug ? product?.slug : '' } }" :style="`font-size: ${productNameFontSize ? productNameFontSize : ''}`" v-if="isCampaign">{{ product?.name }}</router-link>
            <router-link :to="{name: 'productDetailsPage',params: { slug: product?.slug ? product?.slug : 0 },}" :style="`font-size: ${productNameFontSize ? productNameFontSize : ''}`" v-else>{{ product?.name }}</router-link>
        </h6>


        <h6 class="product-price" v-if="product?.variations?.data?.length > 0" :style="`font-size: ${productPriceFontSize ? productPriceFontSize : ''}`">
          <span v-if="product?.variation_price_range.min_price == product?.variation_price_range.max_price">{{ product?.variation_price_range.min_price || product?.variation_price_range.max_price }}</span>
          <span v-else>{{ product?.variation_price_range.min_price }} - {{ product?.variation_price_range.max_price }}</span>
        </h6>
        <h6 class="product-price" v-else :style="`font-size: ${productPriceFontSize ? productPriceFontSize : ''}`">
          <span>{{ $filters.currencySymbol(Math.round(product?.sell_price)) }}</span>
        </h6>

          <div class="row" v-if="product?.variations?.data?.length > 0">
            <div class="col-xl-6 col-lg-12 col-12 mt-2">
              <button  class="product-add btnColorOrder" :disabled="isButtonDisabled" :class="isButtonDisabled ? 'disabled btn border-dark' : ''" title="Add to Cart" @click.prevent="addToCart(product)">
                <i :class="loading == product.id ? 'fa-solid fa-spinner fa-spin' : 'fas fa-shopping-basket'"></i>
                <span>{{ addToCartButton }}</span>
              </button>
            </div>
            <div class="col-xl-6 col-lg-12 col-12 mt-2">
              <router-link :to="{ name: 'checkoutPage' }"  class="product-add standard-wishs" :class="isButtonDisabled ? 'disabled btn border-danger' : ''" @click.prevent="addToCart(product)">
                <i class="fas fa-shopping-basket"></i>
                <span>{{ orderButton }}</span>
              </router-link>
            </div>
          </div>
          <div class="row" v-else>
            <div class="col-xl-6 col-lg-12 col-12 mt-2">
              <button  class="product-add btnColorOrder"  title="Add to Cart" @click.prevent="addToCart(product)">
                <i :class="loading == product.id ? 'fa-solid fa-spinner fa-spin' : 'fas fa-shopping-basket'"></i>
                <span>{{ addToCartButton }}</span>
              </button>
            </div>
            <div class="col-xl-6 col-lg-12 col-12 mt-2">
              <router-link :to="{ name: 'checkoutPage' }"  class="product-add standard-wishs" @click.prevent="addToCart(product)">
                <i class="fas fa-shopping-basket"></i>
                <span>{{ orderButton }}</span>
              </router-link>
            </div>
          </div>
      </div>
  </div>

  <ProductCardModal :modalProduct="modalProduct" />

  </div>
</template>

<style scoped>

.variationRemoveBtn{
  padding: 1px 10px;
  background-color: white;
  color: rgb(255, 0, 0);
  border-radius: 5px;
  border: 2px solid rgb(255, 0, 0);
}
.variationRemoveBtn:hover{
  background-color: rgb(255, 0, 0);
  color: white;
  border: 2px solid rgb(255, 0, 0);
}

.discout_amount{
  border          : 1px solid var(--primary);
  margin-left     : 20px;
  padding         : 0px 8px;
  border-radius   : 5px;
  background-color: var(--primary);
  color           : var(--white) !important;
  font-size       : 18px;
  margin-bottom   : 5px;
}

.details-list-group{
  margin-bottom: 0px !important;
}

.singleProductBtn{
  background: rgb(199, 40, 40);
  color: white;
  border: 0;
  cursor: pointer;
  padding: 1em;
  opacity: 0.5;
  cursor: not-allowed;
}

.is-active{
  color: var(--white) !important;
  background: var(--primary) !important;
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

.quantity-disabled{
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


/* Product image */

img{
  width: 100%;
  display: block;
}
.img-display{
  overflow: hidden;
}
.img-showcase{
  display: flex;
  width: 100%;
  transition: all 0.5s ease;
}
.img-showcase img{
  min-width: 100%;
}
.img-select{
  display: flex;
}
.img-item{
  margin: 0.3rem;
}
.img-item:nth-child(1),
.img-item:nth-child(2),
.img-item:nth-child(3){
  margin-right: 0;
}
.img-item:hover{
  opacity: 0.8;
}
.active-thumb{
border: 2px solid #119744;
}


/* Product image */


.product-widget a[title="Product View"], .product-widget a[title="Product Video"] {
  background-color: var(--primary);
  color: var(--white);
}
.product-widget a[title="Product View"]:hover, .product-widget a[title="Product Video"]:hover {
  background-color: var(--secondary-color);
  color: var(--white);
}

/* Shine */
.hover14 figure {
	position: relative;
}
.hover14 figure::before {
	position: absolute;
	top: 0;
	left: -75%;
	z-index: 2;
	display: block;
	content: '';
	width: 50%;
	height: 100%;
	background: -webkit-linear-gradient(left, rgba(255,255,255,0) 0%, rgba(255,255,255,.3) 100%);
	background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,.3) 100%);
	-webkit-transform: skewX(-25deg);
	transform: skewX(-25deg);
}
.hover14 figure:hover::before {
	-webkit-animation: shine .75s;
	animation: shine .75s;
}
@-webkit-keyframes shine {
	100% {
		left: 125%;
	}
}
@keyframes shine {
	100% {
		left: 125%;
	}
}

/* Zoom In #1 */
.hover01 figure img {
	-webkit-transform: scale(1);
	transform: scale(1);
	-webkit-transition: .3s ease-in-out;
	transition: .3s ease-in-out;
}
.hover01 figure:hover img {
	-webkit-transform: scale(1.1);
	transform: scale(1.1);
}


.product-name a {
  width: 204px !important;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}

/* product variation start */

.details-list-group {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-box-pack: start;
      -ms-flex-pack: start;
          justify-content: flex-start;
  margin-bottom: 25px;
}


.details-list-group label{
  margin-right: 20px;
}

.details-list-group:last-child {
  margin-bottom: 0px;
}

.details-tag-list {
    display: block;
  }
  .details-tag-list li{
    display: inline-block;
    margin: 5px;
  }

.details-tag-list li a {
  font-size: 14px;
  line-height: 12px;
  padding: 8px 10px;
  border-radius: 5px;
  letter-spacing: 0.3px;
  text-transform: capitalize;
  color: var(--text);
  background: var(--chalk);
  transition: all linear .3s;
  -webkit-transition: all linear .3s;
  -moz-transition: all linear .3s;
  -ms-transition: all linear .3s;
  -o-transition: all linear .3s;
}

.details-tag-list li a:hover {
  color: var(--white);
  background: var(--primary);
}

.selectedSizeColor {
  color: white !important;
  background-color: var(--primary) !important;
}

.btnColorOrder{
  background-color: var(--secondary-color) !important;
  color: var(--white) !important;
}

.btnColorOrder:hover{
  color: white !important;
  background-color: var(--primary) !important;
}
/* product variation end */

@media (max-width: 768px) {
  .view-action-group{
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  }
}
@media (max-width: 576px) {
  .standard-wishs {
    margin-top: 8px;
  }

  .view-action-group{
    grid-template-columns: repeat(auto-fit, minmax(325px, 1fr));
  }
}


@media (max-width: 425px) {
  .details-tag-list {
    display: block;
  }
  .details-tag-list li{
    display: inline-block;
    margin-top: 10px;
  }
  .product-name a {
    width: 167px !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
  }
}


@media (max-width: 375px) {
  .view-action-group{
    grid-template-columns: repeat(auto-fit, minmax(325px, 1fr));
  }
}

@media (max-width: 320px) {
  .view-action-group{
    grid-template-columns: repeat(auto-fit, minmax(275px, 1fr));
  }
}


</style>
