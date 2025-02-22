<script setup>
import ShopSideBarSkeleton from '../../../components/skeleton/ShopSideBarSkeleton.vue'
import ProductSkeleton from '../../../components/skeleton/ProductSkeleton.vue'
// All inport  Code Is Here.....................................................................................................
import {
  ProductCard,
  CoreDeveloperProductCard,
  BannerPart,
  ShopSideBar,
} from "@/components";
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, computed, watch  } from "vue";
import { storeToRefs } from "pinia";
import BeatLoader from "vue-spinner/src/BeatLoader.vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import { gsap } from "gsap";
// product data fetch
import { useShop, useCart, useNotification, useAuth, useBanner, useCommonIsToggleFunctionality } from "@/stores";

// All Variable  Code Is Here.....................................................................................................
const route = useRoute();
const router= useRouter();
const auth = useAuth();
const commonIsToggleFunctionality = useCommonIsToggleFunctionality();

const banner = useBanner();

const cart = useCart();
const { loadings } = storeToRefs(cart);
const isloadings = ref(loadings);
const notify = useNotification();
const quantityInput = ref(1);
const getAttributeDatas = ref();

const shop = useShop();
const { products, sideBar, loading } = storeToRefs(shop);

const searchBrandQuery = ref("");
const searchCategoryQuery = ref("");

const productType = ref("");
const selectedBrandIds = ref([]);
const selectedCategoryIds = ref([]);
const selectedAttributeIds = ref([]);
const selectedSubCategoryIds = ref("");
const sortingPrice = ref([]);
const searchQuery = ref("");
const paginateSize = ref("");

const isloading = ref(loading);
const color = "white";
const size = "8px";


// tab section
const currentTab = ref("three");

const price = ref();

// banner part start
const banners = ref(''); 
// banner part end

// API Calling Code Is Here.....................................................................................................

function onEnter(el, done) {
  gsap.to(el, {
    opacity: 1,
    height: "1.6em",
    delay: el.dataset.index * 0.15,
    onComplete: done,
  });
}

watch(
  () => [...searchQuery.value],
  async (newValue, oldValue) => {
    if (newValue.length >= 3 || oldValue.length >= 3) {
      getProducts();
    }
  }
);

// All Function  Code Is Here.....................................................................................................

function addToCart(tProduct) {
  if (tProduct.offer_price != 0) {
    price.value = tProduct.offer_price;
  } else {
    price.value = tProduct.mrp;
  }

  if(sizeMrp.value || sizeOfferPrice.value){

    cart.addToCart({
      item_id: tProduct.id,
      name: tProduct.name,
      mrp: sizeMrp.value,
      offer_price: sizeOfferPrice.value,
      image: tProduct.image,
      size_id: sizeId.value,
      quantity: 1,
      free_shipping: tProduct.free_shipping,
    });
    
  }else{
    
    cart.addToCart({
      item_id: tProduct.id,
      name: tProduct.name,
      mrp: tProduct.mrp,
      offer_price: tProduct.offer_price,
      image: tProduct.image,
      size_id: '',
      quantity: quantityInput.value,
      free_shipping: tProduct.free_shipping,
    });

  }


  notify.Success(`${tProduct.name} Successfully Added Your Cart Item`);
}

const searchCategories = computed(() => {
  return shop.sideBar.result.categories.filter((category) => {
    return category.name
      .toLowerCase()
      .match(searchCategoryQuery.value.toLocaleLowerCase());
  });
});

const searchBrands = computed(() => {
  return shop.sideBar.result.brands.filter((brand) => {
    return brand.name.toLowerCase().match(searchBrandQuery.value.toLowerCase());
  });
});


const getProducts = () => {
  products.value = [];
  shop.getData(
    productType.value,
    selectedBrandIds.value,
    selectedCategoryIds.value,
    selectedSubCategoryIds.value,
    selectedAttributeIds.value,
    sortingPrice.value,
    searchQuery.value,
    paginateSize.value,
  );
};


function clearFilter(data) {
  if (data == "brand") {
    selectedBrandIds.value = [];
  }else if(data == "category") {
    selectedCategoryIds.value = [];
  } else {
    selectedAttributeIds.value = [];
  }

  getProducts();
}

// Category wise product showing

