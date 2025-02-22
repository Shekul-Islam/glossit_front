<script setup>
import SingleProductPageSkeleton from '../../../components/skeleton/SingleProductPageSkeleton.vue'
import { ref, onMounted, watch} from "vue";
import { useRoute } from "vue-router";
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
  ProductVariation,
  ProductImage,
  ProductDetails,
} from "@/components";
import { mrpOrOfferPrice, addToCart } from "@/composables";
import axiosInstance from "@/services/axiosService.js";

const emit = defineEmits(['productVariationPrice', 'productVariationData', 'activeBtns']);
const productVariationPrice = ref();
const productVariationData = ref();
const product       = useProduct();
const singleProduct = ref("");
const sizeName      = ref("");
const productPrices = ref("");
const route         = useRoute();
const shop          = useShop();
const { products }  = storeToRefs(shop);
const cart          = useCart();
const { loading }   = storeToRefs(cart);
const notify        = useNotification();
const price         = ref();
const quantityInput = ref(1);
const categoryId    = ref([]);
const setting       = useSetting();
const activeBtns    = ref(false);
const productVariations  = ref([]);

// social Icons start
const socialShares = ref("");
// social Icons end
// Setting data start
const websiteUrl  = ref("");
const phone       = ref("");
const whatsapp    = ref("");
const messengerId = ref("");
// Setting data end
// related product start
const relatedProducts = ref("");
// related product end

const alertTimeout = ref("");



// get products start
const productByid = async () => {
  singleProduct.value = await product.campaignProduct(route.params.campaign_slug, route.params.product_slug);
  productVariations.value = singleProduct.value?.variations?.attributes;
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


// video url setup start

const getEmbedUrl = (watchUrl) => {
  const videoIdMatch = watchUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
  const videoId = (videoIdMatch && videoIdMatch[1]) || '';
  
  return `https://www.youtube.com/embed/${videoId}`;
}

// video url setup end

// Related product  start
  const getRelatedProductData = async (catId) => {
    let type = "";
    let brand = [];
    let subCategory = [];
    let attributeIds = [];
    let price = [];
    let search = "";
    let paginateSize = 8;
    const res = await shop.getData(type, brand, catId, subCategory, attributeIds, price, search, paginateSize);
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
  stickyFooter();
  productByid();
});

</script>

<template>
  <div>

    <section class="inner-section mt-4" v-if="singleProduct">
      <div class="container">
        <div class="row">
          <div class="col-lg-6">
            <ProductImage :singleProduct="singleProduct" :type="'details'" />
          </div>
          <div class="col-lg-6">
            <ProductDetails :singleProduct="singleProduct" :productVariations="productVariations" :campaignSlug="route.params.campaign_slug" :type="'details'" @productVariationPrice="handleProductVariationPrice" @productVariationData="handleProductVariationData" @activeBtns="handleActiveBtns" />
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

    <section class="inner-section" v-if="singleProduct?.description">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <ul class="nav nav-tabs">
              <li>
                <a href="#tab-desc" class="tab-link active" data-bs-toggle="tab"
                  >descriptions</a
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="tab-pane fade show active" id="tab-desc">
          <div class="row">
            <div class="col-lg-12">
              <div class="product-details-frame">
                <div class="tab-descrip">
                  <p v-html="singleProduct?.description"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Cross Sell Product -->

    <!-- <section class="inner-section mt-3" v-if="singleProduct && singleProduct?.up_sell_products.length > 0">
      <div class="container">
        <div class="row">
          <div class="col">
            <div class="section-heading">
              <h2>Special For You</h2>
            </div>
          </div>
        </div>
        <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-4">
          <div
            class="col"
            v-for="(upSellProducts, index) in singleProduct?.up_sell_products"
            :key="index"
          >
            <ProductCard :product="upSellProducts" />
          </div>
        </div>
      </div>
    </section> -->

    <!-- Cross Sell Product -->
    
    
    <!-- Related Product -->

    <!-- <section class="inner-section" v-if="relatedProducts.length > 0">
      <div class="container">
        <div class="row">
          <div class="col">
            <div class="section-heading">
              <h2>Related Products</h2>
            </div>
          </div>
        </div>
        <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-4">
          <div
            class="col"
            v-for="(relatedProduct, index) in relatedProducts"
            :key="index"
          >
            <ProductCard :product="relatedProduct" />
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
    </section> -->

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
                <template v-else>
                  <span v-html="$filters.productPrice(productPrices)"></span>
                </template>
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
              <div
                class="quantity"
                :class="{
                  'quantity-disabled':
                    activeBtns === false &&
                    singleProduct?.variations?.data.length > 0,
                }"
              >
                <button
                  class="minus"
                  :disabled="
                    activeBtns === false &&
                    singleProduct?.variations?.data.length > 0
                  "
                  aria-label="Decrease"
                  @click.prevent="decrementCartItem"
                >
                  &minus;
                </button>
                <input
                  type="number"
                  class="input-box"
                  min="1"
                  max="10"
                  v-model="quantityInput"
                />
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
              <span v-if="singleProduct?.variations?.data.length > 0">
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
                      type="button  "
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

.footer-price{
  font-size: 24px;
  font-weight: 600;
  color: red;
}


/* image zooming start*/
.image-container {
  position: relative;
  width: 400px;
  overflow: hidden;
  cursor: crosshair;
}

.image {
  width: 100%;
  height: 100%;
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
  justify-content: space-between;
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