const queryProducts = () => {
  selectedCategoryIds.value = [];
  selectedBrandIds.value = [];
  selectedAttributeIds.value = [];
  if (route.query.attribute) {
    selectedAttributeIds.value.push(route.query.attribute);
  }
  if (route.query.category) {
    selectedCategoryIds.value.push(route.query.category);
  }
  if (route.query.subCategory) {
    selectedSubCategoryIds.value = route.query.subCategory;
  }
  if (route.query.brand) {
    selectedBrandIds.value.push(route.query.brand);
  }
  if (route.query.recent) {
    productType.value = route.query.recent;
  }
  if (route.query.top) {
    productType.value = route.query.top;
  }
  if (route.query.feature) {
    productType.value = route.query.feature;
  }
};


// auth login part start 
// const isLogin = (product) => {
//   if (Object.keys(auth.user).length > 0) {
//     addToCart(product)
//     router.push({ name: "checkoutPage" });
//   }else{
//     // $("#login-modal").modal("show")
//     modal.toggleModal();
//     addToCart(product)
//   }

// }
// auth login part end
// category slug wise product showing
watch(
  () => route.query.category || route.query.brand || route.query.subCategory,
  async (newValue, oldValue) => {
    console.log(newValue, oldValue);
    queryProducts();
    getProducts();
  }
);

function closeCategorySideBar() {
        $('.category-sidebar').removeClass('active');
        $('.backdrop').fadeOut();
}

// attribute data 

const getAttributeData = async() => {
  getAttributeDatas.value = await shop.sideBarAttributeData();
}

onMounted(() => {
  closeCategorySideBar()
  getAttributeData()
  queryProducts();
  shop.getData();
  shop.sideBarData();
  getProducts();
  $(document).ready(function () {
    $(".venobox").venobox();
  });
});
</script>

<template>
  <div>
    
    <ShopSideBar />

    <BannerPart :title="'Shop Page'" />
    <section class="inner-section shop-part mt-4">
      <div class="container">
        <div class="row">
          <div class="col-lg-3">
            <template v-if="sideBar.result">
              <div class="shop-widget">
                <div class="shop-widget-title" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="true" aria-controls="collapseExample">
                  <h6>Filter by Price</h6>
                  <a><i class="fa-solid fa-plus"></i></a>
                </div>
                <form class="collapse show" id="collapseExample">
                  <div class="shop-widget-group">
                    <input type="text" v-model="sortingPrice[0]" :placeholder="`Min - ${$filters.currencySymbol(sideBar.result.min_price)}`" />
                    <input type="text" v-model="sortingPrice[1]" :placeholder="`Max - ${$filters.currencySymbol(sideBar.result.max_price)}`" />
                  </div>
                  <button class="shop-widget-btn" @click.prevent="getProducts">
                    <template v-if="isloading">
                      <beat-loader :loading="loading" :color="color" :size="size"></beat-loader>
                    </template>
                    <template v-else><i class="fas fa-search"></i></template>
                    <span>search</span>
                  </button>
                </form>
              </div>
              <div class="shop-widget" v-for="(getAttributeData, index) in getAttributeDatas" :key="index">
                <div class="shop-widget-header" data-bs-toggle="collapse" :href="`#${getAttributeData.id}`" role="button" aria-expanded="false" aria-controls="collapseExample">
                  <h6>Filter by {{ getAttributeData.name }}</h6>
                  <a><i class="fa-solid fa-plus"></i></a>
                </div>
                <form class="collapse show" :id="`${getAttributeData.id}`">
                  <ul class="shop-widget-list shop-widget-scroll">
                    <li v-for="(attributeValue, attributeValueIndex) in getAttributeData.attribute_values" :key="attributeValueIndex">
                      <div class="shop-widget-content">
                        <input type="checkbox" :id="`cate-${getAttributeData.id}-${attributeValueIndex}`" :value="attributeValue.id" @change="getProducts()"
                          v-model="selectedAttributeIds"/>
                        <label :for="`cate-${getAttributeData.id}-${attributeValueIndex}`">{{ attributeValue.value }}</label>
                      </div>
                      <span class="shop-widget-number">({{ attributeValue.products_count }})</span>
                    </li>
                    <!-- <li v-show="searchCategories.length === 0">
                      <img src="@/assets/images/nodatafound.png" class="image-fluid mt-5" alt="" />
                    </li> -->
                  </ul>
                  <button class="shop-widget-btn" @click.prevent="clearFilter('attributeValue')">
                    <i class="far fa-trash-alt"></i>
                    <span>clear filter</span>
                  </button>
                </form>
              </div>
              <div class="shop-widget">
                <div class="shop-widget-header" data-bs-toggle="collapse" href="#category" role="button" aria-expanded="false" aria-controls="collapseExample">
                  <h6>Filter by Category</h6>
                  <a><i class="fa-solid fa-plus"></i></a>
                </div>
                <form class="collapse show" id="category">
                  <input class="shop-widget-search" type="text" placeholder="Search..." v-model="searchCategoryQuery" />
                  <ul class="shop-widget-list shop-widget-scroll">
                    <li v-for="(category, index) in searchCategories" :key="index">
                      <div class="shop-widget-content">
                        <input type="checkbox" :id="`cate-${searchCategories.id}-${index}`" :value="category.slug" @change="getProducts"
                          v-model="selectedCategoryIds" />
                        <label :for="`cate-${searchCategories.id}-${index}`">{{ category.name }}</label>
                      </div>
                      <span class="shop-widget-number">({{ category.products_count }})</span>
                    </li>
                    <!-- <li v-show="searchCategories.length === 0">
                      <img src="@/assets/images/nodatafound.png" class="image-fluid mt-5" alt="" />
                    </li> -->
                  </ul>
                  <button class="shop-widget-btn" @click.prevent="clearFilter('category')">
                    <i class="far fa-trash-alt"></i>
                    <span>clear filter</span>
                  </button>
                </form>
              </div>
              <div class="shop-widget mb-4">
                <div class="shop-widget-header" data-bs-toggle="collapse" href="#brand" role="button" aria-expanded="false" aria-controls="collapseExample">
                  <h6>Filter by Brand</h6>
                  <a><i class="fa-solid fa-plus"></i></a>
                </div>
                <form class="collapse show" id="brand">
                  <input class="shop-widget-search" type="text" placeholder="Search..." v-model="searchBrandQuery" />
                  <TransitionGroup tag="ul" class="shop-widget-list shop-widget-scroll">
                    <li v-for="(brand, index) in searchBrands" :key="brand.id">
                      <div class="shop-widget-content">
                        <input type="checkbox" :id="`brand-${searchBrands.id}-${index}`" :value="brand.id" v-model="selectedBrandIds"
                          @change="getProducts" />
                        <label :for="`brand-${searchBrands.id}-${index}`">{{ brand.name }}</label>
                      </div>
                      <span class="shop-widget-number">({{ brand.products_count }})</span>
                    </li>
                    <!-- <li v-show="searchBrands.length === 0">
                      <img src="@/assets/images/nodatafound.png" class="image-fluid mt-5" alt="" />
                    </li> -->
                  </TransitionGroup>
                  <button class="shop-widget-btn" @click.prevent="clearFilter('brand')">
                    <i class="far fa-trash-alt"></i>
                    <span>clear filter</span>
                  </button>
                </form>
              </div>
            </template>
            <template v-else>
              <ShopSideBarSkeleton />
            </template>
          </div>
          <div class="col-lg-9">
            <div class="row">
              <div class="col-lg-12">
                <div class="top-filter">
                  <div class="filter-short">
                    <label class="filter-label">Short by :</label>
                    <select class="form-select filter-select filterSelectBorderPadding" @change="getProducts" v-model="productType">
                      <option value="" selected>All</option>
                      <option value="top-product">Top</option>
                      <option value="feature-product">Feature</option>
                      <option value="recent-product">Recent</option>
                    </select>
                  </div>
                  <div class="filter-show">
                    <input type="search" class="form-control formControl" placeholder="Searching....."
                      v-model="searchQuery" />
                  </div>
                  <div class="filter-icon" @click="commonIsToggleFunctionality.isShopSideBarOpenOrClose">
                    <i class="fa fa-filter"></i>
                  </div>
                  <div class="filter-action">
                    <a href="" @click.prevent="currentTab = 'three'" :class="currentTab === 'three' ? 'active' : ''"
                      title="Three Column"><i class="fas fa-th"></i></a>
                    <a href="" @click.prevent="currentTab = 'two'" :class="currentTab === 'two' ? 'active' : ''"
                      title="Two Column"><i class="fas fa-th-large"></i></a>
                  </div>
                </div>
              </div>
            </div>

            <template v-if="currentTab === 'three'">
              <Transition name="fade" mode="out-in">
                <template v-if="!products.data">
                  <ProductSkeleton :dataAmount="20" :cols="3" />
                </template>
                <template v-else>
                  <div class="row row-cols-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-4">
                    <div class="col" v-for="(product, index) in products.data" :key="index">
                      <ProductCard :product="product" />
                      <!-- <CoreDeveloperProductCard :product="product" /> -->
                    </div>
                  </div>
                </template>
              </Transition>
            </template>

            <template v-if="currentTab === 'two'">
              <Transition name="fade" mode="out-in">
                <template v-if="!products.data">
                  <ProductSkeleton :dataAmount="20" :cols="2" />
                </template>
                <template v-else>
                  <div class="row row-cols-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-3">
                    <div class="col" v-for="(product, index) in products.data" :key="index">
                      <!-- <CoreDeveloperProductCard :product="product" /> -->
                      <ProductCard :product="product" />
                    </div>
                  </div>
                </template>
              </Transition>
            </template>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<style scope>

.filter-icon{
  padding: 10px;
  background-color: var(--primary);
  color: white;
  border-radius: 10%;
}

.shop-widget-title{
  cursor: pointer;
  display: flex;
  justify-content: space-between;
}
.shop-widget-header{
  cursor: pointer;
  display: flex;
  justify-content: space-between;
}

.shop-widget {
  padding: 20px 20px;
  border-radius: 8px;
  margin-bottom: 25px;
  background: var(--secondary-color);
  border: 1px solid var(--white);
  border-top: 1px solid var(--black) !important;
  border-left: 1px solid var(--black) !important;
  border-bottom: 4px solid var(--black) !important;
  border-right: 2px solid var(--black) !important;
  padding: 5px 10px 5px 10px !important;
  transition: .5s;
}

.shop-widget:hover {
  border-top: 1px solid var(--primary) !important;
  border-left: 1px solid var(--primary) !important;
  border-bottom: 4px solid var(--primary) !important;
  border-right: 2px solid var(--primary) !important;
  transition: .5s;
}

.shop-widget-list li{
  color: var(--black);
}

.shop-widget-list li:hover{
  color: var(--black);
}


.formControl {
  border-top: 4px solid var(--primary) !important;
  border-left: 4px solid var(--primary) !important;
  border-bottom: 1px solid var(--primary) !important;
  border-right: 1px solid var(--primary) !important;
  border-top-left-radius: 20px !important;
  border-bottom-right-radius: 20px !important;;
  padding: 5px 10px 5px 10px !important;
}

.filterSelectBorderPadding {
  border-top: 4px solid var(--primary) !important;
  border-left: 4px solid var(--primary) !important;
  border-bottom: 1px solid var(--primary) !important;
  border-right: 1px solid var(--primary) !important;
  border-top-left-radius: 20px !important;
  border-bottom-right-radius: 20px !important;;
  padding: 5px 10px 5px 10px !important;
}

.filter-icon{
  display: none;
}

@media (max-width: 991px) {
  .filter-icon{
    display: block;
    padding: 6px;
  }

  .shop-widget{
    display: none;
  }

  .filter-short .form-select {
    width: 111px;
  }

  .filter-select {
    height: 35px !important;
  }

  .filterSelectBorderPadding {
    border-top: 2px solid var(--primary) !important;
    border-left: 2px solid var(--primary) !important;
    border-bottom: 1px solid var(--primary) !important;
    border-right: 1px solid var(--primary) !important;
    border-top-left-radius: 20px !important;
    border-bottom-right-radius: 20px !important;
    padding: 5px 10px 5px 12px !important;
  }

  .filter-show {
    width: 360px !important;
  }

  .formControl{
    height: 35px !important;
  }

  .filter-action{
    display: none !important;
  }

}

@media (max-width: 768px) {
  .filter-short {
    width: 87px !important;
  }

  .filter-short {
    width: 168px !important;
  }

}

@media (max-width: 767px) {
  .filter-label{
    display: none
  }

  .filter-short {
    width: 106px !important;
  }

  .filter-show {
    width: 295px !important;
  }

}

@media (max-width: 576px) {
  .formControl {
    width: 88% !important;
    height: 36px !important;
  }

  .filter-show {
    width: 385px !important;
  }

  .filter-short {
    width: 150px;
  }

}

@media (max-width: 425px) {
  .filter-short {
    width: 75px !important;
  }

}
@media (max-width: 320px) {
  .formControl {
    width: 80% !important;
    height: 33px !important;
  }

  .filter-select {
    height: 33px !important;
  }

  .filter-icon {
    padding: 4px;
  }

}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.list-move,
/* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
